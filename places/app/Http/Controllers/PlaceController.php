<?php

namespace App\Http\Controllers;

use App\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{

    public function showAllPlaces()
    {
        return response()->json(Place::all());
    }

    public function showOnePlace($id)
    {
        return response()->json(Place::find($id));
    }

    public function create(Request $request)
    {
        // Validate all fields
        $this->validate($request,[
            'title' => 'required',
            'description' => 'required',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'opens_at' => 'required|numeric',
            'closes_at' => 'required|numeric'
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