import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listUsers(){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/staffs";
    return this.http.get(URL,{headers: headers});
  }

//funcion que devolvera los roles para los usuarios.
  listConfig(){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    //esta sera la misma rura back api.php
    let URL=URL_SERVICIOS+"/staffs/config";
    return this.http.get(URL,{headers: headers});
  }


  //funcion que devolvera los roles para los usuarios.
  registerUser(data:any){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/staffs";
    return this.http.post(URL,data,{headers: headers});
  }

  //nuevas funciones para edit

  showUser(staff_id:string){

    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/staffs/"+staff_id;
    return this.http.get(URL,{headers: headers});

  }

  updateUser(staff_id:string,data:any){

    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/staffs/"+staff_id;
    return this.http.post(URL,data,{headers: headers});

  }

  deleteUser(staff_id:string){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/staffs/"+staff_id;
    return this.http.delete(URL,{headers: headers});

  }


}

