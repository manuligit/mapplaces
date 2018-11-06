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

        $keyword = Keyword::find([2])->load('places');
        return $keyword.places();
        
        //return response()->json(Keyword::all()->load('places'));
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
        
        $places = $request->places;
        if ($places) {
            
            $place = Place::find($places['id']);
            $keyword->places()->sync($place, false);
        }
        
        $keyword->save();

        //$place = Place::create($request->all());
        return response()->json($keyword, 201);
    }

    public function update($id, Request $request)
    {
        $this->validate($request,[
            'label' => 'required|string'
        ]);

        $keyword = Keyword::findOrFail($id);

        $keyword->update($request->all());

        $places = $request->places;
        $keyword->places()->sync($places, false);

        return response()->json($keyword, 200);
    }

    public function delete($id)
    {
        Keyword::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}