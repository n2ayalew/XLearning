<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class notification extends Model
{
    /*
    	notification_type: {join_request, join_accept}
    */

    protected $table = 'notifications';
    protected $fillable = ['serialized_notification'];

    public function classe(){
    	return $this->belongsTo('App\Classe');
    }

    public function user(){
    	return $this->belongsTo('App\User');
    }
    
}
