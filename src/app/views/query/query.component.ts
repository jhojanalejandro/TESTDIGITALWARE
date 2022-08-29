import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product-Service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3 = new MatTableDataSource<any>();
  displayedColumns: string[] = ['clientName','lastName','identificationCard', 'email'];
  displayedColumns2: string[] = ['productName', 'productCant','price'];
  displayedColumns3: string[] = ['total','productName'];

  columnsToDisplay: string[] = this.displayedColumns.slice();
  columnsToDisplay2: string[] = this.displayedColumns2.slice();
  columnsToDisplay3: string[] = this.displayedColumns3.slice();
  constructor(private _productService: ProductService,) { }

  ngOnInit(): void {
    this.getQuery1();
    this.getQuery2();
    this.getQuery3();
  }

  columnas = [ 
    {title: 'Nombre', name: 'clientName'},
    {title: 'CATEGORIA', name: 'lastName'},
    {title: 'PRECIO', name: 'identificationCard'},
    {title: 'CANTIDAD', name: 'email'},
  ]
  columnas2= [ 
    {title: 'Nombre', name: 'productName'},
    {title: 'PRECIO', name: 'price'},
    {title: 'CANTIDAD', name: 'productCant'},
  ]
  columnas3 = [ 
    {title: 'Nombre', name: 'productName'},
    {title: 'TOTAL', name: 'total'},
  ]
  getQuery1(){
    this._productService.getQuery1().subscribe((data) => {                 
      this.dataSource= new MatTableDataSource(data);
      this.dataSource.data = data;  
    });
  }

  getQuery2(){
    this._productService.getQuery2().subscribe((data) => {       
      this.dataSource2= new MatTableDataSource(data);
      this.dataSource2.data = data;  
    });
  }
  getQuery3(){
    this._productService.getQuery3().subscribe((data) => {       
      this.dataSource3= new MatTableDataSource(data);
      this.dataSource3.data = data;  
    });
  }
}
