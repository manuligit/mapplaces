<?php

namespace App\Http\Controllers;

use App\Keyword;
use Illuminate\Http\Request;

class KeywordController extends Controller
{

    public function showAllKeywords()
    {
        return response()->json(Keyword::all());
    }

    public function showOneKeyword($id)
    {
        return response()->json(Keyword::find($id));
    }

    public function create(Request $request)
    {
        // TODO: Add sensible validation to all fields
        $this->validate($request,[
            'label' => 'required|string'
        ]);

        $keyword = Keyword::create($request->all());

        return response()->json($keyword, 201);
    }

    public function update($id, Request $request)
    {
        $keyword = Keyword::findOrFail($id);
        $keyword->update($request->all());

        return response()->json($keyword, 200);
    }

    public function delete($id)
    {
        Keyword::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }
}