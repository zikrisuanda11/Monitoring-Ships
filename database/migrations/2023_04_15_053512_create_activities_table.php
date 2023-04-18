<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->string('activity_id')->primary();
            $table->foreignId('ship_id')->constrained('ships');
            $table->dateTime('eta');
            $table->dateTime('etd');
            $table->enum('service_code', [
                'siklus_pelayanan_air', 
                'siklus_pelayanan_keberangkatan', 
                'siklus_pelayanan_labuh', 
                'siklus_pelayanan_perpanjangan', 
                'siklus_pelayanan_perubahan_kapal', 
                'siklus_pelayanan_pindah', 
                'siklus_pelayanan_tambat'
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activities');
    }
};
