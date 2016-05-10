<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['event_title', 'user_id', 'classe_id', 'teacher', 'event_title', 'event_date','event_time'];

    public function user(){

    	return $this->belongsTo('App\User');
    }
    public function classe(){

    	return $this->belongsTo('App\Classe');
    }
}