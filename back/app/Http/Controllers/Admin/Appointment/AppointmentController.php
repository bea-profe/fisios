<?php

namespace App\Http\Controllers\Admin\Appointment;


use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Patient\Patient;
use App\Models\Doctor\Specialitie;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Appointment\Appointment;
use App\Models\Doctor\DoctorScheduleDay;
use App\Models\Doctor\DoctorScheduleJoin;
use App\Http\Resources\Appointment\AppointmentResource;
use App\Http\Resources\Appointment\AppointmentCollection;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        
        $specialitie_id = $request->specialitie_id;
        $name_doctor = $request->search;
        $date = $request->date;

        $appointments = Appointment::filterAdvance($specialitie_id,$name_doctor,$date)->orderBy("id","desc")
                        ->paginate(20);

        return response()->json([
            "total" => $appointments->total(),
            "appointments" => AppointmentCollection::make($appointments),
        ]);
    }

    public function config()
    {
        //dd('Reached config method');
        // php artisan route:clear


       //return response('hello',204);
        // Definir un array de horas con sus identificadores y nombres
        $hours = [
            ["id" => "08", "name" => "8:00 AM"],
            ["id" => "09", "name" => "9:00 AM"],
            ["id" => "10", "name" => "10:00 AM"],
            ["id" => "11", "name" => "11:00 AM"],
            ["id" => "12", "name" => "12:00 PM"],
            ["id" => "13", "name" => "1:00 PM"],
            ["id" => "14", "name" => "2:00 PM"],
            ["id" => "15", "name" => "3:00 PM"],
            ["id" => "16", "name" => "4:00 PM"],
            ["id" => "17", "name" => "5:00 PM"]
        ];
    
        // Obtener todas las especialidades activas desde la base de datos
        $specialities = Specialitie::where("state", 1)->get();
    
        // Retornar una respuesta en formato JSON con las especialidades y las horas disponibles
        return response()->json([
            "specialities" => $specialities,
            "hours" => $hours
        ]);
    }
  


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Buscar o crear un nuevo paciente
            $patient = Patient::where("DNI", $request->DNI)->first();
    
            if (!$patient) {
                // Si no se encuentra el paciente, crear uno nuevo
                $patient = Patient::create([
                    "name" => $request->name,
                    "surname" => $request->surname,
                    "movil" => $request->movil,
                    "DNI" => $request->DNI,
                ]);
    
                if (!$patient) {
                    return response()->json([
                        "error" => "Failed to create patient",
                    ], 500); // Código 500 para indicar un error interno del servidor
                }
            }
    
            // Crear una nueva cita (Appointment)
            $appointment = Appointment::create([
                "doctor_id" => $request->doctor_id,
                "patient_id" => $patient->id, // Usar el ID del paciente creado o encontrado
                "date_appointment" => Carbon::parse($request->date_appointment)->format("Y-m-d h:i:s"),
                "specialitie_id" => $request->specialitie_id,
                "doctor_schedule_join_id" => $request->doctor_schedule_join_id,
               // "user_id" => auth("api")->user()->id, // Obtener el ID del usuario autenticado
               'user_id' => Auth::id(), 
            ]);
    
            if (!$appointment) {
                return response()->json([
                    "error" => "Failed to create appointment",
                ], 500); // Código 500 para indicar un error interno del servidor
            }
    
            return response()->json([
                "message" => "Appointment created successfully",
                "appointment" => $appointment,
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                "error" => "Error occurred while processing the request",
                "message" => $e->getMessage(),
            ], 500); // Código 500 para indicar un error interno del servidor
        }
    }
    
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //

        $appointment = Appointment::with('doctor_schedule_join')->findOrFail($id);

        return response()->json([
         "appointment" => AppointmentResource::make($appointment)
        ]);
     }
    


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        $appointment = Appointment::findOrFail($id);

        $appointment->update([
                "doctor_id"=>$request->doctor_id,
                "date_appointment"=>Carbon::parse($request->date_appointment)->format("Y-m-d h:i:s"),
                "specialitie_id"=>$request->specialitie_id,
                "doctor_schedule_join_id"=>$request->doctor_schedule_join_id,


            ]);

return response()->json([
        "message" => 200,
    ]);
}
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        $appointment = Appointment::findOrFail($id);
        $appointment->delete();
       return response()->json([
        "message" => 200,
       ]);
    }

    

  // error_log('Request data: ' . json_encode($request->all()));
  public function filter(Request $request)
{
    // Obtener el valor específico de la fecha de la cita del request
    $dateAppointment = $request->input('date_appointment');
    error_log('Request data: ' . json_encode($request->all()));
    // Limpiar la fecha de la cita utilizando expresión regular
    $cleanedDateAppointment = preg_replace('/\([^)]+\)|[A-Z]{3}-\d{4}/', '', $dateAppointment);

    // Configurar la zona horaria y el idioma de Carbon
    date_default_timezone_set('Europe/Madrid');
    Carbon::setLocale('es');
    DB::statement("SET lc_time_names = 'es_ES'");
  //  $cleanedDateAppointment = Carbon::parse($dateAppointment)->format('Y-m-d');
    // Obtener el nombre del día a partir de la fecha de la cita limpia
    $dayName = Carbon::parse($cleanedDateAppointment)->dayName;

    // Obtener otros parámetros del request
    $hour = $request->input('hour');
    $specialtyId = $request->input('specialitie_id');

    // Consultar los doctores disponibles según la especialidad y la hora especificada
    $availableDoctors = DoctorScheduleDay::where('day', 'like', "%{$dayName}%")
                                         ->whereHas('doctor', function ($query) use ($specialtyId) {
                                             $query->where('specialitie_id', $specialtyId);
                                         })
                                         ->whereHas('schedules_hours', function ($query) use ($hour) {
                                             $query->whereHas('doctor_schedule_hour', function ($subQuery) use ($hour) {
                                                 $subQuery->where('hour', $hour);
                                             });
                                         })
                                         ->get();

    // Colección para almacenar los datos de los doctores y sus segmentos de horario
    $doctorsData = collect([]);

    // Iterar sobre cada doctor disponible encontrado
    foreach ($availableDoctors as $doctor) {
        // Obtener los segmentos programados para este doctor en la hora especificada
        $segments = DoctorScheduleJoin::where('doctor_schedule_day_id', $doctor->id)
                                       ->whereHas('doctor_schedule_hour', function ($query) use ($hour) {
                                           $query->where('hour', $hour);
                                       })
                                       ->get();

        // Preparar los datos del doctor y sus segmentos para agregar al arreglo final
        $doctorsData->push([
            'doctor' => [
                'id' => $doctor->doctor->id, 
                'full_name' => $doctor->doctor->name . ' ' . $doctor->doctor->surname,
                'specialty' => [
                    'id' => $doctor->doctor->specialitie->id, 
                    'name' => $doctor->doctor->specialitie->name
                ],
            ],
            'segments' => $segments->map(function ($segment) use ($cleanedDateAppointment) {
                // Verificar si hay una cita programada para este segmento en la fecha limpia
                $appointment = Appointment::where('doctor_schedule_join_id', $segment->id)
                                           ->whereDate('date_appointment', Carbon::parse($cleanedDateAppointment)->format('Y-m-d'))
                                           ->first();

                // Formatear la información del segmento
                return [
                    'id' => $segment->id,
                    'doctor_schedule_day_id' => $segment->doctor_schedule_day_id,
                    'doctor_schedule_hour_id' => $segment->doctor_schedule_hour_id,
                    'is_appointment' => $appointment ? true : false,
                    'formatted_segment' => [
                        'id' => $segment->doctor_schedule_hour->id,
                        'hour_start' => $segment->doctor_schedule_hour->hour_start,
                        'hour_end' => $segment->doctor_schedule_hour->hour_end,
                        'formatted_hour_start' => Carbon::parse(date('Y-m-d').' '.$segment->doctor_schedule_hour->hour_start)->format('h:i A'),
                        'formatted_hour_end' => Carbon::parse(date('Y-m-d').' '.$segment->doctor_schedule_hour->hour_end)->format('h:i A'),
                        'hour' => $segment->doctor_schedule_hour->hour,
                    ]
                ];
            })
        ]);
    }

    // Retornar la respuesta en formato JSON con la información de los doctores y sus segmentos
    return response()->json([
        'doctors' => $doctorsData,
    ]);
}


//    public function filter(Request $request)
// {
//    // error_log('Request data: ' . json_encode($request->all()));
// //this->authorize('filter', Appointment::class);
//     // Obtener el valor específico de la fecha de la cita
//     $dateAppointment = $request->date_appointment;
//     error_log('Date appointment received: ' . $dateAppointment);

//     // Obtener los parámetros del request
//     $dateAppointment = $request->date_appointment;
//     $hour = $request->hour;
//     $specialtyId = $request->specialitie_id;

//     // Configurar la zona horaria y el idioma de Carbon
//     date_default_timezone_set('Europe/Madrid');
//     Carbon::setLocale('es');
//     DB::statement("SET lc_time_names = 'es_ES'");
   
//   // $dateAppointment = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $dateAppointment);
//     // Obtener el nombre del día a partir de la fecha de la cita
//     $dayName = Carbon::parse($dateAppointment)->dayName;

//     // Consultar los doctores disponibles según la especialidad y la hora especificada
//     $availableDoctors = DoctorScheduleDay::where("day", "like", "%" . $dayName . "%")
//                                          ->whereHas("doctor", function ($query) use ($specialtyId) {
//                                              $query->where("specialitie_id", $specialtyId);
//                                          })
//                                          ->whereHas("schedules_hours", function ($query) use ($hour) {
//                                              $query->whereHas("doctor_schedule_hour", function ($subQuery) use ($hour) {
//                                                  $subQuery->where("hour", $hour);
//                                              });
//                                          })
//                                          ->get();

//     // Colección para almacenar los datos de los doctores y sus segmentos de horario
//     $doctorsData = collect([]);

//     // Iterar sobre cada doctor disponible encontrado
//     foreach ($availableDoctors as $doctor) {
//         // Obtener los segmentos programados para este doctor en la hora especificada
//         $segments = DoctorScheduleJoin::where("doctor_schedule_day_id", $doctor->id)
//                                        ->whereHas("doctor_schedule_hour", function ($query) use ($hour) {
//                                            $query->where("hour", $hour);
//                                        })
//                                        ->get();

//         // Preparar los datos del doctor y sus segmentos para agregar al arreglo final
//         $doctorsData->push([
//             "doctor" => [
//                 "id" => $doctor->doctor->id, 
//                 "full_name" => $doctor->doctor->name . ' ' . $doctor->doctor->surname,
//                 "specialty" => [
//                     "id" => $doctor->doctor->specialitie->id, 
//                     "name" => $doctor->doctor->specialitie->name
//                 ],
//             ],
//             "segments" => $segments->map(function ($segment) use ($dateAppointment) {
//                 // Verificar si hay una cita programada para este segmento
//                 $appointment = Appointment::where("doctor_schedule_join_id", $segment->id)
//                                            ->whereDate("date_appointment", Carbon::parse($dateAppointment)->format("Y-m-d"))
//                                            ->first();

//                 // Formatear la información del segmento
//                 return [
//                     "id" => $segment->id,
//                     "doctor_schedule_day_id" => $segment->doctor_schedule_day_id,
//                     "doctor_schedule_hour_id" => $segment->doctor_schedule_hour_id,
//                     "is_appointment" => $appointment ? true : false, // Indicar si el segmento está ocupado
//                     "formatted_segment" => [
//                         "id" => $segment->doctor_schedule_hour->id,
//                         "hour_start" => $segment->doctor_schedule_hour->hour_start,
//                         "hour_end" => $segment->doctor_schedule_hour->hour_end,
//                         "formatted_hour_start" => Carbon::parse(date("Y-m-d").' '.$segment->doctor_schedule_hour->hour_start)->format("h:i A"),
//                         "formatted_hour_end" => Carbon::parse(date("Y-m-d").' '.$segment->doctor_schedule_hour->hour_end)->format("h:i A"),
//                         "hour" => $segment->doctor_schedule_hour->hour,
//                     ]
//                 ];
//             })
//         ]);
//     }

//     // Retornar la respuesta en formato JSON con la información de los doctores y sus segmentos
//     return response()->json([
//         "doctors" => $doctorsData,
//     ]);
// }

public function patient_data(Request $request){
        //dd('Reached config method');

    $dni=$request->get("dni");

    $patient = Patient::where("DNI",$dni)->first();
    if(!$patient){
        return response()->json([
            "message" => 403,
        ]);
    }   
    return response()->json([
        "message" => 200,
        "name" => $patient->name,
        "surname" => $patient->surname,
        "movil" => $patient->movil,
        "DNI" => $patient->DNI
    ]);
}
}   