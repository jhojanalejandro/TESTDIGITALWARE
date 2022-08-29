/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit,Inject, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IProduct } from 'src/app/models/ProductModel';
import { CategoryService } from 'src/app/services/categoryService';
import { ProductService } from 'src/app/services/product-Service';


@Component({
  selector: 'app-change-tickets',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit {
  registerDate = new Date();
  data: any;
  category: any;
  categoryId: any;
  formProduct!: FormGroup; 
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private _categoryService: CategoryService,
      private snackBar:MatSnackBar,
      private _productService: ProductService,
      public matDialogRef: MatDialogRef<AddProductComponent>,
      @Inject(MAT_DIALOG_DATA) private _data: { product: any }, private _formBuilder: FormBuilder
      ) {}

    ngOnInit(): void {      
      this.getCategory();
      this.formdata();
    }

    async addProduct() {

  
          if(this._data != null){
            const product: IProduct={
              id: this._data.product.id,
              productName: this.formProduct.value.productName,
              categoryId:this.formProduct.value.categoryId,
              price: this.formProduct.value.price,
              productCant: this.formProduct.value.productCant,
              codProduct: this.formProduct.value.codProduct,
              }; 
            (await  this._productService.updateProduct(product)).subscribe((data) =>{
              if(data){
                this.snackBar.open('Registro exitoso','Guardado',{
                  duration:2000,
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
            
                });
              }
              this.close();

            });
          }else{
            const product: IProduct={
              productName: this.formProduct.value.productName,
              categoryId:this.formProduct.value.categoryId,
              price: this.formProduct.value.price,
              productCant: this.formProduct.value.productCant,
              codProduct: this.formProduct.value.codProduct,
              }; 
            (await  this._productService.AddProduct(product)).subscribe((data) =>{
              this.snackBar.open('Registro exitoso','Guardado',{
                duration:2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
          
              });
              this.close();
            });
          }

      }
    async getCategory() {
        (await this._categoryService.getCategory()).subscribe((Response) => {
            this.category = Response;
        });
    }

    async getCategoryId() {
      (await this._categoryService.getByIdCategory(this._data.product.categoryId)).subscribe((Response) => {
          this.categoryId = Response;
      });
  }
  close(){
    this.data = 'vacio'    
    this.matDialogRef.close(this.data);   
  }

  formdata(){
    if(this._data != null){
      this.getCategoryId();
      this.formProduct = this._formBuilder.group({
        productName: new FormControl(this._data.product.productName, Validators.required),
        categoryId: new FormControl(this.categoryId, Validators.required),
        price: new FormControl(this._data.product.price, Validators.required),
        productCant: new FormControl(this._data.product.productCant, Validators.required),
        codProduct: new FormControl(this._data.product.codProduct, Validators.required),

      });
    }else{
      this.formProduct = this._formBuilder.group({
        productName: new FormControl(null, Validators.required),
        categoryId: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        productCant: new FormControl(null, Validators.required),
        codProduct: new FormControl(null, Validators.required),

      });
    }
  }
}

