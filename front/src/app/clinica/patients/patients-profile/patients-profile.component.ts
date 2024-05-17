import { Component } from '@angular/core';

@Component({
  selector: 'app-patients-profile',
  templateUrl: './patients-profile.component.html',
  styleUrls: ['./patients-profile.component.scss']
})
export class PatientsProfileComponent {
  patientProfile:any = [];
  option_selected:number = 1;
  optionSelected(value:number){
    this.option_selected = value;
  }
}
