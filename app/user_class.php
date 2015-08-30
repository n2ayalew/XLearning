<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class user_class extends Model
{
    //
    protected $table = 'user_class';
    
    public function class(){
    	return $this->belongsTo('App\Classe');
    }
    public function user(){
    	return $this->belongsTo('App\User');
    }
}
