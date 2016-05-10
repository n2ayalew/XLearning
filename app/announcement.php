<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class announcement extends Model
{
    //
    protected $table = 'announcements';

    protected $fillable = ['announcement'];

    public function classe(){

    	return $this->belongsTo('App\Classe');
    }


}
