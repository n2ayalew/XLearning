<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class comment extends Model
{
    //
    protected $table = 'comments';
    protected $fillable = ['comment'];

    public function discussion(){
    	return $this->belongsTo('App\discussion');
    }
}
