import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { RolesService } from '../service/roles.service';
//import { routes } from 'src/app/shared/routes/routes';
@Component({
  selector: 'app-add-role-uuser',
  templateUrl: './add-role-uuser.component.html',
  styleUrls: ['./add-role-uuser.component.scss']
})
export class AddRoleUuserComponent {
  sideBar: any = [];
  name: string = '';
  permissions: any = [];
  valid_form:boolean=false;

  valid_form_success:boolean=false;
//mensaje validacion
  text_validation:any=null;
  constructor(
    public DataService: DataService,
    public RoleService: RolesService,
  ) {


  }
  ngOnInit(): void {
    this.sideBar = this.DataService.sideBar[0].menu;
    //called after the constructor
  }

  // public routes = routes;

 addPermission(subMenu: any) {
    if (subMenu.permision) {
      let INDEX = this.permissions.findIndex((item: any) => item == subMenu.permision);
      if (INDEX != -1) {
        this.permissions.splice(INDEX, 1);

      } else {
        this.permissions.push(subMenu.permision);
      }
      console.log(this.permissions);
    }
  }
  save(){
    this.valid_form=false;
    if(!this.name|| this.permissions.length==0 ){
      this.valid_form=true;
      return;
    }
    let data={
      name:this.name,
      permisions:this.permissions,
    };
    console.log("enviando");

    this.valid_form_success=false;
    
    this.RoleService.estoreRoles(data).subscribe((resp:any)=>{
      console.log(resp);

      //validacion por pantalla 
      if(resp.message==403){
        this.text_validation = resp.message_text;
      }else{
        this.name='';
        this.permissions=[];
        this.valid_form_success=true;
        let SIDE_BAR = this.sideBar;
        this.sideBar = [];
        setTimeout(()=>{
          this.sideBar = SIDE_BAR;
        }, 50);
      
      //elimine los datos del formulario los checkers 1.4
      //this.name='';
    //this.permissions=[];
      }
    })

  }
}
