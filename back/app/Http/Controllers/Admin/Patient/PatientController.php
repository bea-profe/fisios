<?php

namespace App\Http\Controllers\Admin\Patient;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Patient\Patient;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Patient\PatientResource;
use App\Http\Resources\Patient\PatientCollection;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //

        $search = $request->search;

        $patients = Patient::where("name","like","%".$search."%")
                        ->orWhere("surname","like","%".$search."%")
                        ->orWhere("email","like","%".$search."%")
                        ->orderBy("id","desc")
                        ->paginate(30);

        return response()->json([
            "patients" => PatientCollection::make($patients),
        ]);


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //que no se registren con DNI iguales 

        $patient_is_valid = Patient::where("DNI",$request->DNI)->first();

        if($patient_is_valid){
            return response()->json([
                "message" => 403,
                "message_text" => "El paciente ya existe"
            ]);
        }
//crea la carpeta y ademas la guarda ahi, comprobando si esta o no esta
        if($request->hasFile("imagen")){
            $path = Storage::putFile("patients",$request->file("imagen"));
            //como parte de la solicitud asignamos el path del avatar
            $request->request->add(["avatar" => $path]);
        }

        // Eliminar la parte de la zona horaria (GMT-0500 y entre paréntesis)

        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->fecha_nac);

        $request->request->add(["fecha_nac" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);

        $patient = Patient::create($request->all());

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

        $patient = Patient::findOrFail($id);

        return response()->json([
            "patient" => PatientResource::make($patient), 
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //

        $patient_is_valid = Patient::where("id","<>",$id)->where("DNI",$request->DNI)->first();

        if($patient_is_valid){
            return response()->json([
                "message" => 403,
                "message_text" => "El paciente ya existe"
            ]);
        }

        $patient = Patient::findOrFail($id);

        if($request->hasFile("imagen")){
            if($patient->avatar){
                Storage::delete($patient->avatar);
            }
            $path = Storage::putFile("patients",$request->file("imagen"));
            $request->request->add(["avatar" => $path]);
        }

        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->fecha_nac);

        $request->request->add(["fecha_nac" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);

        // $request->request->add(["fecha_nac => Carbon::parse($request->birth_date, 'GMT')->format("Y-m-d h:i:s")]);
        $patient->update($request->all());
//sin relacion por ahora
       // if($request->role_id != $user->roles()->first()->id){
            
       // }
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

        $patient = Patient::findOrFail($id);
        if($patient->avatar){
            Storage::delete($patient->avatar);
        }
        $patient->delete();
        return response()->json([
            "message" => 200
        ]);
    }
    }
