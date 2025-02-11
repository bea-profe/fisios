<?php

namespace App\Models\Doctor;
use App\Models\Appointment\Appointment;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DoctorScheduleJoin extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "doctor_schedule_day_id",
        "doctor_schedule_hour_id",
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
    public function doctor_schedule_day() {
        return $this->belongsTo(DoctorScheduleDay::class);
    }

    public function doctor_schedule_hour() {
        return $this->belongsTo(DoctorScheduleHour::class);
    }
    
}
