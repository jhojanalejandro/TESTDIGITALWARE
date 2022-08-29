/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit,Inject, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/services/client-service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProductService } from 'src/app/services/product-Service';
import { SaleService } from 'src/app/services/sale-service';


@Component({
  selector: 'app-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSaleComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  data: any;
  clients: any;
  employee: any;
  products: any;
  total: number = 0;

  formInventory!: FormGroup; 
    constructor(private _saleService: SaleService,
      private _productService: ProductService,
      private _employeeService: EmployeeService,
      private _clientService: ClientService,
      private snackBar:MatSnackBar,
      public matDialogRef: MatDialogRef<AddSaleComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: { sale: any },
       private _formBuilder: FormBuilder) 
       {}

    ngOnInit(): void {
        this.getClient();
        this.getEmployee();
        this.getProduct();
        this.formData();
    }

  async AddInventory() {
   
      if(this._data != null){
        const inventory: any={
          id: this._data.sale.id,
          productId: this.formInventory.value.productId,
          clientId: this.formInventory.value.clientId,
          EmployeeId: this.formInventory.value.EmployeeId,
          productCant: this.formInventory.value.productCant,
          totalPrice: this.total,
          saleDate: this.formInventory.value.saleDate,
    
          };
        (await  this._saleService.updateProductDetail(inventory)).subscribe((data) =>{
          if(data){
            this.snackBar.open('Registro exitoso','Actualizado',{
              duration:2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
          this.close();
        }) 
      }else{
        const inventory: any={
          productId: this.formInventory.value.productId,
          clientId: this.formInventory.value.clientId,
          EmployeeId: this.formInventory.value.EmployeeId,
          productCant: this.formInventory.value.productCant,
          totalPrice: this.total,
          saleDate: this.formInventory.value.saleDate,
    
          };
        (await  this._saleService.AddInventory(inventory)).subscribe((data) =>{
          if(data){
            this.snackBar.open('Registro exitoso','Guardado',{
              duration:2000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
         
        }) 
      }
      this.updateCant();
      this.close();

}
async updateCant(){
  const cant: any={
    id: this.formInventory.value.productId,
    productCant: this.formInventory.value.productCant,
    };
  (await  this._productService.updateProductCant(cant)).subscribe((data) =>{
    if(data){
      this.snackBar.open('Registro exitoso','Guardado',{
        duration:2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    this.close();
  }) 

}

async getEmployee() {
    (await this._employeeService.getEmployee()).subscribe((Response) => {
        this.employee = Response;
    });
}

async getProduct() {
  (await this._productService.getProduct()).subscribe((Response) => {
      this.products = Response;
  });
}

async getClient() {
  (await this._clientService.getClient()).subscribe((Response) => {
      this.clients = Response;
  });
}

async calculatePrice(){
  let id =   this.formInventory.value.productId;
  (await this._productService.getByIdProduct(id)).subscribe((Response) => {
    this.total = Response.price * this.formInventory.value.productCant;
    return this.total;
  });
}
  close(){
    this.data = 'cancel'
  
    this.matDialogRef.close(this.data);   
  }
  formData(){
    console.log('llega', this._data);
    
    if(this._data != null){
        this.formInventory = this._formBuilder.group({
          productId: new FormControl(this._data.sale.productId, Validators.required),
          clientId: new FormControl(this._data.sale.clientId, Validators.required),
          EmployeeId: new FormControl(this._data.sale.employeeId, Validators.required),
          productCant: new FormControl(this._data.sale.productCant, Validators.required),
          totalPrice: new FormControl(this._data.sale.totalPrice, Validators.required),
          saleDate: new FormControl(this._data.sale.saleDate, Validators.required),
      });
    }else{
      this.formInventory = this._formBuilder.group({
        productId: new FormControl(null, Validators.required),
        clientId: new FormControl(null, Validators.required),
        EmployeeId: new FormControl(null, Validators.required),
        productCant: new FormControl(null, Validators.required),
        totalPrice: new FormControl(null, Validators.required),
        saleDate: new FormControl(null, Validators.required),

    });
  }
  }

}

