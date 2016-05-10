<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
    }
    // protected $redirectTo = '/home';
    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        if ($data['is_teacher']){
            return Validator::make($data, [
                'first_name' => 'required|max:255',
                'last_name' => 'required|max:255',
                'email' => 'required|email|max:255|unique:users',
                'password' => 'required|confirmed|min:6',
            ]);
        }
        if(!$data['is_teacher']){
            return Validator::make($data, [
                'first_name' => 'required|max:255',
                'last_name' => 'required|max:255',
                'student_id' => 'required|alphaNum|max:255|unique:users',
                'password' => 'required|confirmed|min:6',
            ]); 
        }
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        if ($data['is_teacher']){
            return User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'is_teacher' => true,
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
        }
        return User::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'student_id' => $data['student_id'],
            'is_teacher' => false,
            'password' => bcrypt($data['password']),
        ]);
        
    }
}
