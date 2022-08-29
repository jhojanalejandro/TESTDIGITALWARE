import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {  ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import swal from 'sweetalert2';
import { EmployeeService } from 'src/app/services/employee.service';
import { AddEmployeeComponent } from './modal-employee/add-employee.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort!: MatSort;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  raffleName: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['id','employeeName','lastName','identificationCard','email','diretion', 'phoneNumber','salary','acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _employeeService: EmployeeService,
      private _matDialog: MatDialog,
      private snackBar: MatSnackBar,
      private cdref: ChangeDetectorRef,
      private _liveAnnouncer: LiveAnnouncer){}
  
    columnas = [ 
      {title: 'identificador', name: 'id'},
      {title: 'Nombre', name: 'employeeName'},
      {title: 'Cedula', name: 'identificationCard'},
      {title: 'Correo', name: 'email'},
      {title: 'Apellido', name: 'lastName'},
      {title: 'direccion', name: 'diretion'},
      {title: 'telefono', name: 'phoneNumber'},
      {title: 'salario', name: 'salary'},
      {title: 'Acciones', name: 'acciones'},
    ]
  
    //metodo para animmación de columnas, para que se puedan mover de manera horizontal 
    drop(event: CdkDragDrop<string[]>){
          moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
    }
    ngOnInit(): void
    {
        this.getEmployeeData();
    }
       
      //metodo de filtrar los datos de las columnas
    applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();  
    }

  getEmployeeData(){
    this._employeeService.getEmployee()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {       
                 
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.data = data;  
    });
  }
    editEmployee(employee: any){
      const dialogRef =  this._matDialog.open(AddEmployeeComponent, {
        autoFocus: false,
        data     : {
          employee
        }
      });
      dialogRef.afterClosed().subscribe((result) => {        
        if(result){
          this.getEmployeeData();
        }
    }); 
  }
    
    deleteEmployee(element: any)
     {
      swal.fire({
        title: 'Deseas eliminar este registro?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.deleteconfirm(element.id);
          
        } 
      })

     }
     addEmployee(){
      const dialogRef =  this._matDialog.open(AddEmployeeComponent, {
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.getEmployeeData();
        }
    }); 
     }
     async deleteconfirm(id: any){
      
        (await this._employeeService.deleteEmployee(id)).subscribe((data : any) =>{
        if(data){
          swal.fire('Eliminado!', '', 'success')
        }else{
          this.snackBar.open('Ha ocurrido un error','vuelve a intentarlo',{
            duration:2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.getEmployeeData();
      })
    }

}
