<?php

namespace App\Http\Resources\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $HOUR_SCHEDULES = collect([]);
        $days_week = [];
        $days_week["lunes"] = "table-primary";
        $days_week["Martes"] = "table-secondary";
        $days_week["Miércoles"] = "table-success";
        $days_week["Jueves"] = "table-warning";
        $days_week["Viernes"] = "table-info";
        foreach ($this->resource->schedule_days as $key => $schedule_day) {
            foreach ($schedule_day->schedules_hours as $schedules_hour) {
                $HOUR_SCHEDULES->push([
                    "day" => [
                        "day" => $schedule_day->day,
                        "class" => $days_week[$schedule_day->day],
                    ],
                    "day_name" => $schedule_day->day,
                    "hours_day" => [
                        "hour" => $schedules_hour->doctor_schedule_hour->hour,
                        "format_hour" => Carbon::parse(date("Y-m-d").' '.$schedules_hour->doctor_schedule_hour->hour.":00:00")->format("h:i A"),
                        "items" => [],
                    ],
                    "hour" => $schedules_hour->doctor_schedule_hour->hour,
                    "group" => "all",
                    "item" => [
                        "id" => $schedules_hour->doctor_schedule_hour->id,
                        "hour_start" => $schedules_hour->doctor_schedule_hour->hour_start,
                        "hour_end" => $schedules_hour->doctor_schedule_hour->hour_end,
                        "format_hour_start" => Carbon::parse(date("Y-m-d").' '.$schedules_hour->doctor_schedule_hour->hour_start)->format("h:i A"),
                        "format_hour_end" => Carbon::parse(date("Y-m-d").' '.$schedules_hour->doctor_schedule_hour->hour_end)->format("h:i A"),
                        "hour" => $schedules_hour->doctor_schedule_hour->hour,
                    ],
                ]);
            }
        }


        
        return [
            "id" => $this->resource->id,
            "name" => $this->resource->name,
            "surname" => $this->resource->surname,
            "DNI" => $this->resource->DNI,
            "email" => $this->resource->email,
            "fecha_nac" => $this->resource->fecha_nac ? Carbon::parse($this->resource->fecha_nac)->format("Y/m/d") : NULL,
           
            "gender" => $this->resource->gender,
            "educacion" => $this->resource->educacion,
            "designacion" => $this->resource->designacion,
            "address" => $this->resource->address,
            "movil" => $this->resource->movil,
            "created_at" => $this->resource->created_at->format("Y/m/d"),
            "role" => $this->resource->roles->first(),
            "specialitie_id" => $this->resource->specialitie_id,
            "specialitie" => $this->resource->specialitie ? [
                "id" => $this->resource->specialitie->id,
                "name" => $this->resource->specialitie->name,
            ]: NULL,
            "avatar" => env("APP_URL")."storage/".$this->resource->avatar,
            "schedule_selecteds" => $HOUR_SCHEDULES,
        ];
    }
}
