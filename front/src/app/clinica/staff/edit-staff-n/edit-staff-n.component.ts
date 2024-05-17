import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../service/staff.service';

@Component({
  selector: 'app-edit-staff-n',
  templateUrl: './edit-staff-n.component.html',
  styleUrls: ['./edit-staff-n.component.scss']
})
export class EditStaffNComponent {

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

   public staff_id:any;
   public staff_selected:any= {}; // Inicializar como un objeto vacío


 //recibir un array con los roels existentes
  constructor(
    public staffService: StaffService,
    public activeRoute: ActivatedRoute
  ){
 
 
  }
 
  ngOnInit():void{
 
   this.staffService.listConfig().subscribe((resp:any)=> {
    console.log(resp);
    this.roles=resp.roles;
   })

   this.activeRoute.params.subscribe((resp:any)=> {
    console.log(resp);
    this.staff_id=resp.id;
  
   })

   
   //nueva funcion para mostrar que la declararemos en staff.service.ts
   this.staffService.showUser(this.staff_id).subscribe((resp:any)=>{
     console.log(resp);
     this.staff_selected =resp.user;

        this.selectedValue=this.staff_selected.role.id;
        this.name=this.staff_selected.name;
        this.surname=this.staff_selected.surname;
        this.DNI=this.staff_selected.DNI;
        this.movil=this.staff_selected.movil;
        this.email=this.staff_selected.email;
        this.fecha_nac=new Date(this.staff_selected.fecha_nac).toISOString();
        this.gender=this.staff_selected.gender;
        this.estudios=this.staff_selected.estudio;
        this.designacion=this.staff_selected.designacion;
        this.address=this.staff_selected.address;
        this.img_pre =this.staff_selected.avatar;

   })
  
   }
  save(){
    console.log("guardando");
    //
   this.text_validation = '';
   if(!this.name || !this.email || !this.surname){
     this.text_validation = "Los siguientes campos son necesarios (name,surname,email)";
     return;
   }
 if(this.password){
  if(this.password != this.Confirmar_Password){
    this.text_validation = "Las contraseñas deben ser iguales";
    return;
  }
 }
   
   console.log(this.selectedValue);
 
   let formData = new FormData();
   formData.append("name",this.name);
   formData.append("surname",this.surname);
   formData.append("email",this.email);
   formData.append("movil",this.movil);
   formData.append("fecha_nac",this.fecha_nac);
   //concatenar un string vacio
   formData.append("gender",this.gender+"");
   if(this.estudios){
    formData.append("estudios",this.estudios);
   }
   
   //tendermos que validad estos campos para que no nos lo ponga a nulos
   if(this.designacion){
    formData.append("designacion",this.designacion);
   }
   if(this.address){
    formData.append("address",this.address);
   }
   
   
   if(this.password){
    formData.append("password",this.password);
   }
  
   formData.append("role_id",this.selectedValue);
   if(this.avatar){
    formData.append("imagen",this.avatar);
   }
   
 
   //llamamos al servicio

   this.staffService.updateUser(this.staff_id,formData).subscribe((resp:any) => {
     console.log(resp);
 
     if(resp.message == 403){
       this.text_validation = resp.message_text;
     }else{
       this.text_success = 'El usuario se ha editado correctamente';
 
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