import { Component } from '@angular/core';
import { RolesService } from '../service/roles.service';
import { DataService } from 'src/app/shared/data/data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-role-uuser',
  templateUrl: './edit-role-uuser.component.html',
  styleUrls: ['./edit-role-uuser.component.scss']
})
export class EditRoleUuserComponent {
  sideBar: any = [];
  name: string = '';
  permissions: any = [];
  valid_form:boolean=false;
  //variable para el formualrio de edicion del rol
  
  valid_form_success:boolean=false;
  role_id:any;

  constructor(
    public DataService: DataService,
    public RoleService: RolesService,
    //obtener ese parametro desde la URL
    public activedRoute: ActivatedRoute,

  ) {


  }
  ngOnInit(): void {
    this.sideBar = this.DataService.sideBar[0].menu;
    //called after the constructor
    this.activedRoute.params.subscribe((resp:any)=>{
      console.log(resp);
      this.role_id=resp.id;
    })
    this.showRole();
  }

  showRole(){
    this.RoleService.showRole(this.role_id).subscribe((resp:any)=>{
      console.log(resp);
      this.name=resp.name;
      this.permissions = resp.permision_pluck;

    })
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
    console.log(this.name,this.permissions);
    console.log(this.name,this.permissions);
    if(!this.name|| this.permissions.length==0 ){
      this.valid_form=true;
      return;
    }
    let data={
      name:this.name,
      permisions:this.permissions,
    };
    this.valid_form_success=false;
    this.RoleService.editRoles(data, this.role_id).subscribe((resp:any)=>{
      console.log(resp);

      this.valid_form_success=true;
     
    })}
}
