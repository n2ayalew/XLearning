<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class document extends Model
{
    //
    protected $table = 'documents';
    protected $fillable = ['doc_link'];

    public function classe() {
    	return $this->belongsTo('App\Classe', 'class_id', 'class_id');
    }
}
