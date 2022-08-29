import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';
import { ParametriaRoutes } from './menu-routing.module';
import { CustomerListComponent } from 'src/app/views/customer-list/customer-list.component';
import { MenuComponent } from './menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeModule } from 'src/app/views/employee-list/employee.module';
import { ProductModule } from 'src/app/views/products-list/product.module';
import { ProductSaleModule } from 'src/app/views/product-sale/sale.module';
import { QueryComponent } from 'src/app/views/query/query.component';
import { DxButtonModule } from 'devextreme-angular';
import { ClientModule } from 'src/app/views/customer-list/client.module';


@NgModule({
  declarations: [
    MenuComponent,
    QueryComponent
  ],
  imports: [
    CommonModule,    
    AngularmaterialModule,
    SharedModule,
    EmployeeModule,
    ProductSaleModule,
    ProductModule,
    DxButtonModule,
    ClientModule,
    RouterModule.forChild(ParametriaRoutes)
  ],
  exports: [
    AngularmaterialModule
  ]
})
export class MenuModule { }
