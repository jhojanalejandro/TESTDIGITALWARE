/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit,Inject, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IClient } from 'src/app/models/ClientModel';
import { ClientService } from 'src/app/services/client-service';


@Component({
  selector: 'app-change-tickets',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClientComponent implements OnInit {
  registerDate = new Date();
  data: any;
  formClient!: FormGroup; 
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private _clientService: ClientService,
      private snackBar:MatSnackBar,
      public matDialogRef: MatDialogRef<AddClientComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: { client: any },
      private _formBuilder: FormBuilder
      ) {}

    ngOnInit(): void {
      this.formData();
    }
    close(){
      this.data = 'vacio'
     
      this.matDialogRef.close(this.data);   
    }
    async updateClient() {

          if(this._data != null){
            const client: IClient={
              id: this._data.client.id,
              identificationCard:this.formClient.value.identificationCard,
              clientName: this.formClient.value.clientName,
              lastName: this.formClient.value.lastName,
              email: this.formClient.value.email,
              phoneNumber: this.formClient.value.phoneNumber,
              age: this.formClient.value.age,
              };
            (await  this._clientService.updateClient(client)).subscribe((data) =>{
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
            const client: IClient={
              identificationCard:this.formClient.value.identificationCard,
              clientName: this.formClient.value.clientName,
              lastName: this.formClient.value.lastName,
              email: this.formClient.value.email,
              phoneNumber: this.formClient.value.phoneNumber,
              age: this.formClient.value.age,
              };
            (await this._clientService.AddClient(client)).subscribe((data) =>{
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
          this.formClient = this._formBuilder.group({
            clientName: new FormControl(this._data.client.clientName, Validators.required),
            lastName: new FormControl(this._data.client.lastName, Validators.required),
            age: new FormControl(this._data.client.age, Validators.required),
            email: new FormControl(this._data.client.email, [Validators.required, Validators.email]),
            phoneNumber: new FormControl(this._data.client.phoneNumber, Validators.required),
            identificationCard: new FormControl(this._data.client.identificationCard , Validators.required),
        });
      }else{
        this.formClient = this._formBuilder.group({
          clientName: new FormControl(null, Validators.required),
          lastName: new FormControl(null, Validators.required),
          identificationCard: new FormControl(null, Validators.required),
          age: new FormControl(null, Validators.required),
          email: new FormControl(null, [Validators.required, Validators.email]),
          phoneNumber: new FormControl(null, Validators.required),
      });
      }
      }
}

