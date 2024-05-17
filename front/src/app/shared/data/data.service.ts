import { Injectable } from '@angular/core';
import { routes } from '../routes/routes';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiResultFormat } from '../models/models';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getDoctorsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/doctors-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPatientsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/doctors-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/staff-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAppointmentList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/appointment-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffHoliday(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/staff-holiday.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSchedule(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/schedule.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoices(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPayments(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/payments.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenses(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/expenses.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTaxes(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/taxes.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProvidentFund(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/provident-fund.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDepartmentList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/department-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalary(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/salary.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAssetsList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/assets-list.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenseReports(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/expense-reports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoiceReports(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoice-reports.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getAllInvoice(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/all-invoice.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPatientDashboard(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/patient-dashboard.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesPaid(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-paid.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesOverdue(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-overdue.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesDraft(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-draft.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesCancelled(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-cancelled.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInvoicesRecurring(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/invoices-recurring.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStaffLeave(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/json/staff-leave.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEvents() {
    return this.http.get<apiResultFormat>('assets/json/scheduleevents.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getDataTables() {
    return this.http.get<apiResultFormat>('assets/json/data-tables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }


  public sideBar = [
    {
      tittle: 'Menu',
      showAsTab: false,
      separateRoute: false,
      menu: [
    
        {
          menuValue: 'Roles-Permisos',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'gallery',
          base2: 'profile',
          icon: 'fa-columns',
          faIcon: true,
          subMenus: [
            {
              menuValue: 'Registrar Rol',
              route: routes.registerRole,
              base: routes.registerRole,
              permision: 'register_rol',
              show_nav: true,
            },
            {
              menuValue: 'Listado',
              route: routes.listadoRole,
              base: routes.listadoRole,
              permision: 'list_rol',
              show_nav: true,
            },
            {
              menuValue: 'Edit Rol',
              route: '',
              base: '',
              permision: 'edit_rol',
              show_nav: false,
            },
            {
              menuValue: 'Delete Rol',
              route: '',
              base: '',
              permision: 'delete_rol',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Usuarios',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'staffs',
          img: 'assets/img/icons/menu-icon-08.svg',
          subMenus: [
          
            {
              menuValue: 'Añadir usuario',
              route: routes.addStaff,
              base: routes.addStaff,
              permision: 'register_staff',
              show_nav: true,
            },
            {
              menuValue: 'Listar usuarios ',
              route: routes.staffList,
              base: routes.staffList,
              permision: 'list_staff',
              show_nav: true,
            },
            
            
          ],
        },{
          menuValue: 'Especialidades',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'specialtys',
          img: 'assets/img/icons/menu-icon-06.svg',
          subMenus: [
           
            {
              menuValue: 'Añadir Especialidad',
              route: routes.addDepartment,
              base: routes.addDepartment,
              permision: 'register_specialty',
              show_nav: true,
            },
            {
              menuValue: 'Lista Especialidades ',
              route: routes.departmentList,
              base: routes.departmentList,
              permision: 'list_specialty',
              show_nav: true,
            },
          ],
        },
        {
          menuValue: 'Profesionales',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'doctor',
          img: 'assets/img/icons/menu-icon-02.svg',
          subMenus: [
           
            {
              menuValue: 'Añadir profesional',
              route: routes.addDoctor,
              base: routes.addDoctor,
              permision: 'register_doctor',
              show_nav: true,
            },
            {
              menuValue: 'Editar profesional',
              route: '',
              base: '',
              permision: 'edit_doctor',
              show_nav: false,
            },
            {
              menuValue: 'Listar profesional',
              route: routes.doctorsList,
              base: routes.doctorsList,
              permision: 'list_doctor',
              show_nav: true,
            },
            {
              menuValue: 'Delete Doctor',
              route: '',
              base: '',
              permision: 'delete_doctor',
              show_nav: false,
            },
            {
              menuValue: 'Profile',
              route: '',
              base: '',
              permision: 'profile_doctor',
              show_nav: false,
            },
          ],
        },
        {
          menuValue: 'Pacientes',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'patient',
          img: 'assets/img/icons/menu-icon-03.svg',
          subMenus: [
            {
              menuValue: 'Añadir paciente',
              route: routes.addPatient,
              base: routes.addPatient,
              permision: 'register_patient',
              show_nav: true,
            },
            {
              menuValue: 'Listado pacientes',
              route: routes.patientsList,
              base: routes.patientsList,
              permision: 'list_patient',
              show_nav: true,
            },
           
            {
              menuValue: 'Editar pacientes',
              route: '',
              base: '',
              permision: 'edit_patient',
              show_nav: false,
            },
            {
              menuValue: 'Delete Patients',
              route: '',
              base: '',
              permision: 'delete_patient',
              show_nav: false,
            },
            {
              menuValue: 'Patients Profile',
              route: '',
              base: '',
              permision: 'profile_patient',
              show_nav: false,
            },
          ],
        },
       
        {
          menuValue: 'Citas',
          hasSubRoute: true,
          showSubRoute: false,
          base: 'appointments',
          img: 'assets/img/icons/menu-icon-04.svg',
          subMenus: [
            {
              menuValue: 'Registrar cita',
              route: routes.addAppointment,
              base: routes.addAppointment,
              permision: 'register_appointment',
              show_nav: true,
            },
            {
              menuValue: 'Listar citas',
              route: routes.appointmentList,
              base: routes.appointmentList,
              permision: 'list_appointment',
              show_nav: true,
            },
            
            {
              menuValue: 'Edit Appointment',
              route: '',
              base: '',
              permision: 'edit_appointment',
              show_nav: false,
            },
            {
              menuValue: 'Delete Appointment',
              route: '',
              base: '',
              permision: 'delete_appointment',
              show_nav: false,
            },
          ],
        },
        
   
        {
          menuValue: 'Calendario',
          route: routes.calendar,
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'fa-calendar',
          faIcon: true,
          base: 'calendar',
          permision: 'calendar',
          show_nav: true,
          subMenus: [],
        },
        
        
      ],
    },
  ];

 

  


}
