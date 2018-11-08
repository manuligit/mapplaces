<?php

use Illuminate\Database\Seeder;

class PlacesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        \App\Place::insert([
            'title' => 'Kirjasto',
            'description' => 'Suomenlinnan vanhin ja perinteisin kirjasto.',
            'latitude' => 60.1462116,
            'longitude' => 24.9846877,
            'opens_at' => '08:00',
            'closes_at' => '18:00',
            'created_at' => $faker->dateTime($max = 'now'),
            'updated_at' => $faker->dateTime($max = 'now')
        ]);

        \App\Place::insert([
            'title' => 'Kasinopuisto',
            'description' => 'Hieno puisto.',
            'latitude' => 60.1485,
            'longitude' => 24.987445,
            'opens_at' => '00:00',
            'closes_at' => '23:59',
            'created_at' => $faker->dateTime($max = 'now'),
            'updated_at' => $faker->dateTime($max = 'now')
        ]);

        \App\Place::insert([
            'title'=> 'Pikku-Musta',
            'description'=> 'Hieno saari',
            'latitude'=> 60.149797,
            'longitude'=> 24.979761,
            'opens_at' => '00:00',
            'closes_at'=> '23:59',
            'created_at' => $faker->dateTime($max = 'now'),
            'updated_at' => $faker->dateTime($max = 'now')
        ]);

        \App\Place::insert([
            'title'=> 'Sotamuseo',
            'description'=> 'Pakollinen nähtävyys. Sotamuseossa avautui uusi näyttely toukokuussa 2018.',
            'latitude'=> 60.1458227,
            'longitude'=> 24.9894453,
            'opens_at' => '09:00',
            'closes_at'=> '15:00',
            'created_at' => $faker->dateTime($max = 'now'),
            'updated_at' => $faker->dateTime($max = 'now')
        ]);
    }
}
