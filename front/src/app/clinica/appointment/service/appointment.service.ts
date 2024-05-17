import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/config/config';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  //listar por los campos debe tener el  mismo nombre que en appointmentcontroller

  listAppointments(page:number=1,search:string = '',specialitie_id:string = '',date:any = null){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let LINK = "";
    if(search){
      LINK+="&search="+search;
    }
    if(specialitie_id){
      LINK+="&specialitie_id="+specialitie_id;
    }
    if(date){
      LINK+="&date="+date;
    }
    let URL = URL_SERVICIOS+"/appointment?page="+page+LINK;
    return this.http.get(URL,{headers: headers});
  }

//funcion que devolvera los roles para los usuarios.
  listConfig(){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    //esta sera la misma rura back api.php
    let URL=URL_SERVICIOS+"/appointment/config";
    return this.http.get(URL,{headers: headers});
  }


  listPatient(dni:string){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    //esta sera la misma rura back api.php

  const URL = `${URL_SERVICIOS}/appointment/patient?dni=${dni}`; // Corregir la URL con el parámetro correcto
        return this.http.get(URL, { headers });
  }
  //funcion que devolvera los roles para los usuarios.
 // registerAppointment(data:any){
   // let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    //let URL=URL_SERVICIOS+"/appointment";
    //return this.http.post(URL,data,{headers: headers});
 // }
// Function to register an appointment
registerAppointment(data: any): Observable<any> {
  // Constructing headers with authorization token
  let headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.authService.token
  });

  // Constructing the URL for the appointment endpoint
  let URL = URL_SERVICIOS + "/appointment";

  // Making an HTTP POST request with the data and headers
  return this.http.post(URL, data, { headers: headers });
}


  //funcion filter
  listFilter(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointment/filter";
    return this.http.post(URL,data,{headers: headers});
  }
  //nuevas funciones para edit

  showAppointment(appointment_id:string){

    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/appointment/"+appointment_id;
    return this.http.get(URL,{headers: headers});

  }

  updateAppointment(appointment_id:string,data:any){

    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/appointment/"+appointment_id;
    return this.http.put(URL,data,{headers: headers});

  }

  deleteAppointment(appointment_id:string){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/appointment/"+appointment_id;
    return this.http.delete(URL,{headers: headers});

  }
}
