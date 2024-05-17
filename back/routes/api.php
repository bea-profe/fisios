<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\Rol\RolesController;
use App\Http\Controllers\Admin\Staff\StaffsController;
use App\Http\Controllers\Admin\Doctor\DoctorsController;
use App\Http\Controllers\Admin\Patient\PatientController;
use App\Http\Controllers\Admin\Doctor\SpecialityController;
use App\Http\Controllers\Admin\Appointment\AppointmentController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([
 
   // 'middleware' => 'auth:api',
    'prefix' => 'auth',
  
   // 'middleware' => ['role;admin,'permission:publish articles'],
], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/reg', [AuthController::class, 'reg']);
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->name('me');
    Route::post('/list', [AuthController::class, 'list']);
});
Route::group([
 
//'middleware' => 'auth:api',
     
 ], function ($router) {
Route::resource("roles", RolesController::class);
Route::get("staffs/config", [StaffsController::class,"config"]);
//misma ruta que he puesto en el staff.service
Route::resource("staffs", StaffsController::class);
Route::post("staffs/{id}", [StaffsController::class,"update"]);
Route::resource("specialities",SpecialityController::class);

//rutas para doctors

Route::get("doctors/config", [DoctorsController::class,"config"]);
Route::resource("doctors", DoctorsController::class);
Route::post("doctors/{id}", [DoctorsController::class,"update"]);

//rutas para patients

Route::resource("patients", PatientController::class);
Route::post("patients/{id}", [PatientController::class,"update"]);

//rutas para appointment

Route::get('appointment/config', [AppointmentController::class, 'config']);
Route::get("appointment/patient", [AppointmentController::class,"patient_data"]);
Route::post("appointment/filter", [AppointmentController::class,"filter"]);
Route::resource("appointment", AppointmentController::class);
//Route::get('appointment/test', [AppointmentController::class, 'hola']);
});

 
