import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.scss']
})
export class ListAppointmentsComponent {
  public appointmentList:any = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public specialitie_id = '';
  public date = null;
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;//MIN
  public limit: number = this.pageSize;//MAX
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public patient_generals:any = [];
  public appointment_selected:any;

  specialities:any = [];

    constructor(
     
      public appointmentService: AppointmentService){
  
    }
    ngOnInit() {
      this.getTableData();

      


    this.appointmentService.listConfig().subscribe((resp:any) => {
      this.specialities = resp.specialities;
      //console.log(this.appointmentList);
    })
    }
  
    
    private getTableData(page=1): void {
      this.appointmentList = [];
      this.serialNumberArray = [];
  
      this.appointmentService.listAppointments(page,this.searchDataValue,this.specialitie_id,this.date).subscribe((resp:any) => {
  
        console.log(resp);
  
        this.totalData = resp.total;
        this.appointmentList = resp.appointments.data;
        // this.getTableDataGeneral();
        this.dataSource = new MatTableDataSource<any>(this.appointmentList);
        this.calculateTotalPages(this.totalData, this.pageSize);
      })
  
  
    }
    getTableDataGeneral() {
      this.appointmentList = [];
      this.serialNumberArray = [];
  
      this.patient_generals.map((res: any, index: number) => {
        const serialNumber = index + 1;
        if (index >= this.skip && serialNumber <= this.limit) {
          
          this.appointmentList.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<any>(this.appointmentList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    }
  
    selectUser(rol:any){
      this.appointment_selected = rol;
    }
  
    deleteAppointment(){
  
  this.appointmentService.deleteAppointment(this.appointment_selected.id).subscribe((resp:any)=>{
   console.log(resp);
   let INDEX = this.appointmentList.findIndex((item:any)=> item.id ==this.appointment_selected.id);
   if(INDEX != -1){
    this.appointmentList.splice(INDEX,1);
  
  
   $('#delete_appointment').hide();
    $("#delete_appointment").removeClass("show");
   $(".modal-backdrop").remove();
   $("body").removeClass();
     $("body").removeAttr("style");
   this.appointment_selected = null;
       // this.closebutton.nativeElement.click (); 
     }
   })
  
  }
  
    //para la eliminacion
   
  
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
 

    public searchData() {
      // this.dataSource.filter = value.trim().toLowerCase();
      // this.appointmentList = this.dataSource.filteredData;
      this.pageSelection = [];
      this.limit = this.pageSize;
      this.skip = 0;
      this.currentPage = 1;
  
      this.getTableData();
    }
  
    public sortData(sort: any) {
      const data = this.appointmentList.slice();
  
      if (!sort.active || sort.direction === '') {
        this.appointmentList = data;
      } else {
        this.appointmentList = data.sort((a:any, b:any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const aValue = (a as any)[sort.active];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const bValue = (b as any)[sort.active];
          return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
        });
      }
    }
  
public getMoreData(event: string): void {
  if (event === 'next') {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.skip = this.pageSize * this.pageIndex;
      this.limit = this.pageSize;
      this.getTableData();
    }
  } else if (event === 'previous') {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.skip = this.pageSize * this.pageIndex;
      this.limit = this.pageSize;
      this.getTableData();
    }
  }
}

    
    public moveToPage(pageNumber: number): void {
      this.currentPage = pageNumber;
      this.skip = this.pageSelection[pageNumber - 1].skip;
      this.limit = this.pageSelection[pageNumber - 1].limit;
      if (pageNumber > this.currentPage) {
        this.pageIndex = pageNumber - 1;
      } else if (pageNumber < this.currentPage) {
        this.pageIndex = pageNumber + 1;
      }
      this.getTableData();
    }
    
    public PageSize(): void {
      this.pageSelection = [];
      this.limit = this.pageSize;
      this.skip = 0;
      this.currentPage = 1;
      this.getTableData();
    }
    
    private calculateTotalPages(totalData: number, pageSize: number): void {
      this.pageNumberArray = [];
      this.totalPages = totalData / pageSize;
      if (this.totalPages % 1 !== 0) {
        this.totalPages = Math.trunc(this.totalPages) + 1;
      }
      
      for (let i = 1; i <= this.totalPages; i++) {
        const limit = pageSize * i;
        const skip = limit - pageSize;
        this.pageNumberArray.push(i);
        this.pageSelection.push({ skip: skip, limit: limit });
      }
    }
  }    