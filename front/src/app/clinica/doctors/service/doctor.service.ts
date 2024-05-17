import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listDoctors(){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/doctors";
    return this.http.get(URL,{headers: headers});
  }

//funcion que devolvera los roles para los usuarios.
  listConfig(){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    //esta sera la misma rura back api.php
    let URL=URL_SERVICIOS+"/doctors/config";
    return this.http.get(URL,{headers: headers});
  }


  //funcion que devolvera los roles para los usuarios.
  registerDoctor(data:any){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/doctors";
    return this.http.post(URL,data,{headers: headers});
  }

  //nuevas funciones para edit

  showDoctor(doctor_id:string){

    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/doctors/"+doctor_id;
    return this.http.get(URL,{headers: headers});

  }

  updateDoctor(doctor_id:string,data:any){

    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/doctors/"+doctor_id;
    return this.http.post(URL,data,{headers: headers});

  }

  deleteDoctor(doctor_id:string){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/doctors/"+doctor_id;
    return this.http.delete(URL,{headers: headers});

  }
}
