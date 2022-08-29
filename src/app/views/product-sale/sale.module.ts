import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QueryComponent } from '../query/query.component';
import { ProductSaleComponent } from './product-sale.component';
import { AddSaleComponent } from './modal-sale/add-sale.component';

@NgModule({
  declarations: [
    ProductSaleComponent,
    AddSaleComponent
  ],
  imports: [CommonModule,SharedModule,AngularmaterialModule],
  exports: [
    AngularmaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class ProductSaleModule {}
