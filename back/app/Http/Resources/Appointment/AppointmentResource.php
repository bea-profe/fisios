<?php

namespace App\Http\Resources\Appointment;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        
        return [
            "id"=>$this->resource->id,
            "doctor_id" =>$this->resource->doctor_id,
            "doctor" => $this->resource->doctor ? [
                "id" => $this->resource->doctor->id,
                "full_name" => $this->resource->doctor->name. ' '.$this->resource->doctor->surname
            ] : NULL,
            "patient_id" =>$this->resource->patient_id,
            "patient" =>  $this->resource->patient ? 
                [
                    "name" => $this->resource->patient->name,
                    "surname" => $this->resource->patient->surname,
                    "full_name" => $this->resource->patient->name. ' '.$this->resource->patient->surname,
                    "movil" => $this->resource->patient->movil,
                    "DNI" => $this->resource->patient->DNI,
                ] : NULL,
            "date_appointment" => $this->resource->date_appointment,
            "date_appointment_format" => Carbon::parse($this->resource->date_appointment)->format("Y-m-d"),
            "specialitie_id" =>$this->resource->specialitie_id,
            "specialitie" => $this->resource->specialitie ? [
                "id" => $this->resource->specialitie->id,
                "name" => $this->resource->specialitie->name,
            ] : NULL,
            "doctor_schedule_join_id" =>$this->resource->doctor_schedule_join_id,

            "segment_hour" => $this->resource->doctor_schedule_join ? [
                "id" => $this->resource->doctor_schedule_join->id,
                "doctor_schedule_day_id" => $this->resource->doctor_schedule_join->doctor_schedule_day_id,
                "doctor_schedule_hour_id" => $this->resource->doctor_schedule_join->doctor_schedule_hour_id,
                // "is_appoinment" => $appointment ? true : false,
    
                    "formatted_segment" => [
                        "id" => $this->resource->doctor_schedule_join->doctor_schedule_hour->id,
                        "hour_start" =>$this->resource->doctor_schedule_join->doctor_schedule_hour->hour_start,
                        "hour_end" =>$this->resource->doctor_schedule_join->doctor_schedule_hour->hour_end,
                        "formatted_hour_start" => Carbon::parse(date("Y-m-d").' '.$this->resource->doctor_schedule_join->doctor_schedule_hour->hour_start)->format("h:i A"),
                        "formatted_hour_end" => Carbon::parse(date("Y-m-d").' '.$this->resource->doctor_schedule_join->doctor_schedule_hour->hour_end)->format("h:i A"),
                        "hour" => $this->resource->doctor_schedule_join->doctor_schedule_hour->hour,
                    ]
                
            ]: NULL,


        


            "user_id" =>$this->resource->user_id,
            "user" => $this->resource->user ? [
                "id" => $this->resource->doctor->id,
                "full_name" => $this->resource->doctor->name. ' '.$this->resource->doctor->surname
            ]: NULL,
            "created_at" => $this->resource->created_at->format("Y-m-d h:i A"),
        ];
    }
}