import { Component, OnInit } from '@angular/core';
import { DateFilterFn } from '@angular/material/datepicker';
import { Moment } from 'moment';
import * as moment from 'moment';
import 'moment-timezone'; // Importa moment-timezone
import { DateAdapter } from '@angular/material/core';

import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent implements OnInit {
  date_appointment: Date = new Date();
  hours: any[] = [];
  specialities: any[] = [];
  hour: any;
  specialitie_id: any;
  name: string = '';
  surname: string = '';
  DNI: string = '';
  movil: string = '';
  amount: number = 0;
  amount_add: number = 0;
  method_payment: string = '';
  DOCTOR_SELECTED: any;
  DOCTORS: any[] = [];
  selected_segment_hour: any;
  text_success: string = '';
  text_validation: string = '';

  constructor(private appointmentService: AppointmentService, private dateAdapter: DateAdapter<Date>) {

    this.date_appointment = new Date(); // Inicializar con la fecha actual
  }

  ngOnInit(): void {
    moment.locale('es'); // Establecer el idioma local de moment.js a español

    moment.tz.setDefault('Europe/Madrid'); // Establecer la zona horaria por defecto a Europa/Madrid (España)
    this.dateAdapter.getFirstDayOfWeek = () => { return 1; }//para que empiece en lunes.

    this.fetchConfigData();
  }

  fetchConfigData(): void {
    this.appointmentService.listConfig().subscribe((resp: any) => {
      this.hours = resp.hours;
      this.specialities = resp.specialities;
      console.log("Configuración cargada con éxito");
    });
  }

  dateFilter: DateFilterFn<Moment | null> = (date: Moment | null): boolean => {
    return !!date && moment(date).isSameOrAfter(moment(), 'day');
  };

  filtrar(): void {
    const data = {
      date_appointment: moment(this.date_appointment).format('YYYY-MM-DD'),
      hour: this.hour,
      specialitie_id: this.specialitie_id
    };

    this.appointmentService.listFilter(data).subscribe((resp: any) => {
      this.DOCTORS = resp.doctors;
    });
  }

  countDisponibilidad(DOCTOR: any): number {
    const SEGMENTS = DOCTOR.segments.filter((item: any) => !item.is_appointment);
    return SEGMENTS.length;
  }

  showSegment(DOCTOR: any): void {
    this.DOCTOR_SELECTED = DOCTOR;
  }

  selectSegment(SEGMENT: any): void {
    this.selected_segment_hour = SEGMENT;
  }

  save(): void {
    if (!this.name || !this.surname || !this.movil || !this.date_appointment || !this.specialitie_id || !this.selected_segment_hour) {
      this.text_validation = 'Todos los campos son obligatorios (HORA, FECHA, ESPECIALIDAD, PACIENTE)';
      return;
    }

    const formattedDate = moment(this.date_appointment).format('YYYY-MM-DD');

    const doctorId = this.DOCTOR_SELECTED && this.DOCTOR_SELECTED.doctor ? this.DOCTOR_SELECTED.doctor.id : null;
    const segmentId = this.selected_segment_hour ? this.selected_segment_hour.id : null;

    const data = {
      doctor_id: doctorId,
      name: this.name,
      surname: this.surname,
      movil: this.movil,
      DNI: this.DNI,
      date_appointment: formattedDate,
      specialitie_id: this.specialitie_id,
      doctor_schedule_join_id: segmentId
    };

    this.appointmentService.registerAppointment(data).subscribe((resp: any) => {
      this.text_success = 'La cita médica se registró correctamente.';
    });
  }

  dnifilter(): void {
    this.appointmentService.listPatient(this.DNI).subscribe((resp: any) => {
      if (resp.message == 403) {
        this.name = '';
        this.surname = '';
        this.movil = '';
        this.DNI = '';
      } else {
        this.name = resp.name;
        this.surname = resp.surname;
        this.movil = resp.movil;
        this.DNI = resp.DNI;
      }
    });
  }
}
