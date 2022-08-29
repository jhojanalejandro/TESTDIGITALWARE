import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {  ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import swal from 'sweetalert2';
import { ProductService } from 'src/app/services/product-Service';
import { AddProductComponent } from './modal-product/add-product.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort!: MatSort;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['id','codProduct','productName','categoryId','price', 'productCant','actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _productService: ProductService,
      private _matDialog: MatDialog,
      private snackBar: MatSnackBar)
    {
    }
  
    columnas = [ 
      {title: 'id', name: 'id'},
      {title: 'codigo productgo', name: 'codProduct'},
      {title: 'Nombre', name: 'productName'},
      {title: 'CATEGORIA', name: 'categoryId'},
      {title: 'PRECIO', name: 'price'},
      {title: 'CANTIDAD', name: 'productCant'},
      {title: 'ACCIONES', name: 'actions'},
    ]

    ngOnInit(): void
    {
        this.getProductsData();
    }
       
      //metodo de filtrar los datos de las columnas
    applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();  
    }

  getProductsData(){
    
    this._productService.getProduct()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {       
                 
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.data = data;  
    });
  }

 
    editProduct(product: any){
      const dialogRef =  this._matDialog.open(AddProductComponent, {
        autoFocus: false,
        data     : {
          product
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.getProductsData();
        }
    }); 
    }
    
    deleteProduct(element: any)
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

     async deleteconfirm(id: any){
        (await this._productService.deleteProduct(id)).subscribe((data : any) =>{
        if(data){
          swal.fire('Eliminado!', '', 'success')
          this.getProductsData();
        }else{
          this.snackBar.open('Ha ocurrido un error','vuelve a intentarlo',{
            duration:2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      })
    }

    addProduct(){
      const dialogRef =  this._matDialog.open(AddProductComponent, {
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.getProductsData();
        }
    }); 
  }

}
