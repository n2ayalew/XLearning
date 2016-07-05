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
    public $studentName;
    public $className;
    public function classe(){
    	return $this->belongsTo('App\Classe', 'class_id', 'class_id');
    }

    public function user(){
    	return $this->belongsTo('App\User', 'user_id_creator', 'user_id');
    }
    
}
