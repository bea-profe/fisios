import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listPatients(){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/patients";
    return this.http.get(URL,{headers: headers});
  }


  //funcion que devolvera los roles para los usuarios.
  registerPatiens(data:any){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/patients";
    return this.http.post(URL,data,{headers: headers});
  }

  //nuevas funciones para edit

  showPatiens(staff_id:string){

    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/patients/"+staff_id;
    return this.http.get(URL,{headers: headers});

  }

  updatePatiens(staff_id:string,data:any){

    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/patients/"+staff_id;
    return this.http.post(URL,data,{headers: headers});

  }

  deletePatiens(staff_id:string){
    let headers =new HttpHeaders({'Authorization':'Bearer '+this.authService.token});
    let URL=URL_SERVICIOS+"/patients/"+staff_id;
    return this.http.delete(URL,{headers: headers});

  }


}
