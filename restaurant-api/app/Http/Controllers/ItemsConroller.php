<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use App\models\User;

class ItemsConroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $user = Item::all();
        $user = Category::with('items')->get();
        return $user;

     return response()->json(['you are in the index']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this-> validate($request,[
            'name' => 'required|unique:items',
            'image' => 'required|image',
            'category_id' => 'required',
            'price' => 'required|numeric|max:10000',
            'desc' => 'required'
        ]);
        $file = $request->file('image');
        $filenameWithExt = $request->file('image')->getClientOriginalName();
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        $extension = pathinfo($filenameWithExt, PATHINFO_EXTENSION);
        $filenameToStore = $filename.'_'.time().'.'.$extension;
        $path = $request->file('image')->storeAs('public/images',$filenameToStore, );
        // return $path;
        $Item = new Item;
        $Item->name =  $request->input('name');
        $Item->category_id =  $request->input('category_id');
        $Item->price =  $request->input('price');
        $Item->desc =  $request->input('desc');
  
        $Item->url = 'http://localhost:8000/storage/images/'.$filenameToStore;
        // return 'http://localhost:8000/storage/images/'.$filenameToStore;
        $Item->amount = 0;

        $Item->save();
        return response()->json([
            'success' => 'succesfully added'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $items =Item::find($id);

        return  $items;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this-> validate($request,[
            'name' => 'required',
            'image' => 'required|image',
            'category_id' => 'required',
            'price' => 'required|numeric|max:10000',
            'desc' => 'required'
        ]);

        // return 'you are in update';
        $file = $request->file('image');
        $filenameWithExt = $request->file('image')->getClientOriginalName();
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
        $extension = pathinfo($filenameWithExt, PATHINFO_EXTENSION);
        $filenameToStore = $filename.'_'.time().'.'.$extension;
        // return $filenameToStore;
        $path = $request->file('image')->storeAs('public/images/',$filenameToStore);
        $Item = Item::find($id);
        $Item->name =  $request->input('name');
        $Item->category_id =  $request->input('category_id');
        $Item->price =  $request->input('price');
        $Item->desc =  $request->input('desc');
        $Item->url = 'http://localhost:8000/storage/images/'.$filenameToStore;
        $Item->amount = 0;

        $Item->save();
        return $request;
        // return response()->json([
        //     'success' => 'succesfully Updated'
        // ], 200);
       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    { 

        if($request->user()->role == 'admin'){

                $Item = Item::find($id);
                if(!$Item){
                    return false;
                }
                $Item->delete();
            return response()->json(['success' => 'deleted successfully'], 200);
        }
        return response()->json(['error' => 'you are not authorized']);

    }
    public function search($key){
        $Items = Item::where('name' , 'like', '%'.$key.'%')->get();
        return $Items;
    }
}
