<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    //
    protected $table = "classes";
    public $primaryKey = "class_id";
    protected $fillable = ['subject'];

    public function user_classes(){
    	return $this->hasMany('App\user_class');
    }
}
