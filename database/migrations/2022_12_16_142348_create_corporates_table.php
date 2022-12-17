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
        Schema::create('corporates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('container_id')->constrained('containers')->onDelete('cascade');
            $table->string('agent_name');
            $table->dateTime('eta');
            $table->dateTime('etd');
            $table->enum('status_document', ['nota', 'cancel_pkk']);
            $table->integer('spum')->nullable();
            $table->string('ppkb');
            $table->enum('service_code', [
                'siklus_pelayanan_air', 
                'siklus_pelayanan_keberangkatan', 
                'siklus_pelayanan_labuh', 
                'siklus_pelayanan_perpanjangan', 
                'siklus_pelayanan_perubahan_kapal', 
                'siklus_pelayanan_pindah', 
                'siklus_pelayanan_tambat'
            ]);
            $table->string('pkk_no');
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
        Schema::dropIfExists('corporates');
    }
};
