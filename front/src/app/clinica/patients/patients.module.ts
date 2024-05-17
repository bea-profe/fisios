import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientsProfileComponent } from './patients-profile/patients-profile.component';


@NgModule({
  declarations: [
    PatientsComponent,
    AddPatientComponent,
    EditPatientComponent,
    ListPatientComponent,
    PatientsProfileComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    //para tener diferentes tipos de input propios de material
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class PatientsModule { }
