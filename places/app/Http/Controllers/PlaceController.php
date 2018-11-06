<?php

namespace App\Http\Controllers;

use App\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{

    public function showAllPlaces()
    {
        return response()->json(Place::all()->load('keywords'));
    }

    public function showOnePlace($id)
    {
        return response()->json(Place::find($id));
    }

    public function create(Request $request)
    {
        // TODO: Add sensible validation to all fields
        $this->validate($request,[
            'title' => 'required|string',
            'description' => 'required|string',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'opens_at' => 'required|string',
            'closes_at' => 'required|string'
        ]);

        $place = Place::create($request->all());

        return response()->json($place, 201);
    }

    public function update($id, Request $request)
    {
        $place = Place::findOrFail($id);
        $place->update($request->all());
        
        return response()->json($place, 200);
    }

    public function delete($id)
    {
        Place::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}