<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['event_title'];

    public function user(){

    	return $this->belongsTo('App\User');
    }
    public function classe(){

    	return $this->belongsTo('App\Classe');
    }
}
