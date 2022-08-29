import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from 'src/app/views/customer-list/customer-list.component';
import { EmployeeListComponent } from 'src/app/views/employee-list/employee-list.component';
import { ProductSaleComponent } from 'src/app/views/product-sale/product-sale.component';
import { ProductsListComponent } from 'src/app/views/products-list/products-list.component';
import { QueryComponent } from 'src/app/views/query/query.component';



export const ParametriaRoutes: Routes = [
  { path: 'TESTDIGITALWARE/ventas', component: ProductSaleComponent },
  { path: 'TESTDIGITALWARE/productos', component: ProductsListComponent },
  { path: 'TESTDIGITALWARE/clientes', component: CustomerListComponent },
  { path: 'TESTDIGITALWARE/empleados', component: EmployeeListComponent },
  { path: 'TESTDIGITALWARE/consultas', component: QueryComponent },


];

export const APP_ROUTING_LAYOUT = RouterModule.forRoot(ParametriaRoutes);
