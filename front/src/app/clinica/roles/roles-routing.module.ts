import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoleUuserComponent } from './add-role-uuser/add-role-uuser.component';
import { EditRoleUuserComponent } from './edit-role-uuser/edit-role-uuser.component';
import { ListRoleUuserComponent } from './list-role-uuser/list-role-uuser.component';
import { RolesComponent } from './roles.component';

const routes: Routes = [
 {path:'',
component: RolesComponent,
children: [
  {
    path:'register',
    component: AddRoleUuserComponent
  },
  {
    path:'list',
    component: ListRoleUuserComponent
  },
  {
    path:'list/edit/:id',
    component: EditRoleUuserComponent
  },
  
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
