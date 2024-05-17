import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { ListPatientComponent } from './list-patient/list-patient.component';
import { PatientsProfileComponent } from './patients-profile/patients-profile.component';
import { PatientsComponent } from './patients.component';

const routes: Routes = [{
  path:'',
  component: PatientsComponent,
  children:[
    {
      path: 'register',
      component: AddPatientComponent,
    },
    {
      path: 'list',
      component: ListPatientComponent,
    },
    {
      path: 'list/edit/:id',
      component: EditPatientComponent,
    }
    ,
    {
      path: 'list/profile/:id',
      component: PatientsProfileComponent,
    }

  ]

}

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
