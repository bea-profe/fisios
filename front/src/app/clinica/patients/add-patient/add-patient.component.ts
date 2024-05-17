import { Component } from '@angular/core';
import { PatientsService } from '../service/patients.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {
  public selectedValue !: string  ;

  public name:string='';
  public surname:string='';
  public DNI:string='';
  public movil:string='';
  public email:string='';
  public fecha_nac:string='';
  public gender:number=1;
  public antedent:string='';
  public diagnostico:string='';
  public address:string='';
  public avatar:any='';
  public img_pre:any = 'assets/img/user-06.jpg';
 
 
   public  text_validation: string='';
   public  text_success: string='';
 //recibir un array con los roels existentes
  constructor(
    public patientsService: PatientsService,
  ){
 
 
  }
 
  ngOnInit():void{
 
   //this.patientsService.listConfig().subscribe((resp:any)=> {
    //console.log(resp);
    //this.roles=resp.roles;
   //})
  
  
   }
  save(){
    console.log("guardando");
    //
   this.text_validation = '';
   if(!this.name || !this.DNI|| !this.surname || !this.movil ){
     this.text_validation = "Los siguientes campos son necesarios (nombre, apellido, movil, DNI,)";
     return;
   }
 

   console.log(this.selectedValue);
 
   let formData = new FormData();
   formData.append("name",this.name);
   formData.append("surname",this.surname);
   if(this.email){
    formData.append("email",this.email);

   }
   
   if(this.antedent){
    formData.append("antedent",this.antedent);

   } 

   if(this.diagnostico){
    formData.append("diagnostico",this.diagnostico);

   } 

   if(this.fecha_nac){
    formData.append("fecha_nac",this.fecha_nac);

   } 
  
   //concatenar un string vacio
   if(this.gender){
    formData.append("gender",this.gender+"");

   } 

   if(this.address){
    formData.append("address",this.address+"");

   } 

    formData.append("movil",this.movil);

  
   if(this.antedent){
    formData.append("antedent",this.antedent);

   } 


   formData.append("DNI",this.DNI);
   
   if(this.avatar){
    formData.append("imagen",this.avatar);
   }
 
   //llamamos al servicio
  this.patientsService.registerPatiens(formData).subscribe((resp:any) => {
     console.log(resp);
 
     if(resp.message == 403){
       this.text_validation = resp.message_text;
      }else{
        this.text_success = 'El paciente ha sido registrado correctamente';
 
       this.name = '';
        this.surname = '';
        this.DNI = '';
        this.email  = '';
       this.movil  = '';
       this.fecha_nac  = '';
        this.gender  = 1;
        this.antedent  = '';
       this.diagnostico  = '';
       this.address  = '';
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