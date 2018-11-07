<?php

namespace App\Http\Controllers;

use Log;
use App\Keyword;
use App\Place;
use Illuminate\Http\Request;

class KeywordController extends Controller
{

    public function showAllKeywords()
    {
        return response()->json(Keyword::all()->load('places'));
    }

    public function showOneKeyword($id)
    {
        return response()->json(Keyword::find($id)->load('places'));
    }

    public function create(Request $request)
    {
        $this->validate($request,[
            'label' => 'required|string'
        ]);
        
        $keyword = Keyword::create(['label' => $request->get('label')]);
        $place_id = $request->get('places');

        // Add keyword to place:
        if (isset($place_id)) {
            $place = Place::findOrFail($place_id);
            $keyword->places()->sync($place, false);
        }

        return response()->json($keyword, 201);
    }

    public function update($id, Request $request)
    {
        $this->validate($request,[
            'label' => 'required|string'
        ]);

        $keyword = Keyword::findOrFail($id);

        $keyword->update(['label' => $request->get('label')]);
        
        $places = $request->get('places');
        //TODO: Check syncing
        $keyword->places()->sync($places);

        return response()->json($keyword->load('places'), 200);
    }

    public function delete($id)
    {
        Keyword::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}