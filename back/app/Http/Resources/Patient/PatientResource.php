<?php

namespace App\Http\Resources\Patient;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
        
      "id" => $this->resource->id,
        "name" => $this->resource->name,
        "surname" => $this->resource->surname,
        "DNI" => $this->resource->DNI,
        "email" => $this->resource->email,
        "fecha_nac" => $this->resource->fecha_nac ? Carbon::parse($this->resource->fecha_nac)->format("Y/m/d") : NULL,
       
        "gender" => $this->resource->gender,
        "antedent" => $this->resource->antedent,
        "diagnostico" => $this->resource->diagnostico,
        "address" => $this->resource->address,
        "movil" => $this->resource->movil,

        "avatar" => $this->resource->avatar ? env("APP_URL")."storage/".$this->resource->avatar : NULL,
    
        "created_at" => $this->resource->created_at->format("Y/m/d"),
       
    ];
    }
}
