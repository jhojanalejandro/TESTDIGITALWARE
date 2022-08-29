/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit,Inject, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IEmployee } from 'src/app/models/EmployeeModel';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-change-tickets',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
  registerDate = new Date();
  data: any;
  formEmployee!: FormGroup; 
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private _employeeService: EmployeeService,
      private snackBar:MatSnackBar,
      public matDialogRef: MatDialogRef<AddEmployeeComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: { employee: any },
      private _formBuilder: FormBuilder
      ) {}

    ngOnInit(): void {
      this.formData();
    }
    close(){
      this.data = 'vacio'
     
      this.matDialogRef.close(this.data);   
    }
    async updateEmployee() {

          if(this._data != null){
            const employee: IEmployee={
              id: this._data.employee.id,
              identificationCard:this.formEmployee.value.identificationCard,
              employeeName: this.formEmployee.value.employeeName,
              lastName: this.formEmployee.value.lastName,
              diretion: this.formEmployee.value.direction,
              phoneNumber: this.formEmployee.value.phoneNumber,
              salary: this.formEmployee.value.salary,
              email: this.formEmployee.value.email,
              };
            (await  this._employeeService.updateEmployee(employee)).subscribe((data) =>{
              if(data){
                this.snackBar.open('Registro exitoso','Guardado',{
                  duration:2000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                this.data = data;
                this.matDialogRef.close(this.data); 
              }
   
            });
          }else{
            const employee: IEmployee={
              identificationCard:this.formEmployee.value.identificationCard,
              employeeName: this.formEmployee.value.employeeName,
              lastName: this.formEmployee.value.lastName,
              diretion: this.formEmployee.value.direction,
              phoneNumber: this.formEmployee.value.phoneNumber,
              salary: this.formEmployee.value.salary,
              email: this.formEmployee.value.email,
              };
            (await  this._employeeService.AddEmployee(employee)).subscribe((data) =>{
              if(data){
                this.snackBar.open('Registro exitoso','Actualizado',{
                  duration:2000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
                this.data = data;
                this.matDialogRef.close(this.data); 
              }
   
            });
          }

      }
      formData(){
        
        console.log('datos', this._data);
        
        if(this._data != null){
          this.formEmployee = this._formBuilder.group({
            employeeName: new FormControl(this._data.employee.employeeName, Validators.required),
            lastName: new FormControl(this._data.employee.lastName, Validators.required),
            salary: new FormControl(this._data.employee.salary, Validators.required),
            email: new FormControl(this._data.employee.email, [Validators.required, Validators.email]),
            phoneNumber: new FormControl(this._data.employee.phoneNumber, Validators.required),
            direction: new FormControl(this._data.employee.diretion, Validators.required),
            identificationCard: new FormControl(this._data.employee.identificationCard , Validators.required),
        });
      }else{
        this.formEmployee = this._formBuilder.group({
          employeeName: new FormControl(null, Validators.required),
          lastName: new FormControl(null, Validators.required),
          salary: new FormControl(null, Validators.required),
          email: new FormControl(null, [Validators.required, Validators.email]),
          phoneNumber: new FormControl(null, Validators.required),
          direction: new FormControl(null, Validators.required),
          identificationCard: new FormControl(null, Validators.required),
      });
      }
      }
}

