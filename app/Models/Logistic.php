<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logistic extends Model
{
    use HasFactory;

    protected $primaryKey = 'logistic_id';

    public $incrementing = false;
    
    protected $keyType = 'string';

    protected $fillable = [
        'logistic_id',
        'ship_id',
        'document_id',
        'eta',
        'etd'
    ];

    public function ships()
    {
        return $this->belongsTo(Ship::class, 'ship_id');
    }

    public function document()
    {
        return $this->hasOne(Document::class, 'logistic_id');
    }

}
