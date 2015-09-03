<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;


class User extends Model implements AuthenticatableContract, CanResetPasswordContract
{
    use Authenticatable, CanResetPassword;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    public $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['first_name', 'last_name', 'email', 'password', 'student_id', 'is_teacher'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /*public function user_classes(){

        return $this->hasMany('App\user_class');
    }*/
    public function classes(){
        return $this->belongsToMany('App\Classe', 'user_class');
    }
    public function events(){
        return $this->hasMany('App\Event');
    }

    public function isTeacher(){
        if ($this->is_teacher){
            return true;
        }
        return false;
    }

    public function notifications(){
        return $this->hasMany('App\notification');
    }
}
