<?php

namespace App\Models\Appointment;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Patient\Patient;
use App\Models\Doctor\Specialitie;
use Illuminate\Database\Eloquent\Model;
use App\Models\Doctor\DoctorScheduleJoin;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Appointment extends Model
{
    use HasFactory;
use SoftDeletes;
    protected $fillable=[

        "doctor_id",
        "patient_id",
        "date_appointment",
        "specialitie_id",
        "doctor_schedule_join_id",
        "user_id",
       "created_at",
        "updated_at",
        "deleted_at",
    ];

    public function setCreatedAtAttribute($value)
    {
    	date_default_timezone_set('Europe/Madrid');
        $this->attributes["created_at"]= Carbon::now();
    }

    public function setUpdatedAtAttribute($value)
    {
    	date_default_timezone_set("Europe/Madrid");
        $this->attributes["updated_at"]= Carbon::now();
    }
    
    public function doctor()
    {
    return $this->belongsTo(User::class,"doctor_id");
    }

    public function patient()
    {
    return $this->belongsTo(Patient::class);
    }

   // public function doctor_schedule_join_id()
    //{
    //return $this->belongsTo(DoctorScheduleJoin::class);
    //}

   
    public function doctor_schedule_join()
    {
        return $this->belongsTo(DoctorScheduleJoin::class);
    }
    

    public function user()
    {
    return $this->belongsTo(User::class);
    }

    public function specialitie()
    {
    return $this->belongsTo(Specialitie::class);
    }
    

    public function scopeFilterAdvance($query, $specialitie_id, $name_doctor, $date)
    {
        if ($specialitie_id) {
            $query->where("specialitie_id", $specialitie_id);
        }
    
        if ($name_doctor) {
            $query->whereHas("doctor", function ($q) use ($name_doctor) {
                $q->where("name", "like", "%{$name_doctor}%")
                  ->orWhere("surname", "like", "%{$name_doctor}%");
            });
        }
    
        if ($date) {
            $query->whereDate("date_appointment", Carbon::parse($date)->format("Y-m-d"));
        }
    
        return $query;
    }
    
}


