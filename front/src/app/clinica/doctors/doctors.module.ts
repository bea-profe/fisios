import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { AddDoctorsComponent } from './add-doctors/add-doctors.component';
import { EditDoctorsComponent } from './edit-doctors/edit-doctors.component';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorsProfileComponent } from './doctors-profile/doctors-profile.component';


@NgModule({
  declarations: [
    DoctorsComponent,
    AddDoctorsComponent,
    EditDoctorsComponent,
    ListDoctorsComponent,
    DoctorsProfileComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ]
})
export class DoctorsModule { }
