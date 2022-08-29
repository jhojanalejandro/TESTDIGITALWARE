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
import { AddSaleComponent } from './modal-sale/add-sale.component';
import { SaleService } from 'src/app/services/sale-service';
import { ProductService } from 'src/app/services/product-Service';
import { ClientService } from 'src/app/services/client-service';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.css']
})
export class ProductSaleComponent implements OnInit {
  @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort!: MatSort;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id','employeeId','clientId','productId', 'productCant','totalPrice','saleDate','actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _saleService: SaleService,
    private _productService: ProductService,
    private _employeeService: EmployeeService,
    private _clientService: ClientService,
      private _matDialog: MatDialog,
      private snackBar: MatSnackBar,
      private cdref: ChangeDetectorRef,
      private _liveAnnouncer: LiveAnnouncer){}
  
    columnas = [ 
      {title: 'id', name: 'id'},
      {title: 'Empleado', name: 'employeeId'},
      {title: 'cliente', name: 'clientId'},
      {title: 'Producto', name: 'productId'},
      {title: 'Cantidad producto', name: 'productCant'},
      {title: 'precio', name: 'totalPrice'},
      {title: 'fecha', name: 'saleDate'},
      {title: 'Acciones', name: 'actions'},
    ]
  
    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
    //metodo para animmación de columnas, para que se puedan mover de manera horizontal 
    drop(event: CdkDragDrop<string[]>){
          moveItemInArray(this.columnsToDisplay, event.previousIndex, event.currentIndex);
    }

    ngOnInit(): void
    {
        this.getSaleData();
    }
       
      //metodo de filtrar los datos de las columnas
    applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();  
    }

    ngAfterViewInit(): void
    {
        // Make the data source sortable
        this.dataSource.sort = this.recentTransactionsTableMatSort;
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

  getSaleData(){
    
    this._saleService.getProductDetail()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {
                   
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.data = data; 
      for (let index = 0; index < data.length; index++) {
        this.getClient(data[index].clientId,index);
        this.getEmployee(data[index].employeeId,index);
        this.getProduct(data[index].productId, index);
      }       

    });
  }

    editSale(sale: any){
      const dialogRef =  this._matDialog.open(AddSaleComponent, {
        autoFocus: false,
        data     : {
          sale
        }
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.getSaleData();
        }
    }); 
    }
    
    deleteSale(element: any)
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
     addSale(){
      const dialogRef =  this._matDialog.open(AddSaleComponent, {
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          this.getSaleData();
        }
    }); 
     }
     async deleteconfirm(id: any){
      
        (await this._saleService.deleteProductDetail(id)).subscribe((data : any) =>{
        if(data){
          swal.fire('Eliminado!', '', 'success')
        }else{
          this.snackBar.open('Ha ocurrido un error','vuelve a intentarlo',{
            duration:2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
        this.getSaleData();
      })
    }

    async getEmployee(id: any,i:any) {
      (await this._employeeService.getByIdEmployee(id)).subscribe((Response) => {
        this.dataSource.data[i].employeeId = Response.employeeName;
      });
  }
  
  async getProduct(id: any,i: any) {
    (await this._productService.getByIdProduct(id)).subscribe((Response) => {
      this.dataSource.data[i].productId = Response.productName;
    });
  }
  
  async getClient(id: any,i: any) {    
    
    (await this._clientService.getByIdClient(id)).subscribe((Response) => { 
      this.dataSource.data[i].clientId = Response.clientName;
    });
  }

}
