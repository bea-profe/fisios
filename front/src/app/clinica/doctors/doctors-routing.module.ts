import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorsComponent } from './add-doctors/add-doctors.component';
import { DoctorsProfileComponent } from './doctors-profile/doctors-profile.component';
import { DoctorsComponent } from './doctors.component';
import { EditDoctorsComponent } from './edit-doctors/edit-doctors.component';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';

const routes: Routes = [
  {
  path: '', 
  component: DoctorsComponent,
  children:[
    {
      path: 'register',
      component: AddDoctorsComponent,
    },
    {
      path: 'list',
      component: ListDoctorsComponent,
    },
    {
      path: 'list/edit/:id',
      component: EditDoctorsComponent,
    },
    {
      path: 'list/profile/:id',
      component: DoctorsProfileComponent,
    },
  ]
}
];


 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
