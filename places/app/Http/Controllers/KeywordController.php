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

        //$keyword = Keyword::find([2])->load('places');
        
        //return $keyword;

        //$keyword = Keyword::doesntHave('places')->get();
        //return $keyword;
        Log::info('This is some useful information.');

        return response()->json(Keyword::all()->load('places'));
    }

    public function showOneKeyword($id)
    {
        return response()->json(Keyword::find($id)->load('places'));
    }

    public function create(Request $request)
    {
        //Log::info(''.$request);

        $this->validate($request,[
            'label' => 'required|string'
        ]);
        
        //Log::info('Showing user: '.$request);
        //$keyword = Keyword::create(['label' => $request->input('label')]);
        // Log::info('');
        // Log::info('');
        // Log::info('AaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

        //Log::info(''.$request->get('label'));
        //$snib = $request->get('places');
        //Log::info(''.$snib[0]);       // Log::info(''.$keyword);
        // Log::info('AaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');

        // Log::info('');
        // Log::info('');
        

        
        $keyword = Keyword::create(['label' => $request->get('label')]);
        
        $place_id = $request->get('places');

        if (isset($place_id)) {
            $place = Place::findOrFail($place_id[0]);
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
        $keyword->places()->sync($places);

        return response()->json($keyword, 200);
    }

    public function delete($id)
    {
        Keyword::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}