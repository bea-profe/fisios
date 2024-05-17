import { Component } from '@angular/core';
import { StaffService } from '../service/staff.service';

@Component({
  selector: 'app-add-staff-n',
  templateUrl: './add-staff-n.component.html',
  styleUrls: ['./add-staff-n.component.scss']
})
export class AddStaffNComponent {

  public selectedValue !: string  ;

 public name:string='';
 public surname:string='';
 public DNI:string='';
 public movil:string='';
 public email:string='';
 public password:string='';
 public Confirmar_Password:string='';
 public fecha_nac:string='';
 public gender:number=1;
 public estudios:string='';
 public designacion:string='';
  public address:string='';


 public roles:any=[];

 public avatar:any='';
 public img_pre:any = 'assets/img/user-06.jpg';


  public  text_validation: string='';
  public  text_success: string='';
//recibir un array con los roels existentes
 constructor(
   public staffService: StaffService,
 ){


 }

 ngOnInit():void{

  this.staffService.listConfig().subscribe((resp:any)=> {
   console.log(resp);
   this.roles=resp.roles;
  })
 
 
  }
 save(){
   console.log("guardando");
   //
  this.text_validation = '';
  if(!this.name || !this.email || !this.surname || !this.avatar || !this.password || !this.roles || !this.movil){
    this.text_validation = "Los siguientes campos son necesarios (nombre, apellido, email, password, movil, rol y avatar)";
    return;
  }

  if(this.password != this.Confirmar_Password){
    this.text_validation = "Las contraseñas deben ser iguales";
    return;
  }
  console.log(this.selectedValue);

  let formData = new FormData();
  formData.append("name",this.name);
  formData.append("surname",this.surname);
  //formData.append("DNI",this.DNI);
  formData.append("email",this.email);
  formData.append("movil",this.movil);
  formData.append("fecha_nac",this.fecha_nac);
  //concatenar un string vacio
  formData.append("gender",this.gender+"");
  formData.append("estudios",this.estudios);
  formData.append("designacion",this.designacion);
  formData.append("address",this.address);
  formData.append("password",this.password);
  formData.append("role_id",this.selectedValue);
  formData.append("imagen",this.avatar);

  //llamamos al servicio
  this.staffService.registerUser(formData).subscribe((resp:any) => {
    console.log(resp);

    if(resp.message == 403){
      this.text_validation = resp.message_text;
    }else{
      this.text_success = 'El usuario ha sido registrado correctamente';

      this.name = '';
      this.surname = '';
      this.email  = '';
      this.movil  = '';
      this.fecha_nac  = '';
      this.gender  = 1;
      this.estudios  = '';
      this.designacion  = '';
      this.address  = '';
      this.password  = '';
      this.Confirmar_Password  = '';
      this.selectedValue  = '';
      this.avatar = null;
      this.img_pre = null;
    }

  })
}




//para que valide la imagen
loadFile($event:any){
  if($event.target.files[0].type.indexOf("image") < 0){
    alert("Solamente archivos del tipo imagen");
    this.text_validation = "Solamente archivos del tipo imagen";
    return;
  }
  this.text_validation = '';
  this.avatar = $event.target.files[0];
  //convertir la imagen en base 64
  let reader = new FileReader();
  reader.readAsDataURL(this.avatar);
  reader.onloadend = () => this.img_pre = reader.result;
}
}