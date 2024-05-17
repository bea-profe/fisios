<?php

namespace App\Http\Controllers\Admin\Staff;


use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserCollection;

class StaffsController extends Controller
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
     /**
     * Store a newly created resource in storage.
     */
    
     public function config()
    {
        //

      $roles = Role::all();
       //  $roles = Role::where("name","like","%DOCTOR%")->get();;
        return response()->json([
            "roles" => $roles
        ]);

        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
    


        // Eliminar la parte de la zona horaria (GMT-0500 y entre paréntesis)

        $date_clean = preg_replace('/\(.*\)|[A-Z]{3}-\d{4}/', '', $request->fecha_nac);

        $request->request->add(["fecha_nac" => Carbon::parse($date_clean)->format("Y-m-d h:i:s")]);

        $user = User::create($request->all());


        //relacionar el usuario con el el rol, el modelo

        $role = Role::findOrFail($request->role_id);
        $user->assignRole($role);
        return response()->json([
            "message" => 200
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //devolver la data del usuario

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
        if($user->avatar){
            Storage::delete($user->avatar);
        }
        $user->delete();
        return response()->json([
            "message" => 200
        ]);
    }

}

