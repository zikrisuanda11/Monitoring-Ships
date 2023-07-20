<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $primaryKey = 'activity_id';

    public $incrementing = false;
    
    protected $keyType = 'string';

    protected $fillable = [
        'activity_id',
        'ship_id',
        'document_id',
        'eta',
        'etd',
        'service_code'
    ];

    public function ships()
    {
        return $this->belongsTo(Ship::class, 'ship_id');
    }

    public function fleet()
    {
        return $this->hasOne(Fleet::class, 'activity_id');
    }
}
