<?php

namespace App\Http\Controllers;

use App\Keyword;
use App\Place;
use Illuminate\Http\Request;

class KeywordController extends Controller
{

    public function showAllKeywords()
    {
        //$keyword = new Keyword;
        //$keyword->label= 'Puisto';

        //$keyword->save();

        //$place = Place::find([5]);
        //$keyword->places()->attach($place);

        //$keyword = Keyword::find([1])->load('places');

        //$place = Place::find([5]);
        //$keyword->places()->sync($place);
        //$keyword->places()->attach($place);
        // $keyword->attach($place);
        // $places = $keyword->load('places');
        //return $keyword->places();
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

        $keyword = new Keyword;
        $keyword->label = $request->label;
        
        $place_id = $request->place_id;
        if ($place_id) {
            $place = Place::find([$place_id]);
            $keyword->places()->attach($place);
        }
        
        $keyword->save();
        return response()->json($keyword, 201);
    }

    public function update($id, Request $request)
    {
        $keyword = Keyword::findOrFail($id);
        //$keyword->update($request->());
        // Sync places


        $places = $request->get('places');
        $keyword->places()->sync( $places );
        return response()->json($keyword, 200);
    }

    public function delete($id)
    {
        Keyword::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}