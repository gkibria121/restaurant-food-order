<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function register(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'name' => 'required|min:4',
            'password' => 'required|min:6|max:20',
            'cpassword' => 'required' 
        ]);
        if ($request->password != $request->cpassword){
        return response()->json(['message' => "Confirm password does not match"]);
        }
        $user = User::create([
            'name' => $request->name,
            'email' =>$request->email,
            'password' => Hash::make( $request->password),
            'role' => 'user',
        ]);
       return response()->json([
        "success" => 'User Added'
       ], 200);
    }
    public function login(Request $request)
    {

        $this->validate($request,[
          'email' => 'required',
           'password' => 'required'
        ]);
        if(!Auth::attempt($request->only('email','password'))){
            return 'login faild';
        }
        $user = User::where('email' ,'=',$request->email)->first();
        $token = $user->createToken('API TOKEN')->plainTextToken;
        if($user->role=='admin'){
            return response()->json([
                'token' => $token,
                'role' => 'admin'
                
            ]);
        }

        return response()->json([
            'token' => $token,
            'role' => 'user'
            
        ]);
    
    }
    public function logout(Request $request){
     
        $request->user()->currentAccessToken()->delete();
        return "loggedout";
    }
    
}
