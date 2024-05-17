<?php

namespace App\Http\Controllers\Admin\Doctor;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\Doctor\Specialitie;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\Doctor\DoctorScheduleDay;
use App\Http\Resources\User\UserResource;
use App\Models\Doctor\DoctorScheduleHour;
use App\Models\Doctor\DoctorScheduleJoin;
use App\Http\Resources\User\UserCollection;
use App\Models\Doctor\DoctorScheduleJoinHour;
use App\Http\Controllers\Admin\Doctor\DoctorsController;

class DoctorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //

        $search = $request->search;

        $users = User::where("name","like","%".$search."%")
                        ->orWhere("surname","like","%".$search."%")
                        ->orWhere("email","like","%".$search."%")
                        ->orderBy("id","desc")
                        ->get();


        return response()->json([
            "users" => UserCollection::make($users),
        ]);

    }
    public function config()
    {
        //
        $roles = Role::all();
       //solo salgan los roles que le pertenezcan
     //  $roles = Role::where("name","like","%DOCTOR%")->get();;
        //igual que en el adddoctor.component.ts
       
        $specialities = Specialitie::where("state",1)->get();
        $hours_days=collect([]);

        $doctor_schedule_hours= DoctorScheduleHour::all();
       
       // dd( $schedule_hour); almacena el horario del usuario

       foreach ($doctor_schedule_hours->groupBy("hour") as $key => $schedule_hour) {
        $hours_days->push([
            "hour" => $key,
            "format_hour" => Carbon::parse(date("Y-m-d").' '.$key.":00:00")->format("h:i A"),
            "items" => $schedule_hour->map(function($hour_item) {
                // Y-m-d h:i:s 2023-10-2 00:13:30 -> 12:13:20
                return [
                    "id" => $hour_item->id,
                    "hour_start" => $hour_item->hour_start,
                    "hour_end" => $hour_item->hour_end,
                    "format_hour_start" => Carbon::parse(date("Y-m-d").' '.$hour_item->hour_start)->format("h:i A"),
                    "format_hour_end" => Carbon::parse(date("Y-m-d").' '.$hour_item->hour_end)->format("h:i A"),
                    "hour" => $hour_item->hour,
                ];
            }),
        ]);
    }

        
        return response()->json([
            "roles" => $roles,
            "specialities" => $specialities,
            "hours_days" => $hours_days,
        ]);

        
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $schedule_hours = json_decode($request->schedule_hours,1);
        //que no se registren con email iguales 

        $users_is_valid = User::where("email",$request->email)->first();

        if($users_is_valid){
            return response()->json([
                "message" => 403,
                "message_text" => "El usuario con este  EMAIL YA EXISTE"
            ]);
        }
//crea la carpeta y ademas la guarda ahi, comprobando si esta o no esta
        if($request->hasFile("imagen")){
            $path = Storage::putFile("staffs",$request->file("imagen"));
            //como parte de la solicitud asignamos el path del avatar
            $request->request->add(["avatar" => $path]);
        }

        if($request->password){
            $request->request->add(["password" => bcrypt($request->password)]);
        }
     

        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->fecha_nac);

        $request->request->add(["fecha_nac" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);

        $user = User::create($request->all());


        //relacionar el usuario con el el rol, el modelo

        $role = Role::findOrFail($request->role_id);
        $user->assignRole($role);
//esto almacena las horas del doctor

       // foreach ($schedule_hours as $key => $schedule_hour){
         //   if(sizeof($schedule_hour["children"]) > 0) {
           // $schedule_day=DoctorScheduleDay::create([
             //   "user_id" =>  $user->id,
               // "day" => $schedule_hour["day_name"],
            //]);
           // foreach($schedule_hour["children"] as $children){
             //   DoctorScheduleJoin::create([

               //     "doctor_schedule_day_id" => $schedule_day->id,
                 //   "doctor_schedule_hour_id" =>  $children["item"]["id"],
                //]);
       // }
    //}
//}



//si alguno de los dias se ha borrado 

        // VAMOS A COMPROBAR SI TODO SIGUE IGUAL O SI SE HA BORRADO ALGUN DIA
        foreach ($user->schedule_days as $key => $schedule_day) {
            // DEFINIMOS UNA BANDERA PARA PODER SABER SI BORRADO UN DIA : TRUE - EXISTE / FALSE - ELIMINADO
            $is_exists_schedule_day = false;
            // DE LO LLENADOS EN EL HORARIO DEL DOCTOR ITERAMOS PARA HACER LA COMPROBACIÓN
            foreach ($schedule_hours as $key => $schedule_hour) {
                // COMPROBAMOS QUE HAY SEGMENTOS SELECCIONADOS
                if(sizeof($schedule_hour["children"]) > 0){
                    if($schedule_day->day == $schedule_hour["day_name"]){
                        // SI HAY UNA COINCIDENCIA ENTONCES EL DIA QUE TENEMOS REGISTRADO ES EL MISMO QUE ESTAMOS
                        // ENVIANDO EN EL FRONTED , ESTO NOS SIRVE PARA NO TENER QUE ELIMINARLO SINO QUE SIGA
                        // SU FUNCIONAMIENTO
                        $is_exists_schedule_day = true;
                    }
                    if($is_exists_schedule_day){
                        // AHORA TENEMOS QUE COMPROBAR DE ESE DIA SI SUS SEGMENTOS ESTAN CORRECTOS Y NO
                        // HAN ELIMINADO NINGUNO
                        foreach ($schedule_day->schedules_hours as $schedules_hour) {
                            // DEFINIMOS UNA BANDERA PARA PODER SABER SI BORRADO UN SEGMENTO : TRUE - EXISTE / FALSE - ELIMINADO
                            $is_exists_schedules_hour = false;
                            // SEGMENTOS SELECCIONADOS
                            foreach ($schedule_hour["children"] as $children) {
                                if($schedules_hour->doctor_schedule_hour_id == $children["item"]["id"]){
                                    $is_exists_schedules_hour = true;
                                    break;
                                }
                            }
                            if(!$is_exists_schedules_hour){
                                $schedules_hour->delete();
                            }
                        }
                        break;
                    }
                }
            }
            if(!$is_exists_schedule_day){
                // AL NO EXISTIR EL DIA TENEMOS QUE ELIMINAR TANTO LOS SEGMENTOS COMO EL DIA EN SI
                foreach ($schedule_day->schedules_hours as $schedules_hour) {
                    $schedules_hour->delete();
                }
                $schedule_day->delete();
            }
        }
        // VAMOS A COMPROBAR SI TODO ESTA IGUAL A LO QUE MANDAMOS O SI SE HA AGREGADO ALGUN DIA
        foreach ($schedule_hours as $key => $schedule_hour) {
            // COMPROBAMOS QUE HAY SEGMENTOS SELECCIONADOS
            if(sizeof($schedule_hour["children"]) > 0){
                $is_exists_schedule_day = false;
                // DE LOS REGISTROS QUE TENEMOS DISPONIBLES EN LA BD
                foreach ($user->schedule_days as $key => $schedule_day) {
                    if($schedule_day->day == $schedule_hour["day_name"]){
                         // SI HAY UNA COINCIDENCIA ENTONCES EL DIA QUE TENEMOS REGISTRADO ES EL MISMO QUE ESTAMOS
                        // ENVIANDO EN EL FRONTED , ESTO NOS SIRVE PARA NO TENER QUE AGREGAR SINO QUE SIGA
                        // SU FUNCIONAMIENTO
                        $is_exists_schedule_day = true;
                        // break;
                    }
                    if($is_exists_schedule_day){
                        // AHORA TENEMOS QUE COMPROBAR DE ESE DIA SI SUS SEGMENTOS ESTAN CORRECTOS Y NO
                        // HAN AGREGADO NINGUNO
                        foreach ($schedule_hour["children"] as $children) {
                            $is_exists_schedules_hour = false;
                            foreach ($schedule_day->schedules_hours as $schedules_hour) {
                                if($schedules_hour->doctor_schedule_hour_id == $children["item"]["id"]){
                                    $is_exists_schedules_hour = true;
                                    break;
                                }
                            }
                            if(!$is_exists_schedules_hour){
                                DoctorScheduleJoin::create([
                                    "doctor_schedule_day_id" => $schedule_day->id,
                                    "doctor_schedule_hour_id" => $children["item"]["id"],
                                ]);
                            }
                        }
                        break;
                    }
                }
                if(!$is_exists_schedule_day){
                    // AL NO EXISTIR EL DIA TENEMOS QUE AGREGAR TANTO LOS SEGMENTOS COMO EL DIA EN SI
                    $schedule_day = DoctorScheduleDay::create([
                        "user_id" => $user->id,
                        "day" => $schedule_hour["day_name"],
                    ]);
        
                    foreach ($schedule_hour["children"] as $children) {
                        DoctorScheduleJoin::create([
                            "doctor_schedule_day_id" => $schedule_day->id,
                            "doctor_schedule_hour_id" => $children["item"]["id"],
                        ]);
                    }
                }
            }
        }
        return response()->json([
            "message" => 200
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = User::findOrFail($id);

        return response()->json([
            "user" => UserResource::make($user), 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
  

   

    public function update(Request $request, string $id)
    {
        $schedule_hours = json_decode($request->schedule_hours,1);
        $users_is_valid = User::where("id","<>",$id)->where("email",$request->email)->first();

        if($users_is_valid){
            return response()->json([
                "message" => 403,
                "message_text" => "EL USUARIO CON ESTE EMAIL YA EXISTE"
            ]);
        }

        $user = User::findOrFail($id);

        if($request->hasFile("imagen")){
            if($user->avatar){
                Storage::delete($user->avatar);
            }
            $path = Storage::putFile("staffs",$request->file("imagen"));
            $request->request->add(["avatar" => $path]);
        }

        if($request->password){
            $request->request->add(["password" => bcrypt($request->password)]);
        }

        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->fecha_nac);

        $request->request->add(["fecha_nac" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);

        // $request->request->add(["fecha_nac => Carbon::parse($request->birth_date, 'GMT')->format("Y-m-d h:i:s")]);
        $user->update($request->all());
//si queremos asignar un nuevo roll, el request va a contener el nuevo id y comprueba el rol 
        if($request->role_id != $user->roles()->first()->id){
            $role_old = Role::findOrFail($user->roles()->first()->id);
            $user->removeRole($role_old);
    
            $role_new = Role::findOrFail($request->role_id);
            $user->assignRole($role_new);
        }
//almacena la disponibilidad de los horarios
//hay un bug que no almacena los horarios reservados por los pacientes
//

foreach ($user->schedule_days as $key => $schedule_day) {
    # code...
    $schedule_day->delete();
} 
        foreach ($schedule_hours as $key => $schedule_hour){
            if(sizeof($schedule_hour["children"]) > 0) {
            $schedule_day=DoctorScheduleDay::create([
                "user_id" =>  $user->id,
                "day" => $schedule_hour["day_name"],
            ]);
            foreach($schedule_hour["children"] as $children){
                DoctorScheduleJoin::create([

                    "doctor_schedule_day_id" => $schedule_day->id,
                    "doctor_schedule_hour_id" =>  $children["item"]["id"],
                ]);
        }
    }
}

        return response()->json([
            "message" => 200
        ]);
    }
    
    

    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //

        $user = User::findOrFail($id);
        $user ->delete();
        return response()->json([
            "message" => 200
        ]);
    }
    
    
}
