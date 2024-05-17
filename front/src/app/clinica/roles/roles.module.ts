import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { AddRoleUuserComponent } from './add-role-uuser/add-role-uuser.component';
import { EditRoleUuserComponent } from './edit-role-uuser/edit-role-uuser.component';
import { ListRoleUuserComponent } from './list-role-uuser/list-role-uuser.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    RolesComponent,
    AddRoleUuserComponent,
    EditRoleUuserComponent,
    ListRoleUuserComponent,
   
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    //CommonModule,
   // RolesRoutingModule,
    
   
   
    
  ]
})
export class RolesModule { }
