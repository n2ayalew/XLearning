<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['event'];

    public function user(){

    	return $this->belongsTo('app\User');
    }
    public function class(){

    	return $this->belongsTo('app\Classe');
    }
}
