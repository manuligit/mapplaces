<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'label'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function places()
    {
        return $this->belongsToMany(Place::class);
    }
}