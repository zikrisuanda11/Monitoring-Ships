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
        Schema::create('fleets', function (Blueprint $table) {
            $table->id();
            $table->string('activity_id')->unique();
            $table->foreign('activity_id')->on('activities')->references('activity_id');
            $table->enum('status_doc', [
                'nota',
                'cancel_pkk',
                'dtjk',
                'pranota'
            ]);
            $table->string('pkk_no');
            $table->integer('ppkb');
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
        Schema::dropIfExists('fleets');
    }
};
