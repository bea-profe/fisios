<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use App\Models\Doctor\Specialitie;
use Spatie\Permission\Traits\HasRoles;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\Doctor\DoctorScheduleDay;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
 // The User model requires this trait
 use HasRoles;
    /**
     * The attributes that are mass assignable.
     * 
     * 
     *
     * @var array<int, string>
     */

     use SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',

        //


        'surname',
        'specialitie_id',
        'DNI',
        'movil',
        'fecha_nac',
        'gender',
        'estudios',
        'designacion',
        'address',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
 
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    public function specialitie(){
        return $this->belongsTo(Specialitie::class);

    }

    public function schedule_days(){
        return $this->hasMany(DoctorScheduleDay::class);

    }
}
