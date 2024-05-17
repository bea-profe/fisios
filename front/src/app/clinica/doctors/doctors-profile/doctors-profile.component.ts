import { Component } from '@angular/core';

@Component({
  selector: 'app-doctors-profile',
  templateUrl: './doctors-profile.component.html',
  styleUrls: ['./doctors-profile.component.scss']
})
export class DoctorsProfileComponent {
 patientProfile:any = [];
  option_selected:number = 1;
  optionSelected(value:number){
    this.option_selected = value;
  }
}
