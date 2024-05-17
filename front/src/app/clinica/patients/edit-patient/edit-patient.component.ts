import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../service/patients.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent {
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

   public patient_id:any;

 //recibir un array con los roels existentes
  constructor(
    public patientsService: PatientsService,

    public activatedRoute:  ActivatedRoute,
  ){
 
 
  }
 
  ngOnInit():void{
 
   //this.patientsService.listConfig().subscribe((resp:any)=> {
    //console.log(resp);
    //this.roles=resp.roles;
   //})
  this.activatedRoute.params.subscribe((resp:any)=>{
    this.patient_id=resp.id;
  })
  this.patientsService.showPatiens(this.patient_id).subscribe((resp:any)=>{
    console.log(resp);

    this.name=resp.patient.name;
      this.surname=resp.patient.name;
      this.email=resp.patient.email;
      this.antedent=resp.patient.antedent;
      this.diagnostico=resp.patient.diagnostico;
      this.fecha_nac=resp.patient.fecha_nac;
      this.gender=resp.patient.gender;
      this.address=resp.patient.address;
      this.movil=resp.patient.movil;
      this.antedent=resp.patient.antedent;
      this.DNI=resp.patient.DNI;
      this.img_pre=resp.patient.avatar
  })
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
    formData.append("address",this.address);

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
  this.patientsService.updatePatiens(this.patient_id,formData).subscribe((resp:any) => {
     console.log(resp);
 
     if(resp.message == 403){
       this.text_validation = resp.message_text;
      }else{
        this.text_success = 'El paciente ha sido modificado correctamente';

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
