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
        $Place = Place::create($request->all());

        return response()->json($Place, 201);
    }

    public function update($id, Request $request)
    {
        $Place = Place::findOrFail($id);
        $Place->update($request->all());

        return response()->json($Place, 200);
    }

    public function delete($id)
    {
        Place::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}