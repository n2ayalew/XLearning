<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    //
    protected $table = "classes";
    public $primaryKey = "class_id";
    protected $fillable = ['subject'];

    public function users(){
    	return $this->belongsToMany('App\User', 'user_class');
    }


    public function announcements(){
        return $this->hasMany('app\announcement');
    }
}
