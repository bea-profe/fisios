export class routes {

  private static Url = '';

  public static get baseUrl(): string {
    return this.Url;
  }
  
  public static get login(): string {
    return this.baseUrl + '/login';
  }
  public static get register(): string {
    return this.baseUrl + '/register';
  }
  
  public static get addAppointment(): string {
    return this.baseUrl + '/appointments-m/register';
  }
  public static get appointmentList(): string {
    return this.baseUrl + '/appointments-m/list';
  }
  public static get editAppointment(): string {
    return this.baseUrl + '/appointments/edit-appointment';
  }
  
  public static get calendar(): string {
    return this.baseUrl + '/calendar';
  }

  public static get adminDashboard(): string {
    return this.baseUrl + '/dashboard/admin-dashboard';
  }
  public static get doctorDashboard(): string {
    return this.baseUrl + '/dashboard/doctor-dashboard';
  }
  public static get patientDashboard(): string {
    return this.baseUrl + '/dashboard/patient-dashboard';
  }
  //
  public static get addDepartment(): string {
    return this.baseUrl + '/specialities/register';
  }
  public static get departmentList(): string {
    return this.baseUrl + '/specialities/list';
  }
  //
  public static get editDepartment(): string {
    return this.baseUrl + '/departments/edit-department';
  }
  public static get addDoctor(): string {
    return this.baseUrl + '/doctors/register';
  }
  public static get doctorProfile(): string {
    return this.baseUrl + '/doctor/doctor-profile';
  }
  public static get doctorSetting(): string {
    return this.baseUrl + '/doctor/doctor-setting';
  }
  //mio
  public static get doctorsList(): string {
    return this.baseUrl + '/doctors/list';
  }
  public static get editDoctor(): string {
    return this.baseUrl + '/doctor/edit-doctor';
  }
  public static get addSchedule(): string {
    return this.baseUrl + '/doctor-schedule/add-schedule';
  }
  public static get editSchedule(): string {
    return this.baseUrl + '/doctor-schedule/edit-schedule';
  }
  public static get schedule(): string {
    return this.baseUrl + '/doctor-schedule/schedule';
  }
  public static get email(): string {
    return this.baseUrl + '/email';
  }
  
  public static get addPatient(): string {
    return this.baseUrl + '/patients/register';
  }
  public static get editPatient(): string {
    return this.baseUrl + '/patient/edit-patient';
  }
  public static get patientProfile(): string {
    return this.baseUrl + '/patient/patient-profile';
  }
  public static get patientSetting(): string {
    return this.baseUrl + '/patient/patient-setting';
  }
  public static get patientsList(): string {
    return this.baseUrl + '/patients/list';
  }
  
  
  public static get addStaff(): string {
    return this.baseUrl + '/staffs/add-staff';
  }
  
  public static get staffList(): string {
    return this.baseUrl + '/staffs/list-staff';
  }
 
  public static get error404(): string {
    return this.baseUrl + '/error/error404';
  }
  public static get error500(): string {
    return this.baseUrl + '/error/error500';
  }
  public static get registerRole(): string {
    return this.baseUrl + '/roles/register';
  }
  public static get listadoRole(): string {
    return this.baseUrl + '/roles/list';
  }
}
