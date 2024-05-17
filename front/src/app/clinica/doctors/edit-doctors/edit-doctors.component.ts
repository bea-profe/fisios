import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../service/doctor.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import 'moment-timezone'; // Importa moment-timezone
import { DateAdapter } from '@angular/material/core';
import { DateFilterFn } from '@angular/material/datepicker';
@Component({
  selector: 'app-edit-doctors',
  templateUrl: './edit-doctors.component.html',
  styleUrls: ['./edit-doctors.component.scss']
})
export class EditDoctorsComponent {
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
  public specialitie_id:any;
  public specialities: any=[];
  

  public  text_validation: string='';
  public  text_success: string='';

  public days_week =[
  {
    day: 'lunes',
    class: 'table-primary'
  },
  {
    day: 'Martes',
    class: 'table-secondary'
  },
  {
    day: 'Miércoles',
    class: 'table-succes'
  },
  {
    day: 'Jueves',
    class: 'table-warning'
  },
  {
    day: 'Viernes',
    class: 'table-info'
  },
  

  ]


public hours_days:any=[];

public hours_selecteds:any=[];
public doctor_id:any;
public doctor_selected:any;
  constructor(
    public doctorsService: DoctorService,
    //para obetenr el paramentro que enviamos a través de la URL
    public activatedRoute:ActivatedRoute,

  ){
 
 
  }
 
  ngOnInit():void{
    this.activatedRoute.params.subscribe((resp:any)=>{
      console.log(resp);
      this.doctor_id=resp.id;
    })
 


   this.doctorsService.listConfig().subscribe((resp:any)=> {
    console.log(resp);
    this.roles=resp.roles;
    this.specialities=resp.specialities;
    this.hours_days =resp.hours_days;
   })
  
//es mejor aui debajo del listconfig ya que lo necesita

   this.doctorsService.showDoctor(this.doctor_id).subscribe((resp:any)=>{
    console.log(resp);
    this.doctor_selected=resp.user;

    this.selectedValue=this.doctor_selected.role.id;
    this.specialitie_id=this.doctor_selected.specialitie_id;
    this.name=this.doctor_selected.name;
    this.surname=this.doctor_selected.surname;
    this.DNI=this.doctor_selected.DNI;
    this.movil=this.doctor_selected.movil;
    this.email=this.doctor_selected.email;
    this.fecha_nac=new Date(this.doctor_selected.fecha_nac).toISOString();
    this.gender=this.doctor_selected.gender;
    this.estudios=this.doctor_selected.estudio;
    this.designacion=this.doctor_selected.designacion;
    this.address=this.doctor_selected.address;
    this.img_pre =this.doctor_selected.avatar;
//esto consigo que se gurden las horas seleccionadas en la vista
    this.hours_selecteds =this.doctor_selected.schedule_selecteds;
  })

  
   }
  save(){
    console.log("guardando");
    //
   this.text_validation = '';
   if(!this.name || !this.email || !this.surname){
     this.text_validation = "Los siguientes campos son necesarios (name,surname,email,avatar,pasword)";
     return;
   }
 
   if(this.password){

    if(this.password != this.Confirmar_Password){
      this.text_validation = "Las contraseñas deben ser iguales";
      return;
    }
   }


   if(this.hours_selecteds.length==0){
    this.text_validation = "Seleccione un horario ";
    return;
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
     //formData.append("estudios",this.estudios);
   // formData.append("designacion",this.designacion);
   // formData.append("address",this.address);
    //formData.append("password",this.password);
   formData.append("role_id",this.selectedValue);
   formData.append("specialitie_id",this.specialitie_id);
   formData.append("imagen",this.avatar);
   
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
  
 if(this.avatar){
    formData.append("imagen",this.avatar);
   }
   
   let HOUR_SCHEDULES:any=[];


   this.days_week.forEach((day:any)=>{

    let DAYS_HOURS=this.hours_selecteds.filter((hour_select:any)=>hour_select.day_name == day.day);
    //agrupacion por dia de as horas seleccionadas
    HOUR_SCHEDULES.push({
      day_name:day.day,
      children:DAYS_HOURS,
    });
   })


   //formData.append("schedule_hours",HOUR_SCHEDULES);

   formData.append("schedule_hours",JSON.stringify(HOUR_SCHEDULES));
 
   //llamamos al servicio que este caso va a actualizar
   this.doctorsService.updateDoctor(this.doctor_id, formData).subscribe((resp:any) => {
     console.log(resp);
 
     if(resp.message == 403){
       this.text_validation = resp.message_text;
     }else{
       this.text_success = 'El usuario ha sido modificado correctamente';
 
    // this.name = '';
    // this.surname = '';
   // this.email  = '';
    // this.movil  = '';
   // this.fecha_nac  = '';
   // this.gender  = 1;
    // this.estudios  = '';
    // this.designacion  = '';
   // this.address  = '';
    // this.password  = '';
    // this.Confirmar_Password  = '';
    // this.selectedValue  = '';
    // this.avatar = null;
    // this.img_pre = null;
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



addHourItem(hours_day:any,day:any,item:any){

  //condiciones de si ya estan seleccionados
  
  let INDEX = this.hours_selecteds.findIndex((hour:any) => 
  
                              hour.day_name == day.day 
                              && hour.hour == hours_day.hour 
                              && hour.item.hour_start == item.hour_start 
                              && hour.item.hour_end == item.hour_end);
 //si existe lo eliminas
  if(INDEX != -1){
    this.hours_selecteds.splice(INDEX,1);
  }else{
    this.hours_selecteds.push({
      "day": day,
      "day_name": day.day,
      "hours_day": hours_day,
      "hour": hours_day.hour,
      "group": "none",
      "item": item,
    });
  }

  console.log(this.hours_selecteds);
}

//esta funcione hace que se seleccionen todos los items.

  addHourAll(hours_day:any,day:any){

    //condiciones de si ya estan seleccionados
     // Buscar el índice de un elemento que cumpla las condiciones para "all" en el grupo
    
    let INDEX = this.hours_selecteds.findIndex((hour:any) => 
                                hour.day_name == day.day 
                                && hour.hour == hours_day.hour
                                && hour.group=="all");
  // Contar cuántos elementos ya están seleccionados para la misma hora y día
    let COUNT_SELECTED = this.hours_selecteds.filter((hour:any) => 
                                hour.day_name == day.day 
                                && hour.hour == hours_day.hour).length;
      // Si ya están seleccionados todos los elementos y hay un grupo "all", deseleccionarlos
if(INDEX != -1 && COUNT_SELECTED == hours_day.items.length){
      //eliminamos cada elemento seleccionado
      hours_day.items.forEach((item:any) => {
        let INDEX = this.hours_selecteds.findIndex((hour:any) => 
                  
                                    hour.day_name == day.day 
                                    && hour.hour == hours_day.hour 
                                    && hour.item.hour_start == item.hour_start 
                                    && hour.item.hour_end == item.hour_end);
    if(INDEX != -1){
        this.hours_selecteds.splice(INDEX,1);

    }
        // Eliminar cada elemento seleccionado


      });
         
    }else{
       //o lo agragemos INDEPENDIENTEMENTE SI SE SELECCIONO O NO

      hours_day.items.forEach((item:any)=>{ 
        
        let INDEX = this.hours_selecteds.findIndex((hour:any) => 
                  
        hour.day_name == day.day 
        && hour.hour == hours_day.hour 
        && hour.item.hour_start == item.hour_start 
        && hour.item.hour_end == item.hour_end);
       
        if(INDEX != -1){
          this.hours_selecteds.splice(INDEX,1);
          
        }
                      this.hours_selecteds.push({
                        "day": day,
                        "day_name": day.day,
                        "hours_day": hours_day,
                        "hour": hours_day.hour,
                        //variable que me ayudara a saber si ya esos items han sido agregados para la funcion de agregar
                        "group": "all",
                        "item": item,
              
                      });
                });
                }

                console.log(this.hours_selecteds);


        //this.hours_selecteds.push({
          //"day": day,
          //"day_name": day.day,
         // "hours_day": hours_day,
          //"hour": hours_day.hour,
         // "grupo": "none",
         // "item": item,
       // });

     
     
    }
  
   
   
    addHourAllDay($event:any, hours_day:any){
      let INDEX = this.hours_selecteds.findIndex((hour:any) => 
        hour.hour == hours_day.hour);
//si no esta selecionado lo limpia
        if(INDEX !=-1 && !$event.currentTarget.checked){
          this.days_week.forEach((day)=>{
          //ELIMINARA CADA UNA DE LAS COIINCIDENCIAS QUE EXISTA
          hours_day.items.forEach((item:any) => {
            let INDEX = this.hours_selecteds.findIndex((hour:any) => 
                      
                                        hour.day_name == day.day 
                                        && hour.hour == hours_day.hour 
                                        && hour.item.hour_start == item.hour_start 
                                        && hour.item.hour_end == item.hour_end);
        if(INDEX != -1){
            this.hours_selecteds.splice(INDEX,1);
    
        }
            // Eliminar cada elemento seleccionado
    
    
          });
        })
        }else{

          this.days_week.forEach((day)=>{
        

            //ELIMINARA CADA UNA DE LAS COIINCIDENCIAS QUE EXISTA
            hours_day.items.forEach((item:any) => {
              let INDEX = this.hours_selecteds.findIndex((hour:any) => 
                        
                                          hour.day_name == day.day 
                                          && hour.hour == hours_day.hour 
                                          && hour.item.hour_start == item.hour_start 
                                          && hour.item.hour_end == item.hour_end);
          if(INDEX != -1){
              this.hours_selecteds.splice(INDEX,1);
      
          }
              // Eliminar cada elemento seleccionado
        });
      })      

        
setTimeout(()=>{


      this.days_week.forEach((day)=>{
      this.addHourAll(hours_day,day);
    })
    },25);
  }}

    isCheckHourAll(hours_day:any,day:any){
      let INDEX = this.hours_selecteds.findIndex((hour:any) => 
                                hour.day_name == day.day 
                                && hour.hour == hours_day.hour
                                && hour.group=="all");
  // Contar cuántos elementos ya están seleccionados para la misma hora y día
    let COUNT_SELECTED = this.hours_selecteds.filter((hour:any) => 
                                hour.day_name == day.day 
                                && hour.hour == hours_day.hour).length;

                                if(INDEX != -1 && COUNT_SELECTED == hours_day.items.length){
        return true;
      }else{
        return false;
    }
      }

  isCheckHour(hours_day:any,day:any,item:any){

    let INDEX = this.hours_selecteds.findIndex((hour:any) => 
  
                              hour.day_name == day.day 
                              && hour.hour == hours_day.hour 
                              && hour.item.hour_start == item.hour_start 
                              && hour.item.hour_end == item.hour_end);
    if(INDEX != -1){
      return true;
    }else{
return false;
  }
    }
}
