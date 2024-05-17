import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../service/appointment.service';


import { Moment } from 'moment';
import * as moment from 'moment';
import 'moment-timezone'; // Importa moment-timezone
import { DateAdapter } from '@angular/material/core';
import { DateFilterFn } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-appointments',
  templateUrl: './edit-appointments.component.html',
  styleUrls: ['./edit-appointments.component.scss']
})
export class EditAppointmentsComponent {
  // Propiedades del componente
  hours: any[] = [];
  specialities: any[] = [];
  date_appointment: Date = new Date();
  hour: any = [];
  specialitie_id: any;
  name: string = '';
  surname: string = '';
  DNI: string = '';
  movil: string = '';
  amount: number = 0;
  amount_add: number = 0;
  method_payment: string = '';
  DOCTOR_SELECTED: any;
  DOCTORS: any = [];
  selected_segment_hour: any;
  public text_success: string = '';
  public text_validation: string = '';
  public appointment_id: any;
  public appointment_selected: any;

  constructor(
    public appointmentService: AppointmentService,
    public activatedRoute: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.date_appointment = new Date();
  }

  ngOnInit(): void {
    // Método ejecutado al inicializar el componente
    moment.locale('es'); // Establecer el idioma local de moment.js a español
    moment.tz.setDefault('Europe/Madrid'); // Establecer la zona horaria por defecto a Europa/Madrid (España)
    this.dateAdapter.getFirstDayOfWeek = () => { return 1; } // Para que empiece en lunes.

    // Obtener el ID de la cita de los parámetros de la URL
    this.activatedRoute.params.subscribe((resp: any) => {
      console.log(resp);
      this.appointment_id = resp.id;
    });

    // Cargar configuraciones y detalles de la cita seleccionada
    this.appointmentService.listConfig().subscribe((resp: any) => {
      this.hours = resp.hours;
      this.specialities = resp.specialities;
      this.appointmentService.showAppointment(this.appointment_id).subscribe((resp: any) => {
        console.log(resp);
        this.appointment_selected = resp.appointment;
        this.name = this.appointment_selected.patient.name;
        this.surname = this.appointment_selected.patient.surname;
        this.movil = this.appointment_selected.patient.movil;
        this.DNI = this.appointment_selected.patient.DNI;
        this.specialitie_id = this.appointment_selected.specialitie_id;
        this.hour = this.appointment_selected.segment_hour.formatted_segment.hour;
      });
    });
  }


  dateFilter: DateFilterFn<Moment | null> = (date: Moment | null): boolean => {
    return !!date && moment(date).isSameOrAfter(moment(), 'day');
  };
  // Filtrar datos de acuerdo a la fecha, hora y especialidad seleccionadas
  filtrar(): void {
    const data = {
      //para que me formate la hora en este Huso Horario
      date_appointment: moment(this.date_appointment).format('YYYY-MM-DD'),
      hour: this.hour,
      specialitie_id: this.specialitie_id
    };

    this.appointmentService.listFilter(data).subscribe((resp: any) => {
      console.log(resp);
      this.DOCTORS = resp.doctors;
    });
  }

  // Verificar si el doctor seleccionado coincide con el doctor de la cita
  isDoctorMatch(selectedDoctor: any): boolean {
    return selectedDoctor.doctor.id === this.appointment_selected.doctor_id;
  }

  // Verificar si el segmento seleccionado coincide con el segmento de la cita
  isSegmentMatch(selectedSegment: any): boolean {
    return selectedSegment.id === this.appointment_selected.doctor_schedule_join_hour_id;
  }

  // Contar la disponibilidad de segmentos de horarios no ocupados para un doctor
  countDisponibilidad(DOCTOR: any): number {
    let SEGMENTS = DOCTOR.segments.filter((item: any) => !item.is_appointment);
    return SEGMENTS.length;
  }

  // Mostrar detalles de un doctor seleccionado
  showSegment(DOCTOR: any): void {
    this.DOCTOR_SELECTED = DOCTOR;
  }

  // Seleccionar un segmento de horario
  selectSegment(SEGMENT: any): void {
    this.selected_segment_hour = SEGMENT;
  }

  // Reiniciar la selección del doctor y el segmento
  resetDoctorSelection($event: any): void {
    this.DOCTORS = [];
    this.selected_segment_hour = null;
    this.DOCTOR_SELECTED = null;
  }

  // Guardar cambios en la cita médica
  save(): void {
    this.text_validation = "";

    // Validar campos requeridos
    if (!this.date_appointment || !this.specialitie_id) {
      this.text_validation = "Los campos son necesarios (fecha y especialidad).";
      return;
    }

    // Validar si se seleccionó una nueva fecha y hora
    if (new Date(this.date_appointment).getTime() !== new Date(this.appointment_selected.date_appointment).getTime()) {
      if (!this.selected_segment_hour) {
        this.text_validation = "Seleccione una franja horaria diferente.";
        return;
      }
    }
    const formattedDate = moment(this.date_appointment).format('YYYY-MM-DD');
    // Datos de la cita a actualizar
    const data = {
      doctor_id: this.DOCTOR_SELECTED.doctor.id,
      date_appointment: formattedDate,
      specialitie_id: this.specialitie_id,
      doctor_schedule_join_id: this.selected_segment_hour.id ? this.selected_segment_hour.id : this.appointment_selected.doctor_schedule_join_id,
    };

    // Llamar al servicio para actualizar la cita médica
    this.appointmentService.updateAppointment(this.appointment_id, data).subscribe((resp: any) => {
      console.log(resp);
      this.text_success = "La cita médica se actualizó correctamente.";
    });
  }

  //

  

  
  // Filtrar pacientes por DNI
  dnifilter(): void {
    this.appointmentService.listPatient(this.DNI).subscribe((resp: any) => {
      console.log(resp);
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
