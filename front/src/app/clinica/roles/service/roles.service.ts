import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,) {
    
   }

//funcion para listar los roles

listRoles(){
  let headers = new HttpHeaders({'Authorization':'Bearer'+this.authService.token});
  let URL = URL_SERVICIOS+"/roles";
  return this.http.get(URL,{headers:headers});
}

//funcion para editar un rol

showRole(role_id:string){
  let headers = new HttpHeaders({'Authorization':'Bearer'+this.authService.token});
  let URL = URL_SERVICIOS+"/roles/"+role_id;
  return this.http.get(URL,{headers:headers});
}

deleteRoles(id_role:any){
  let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
  let URL = URL_SERVICIOS+"/roles/"+id_role;
  return this.http.delete(URL,{headers: headers});
}


estoreRoles(data:any){
  let headers = new HttpHeaders({'Authorization':'Bearer'+this.authService.token});
  let URL = URL_SERVICIOS+"/roles";
  return this.http.post(URL,data,{headers:headers});
}

editRoles(data:any,id_role:any){
  let headers = new HttpHeaders({'Authorization':'Bearer'+this.authService.token});
  let URL = URL_SERVICIOS+"/roles/"+id_role;
  return this.http.put(URL,data,{headers:headers});
}

}
