import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';
import { ProductsListComponent } from './products-list.component';
import { AddProductComponent } from './modal-product/add-product.component';
import { DxBulletModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { DxDataGridModule } from "devextreme-angular";

@NgModule({
  declarations: [
    ProductsListComponent,
    AddProductComponent,
  ],
  imports: [CommonModule,AngularmaterialModule,DxButtonModule,    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,],
  exports: [
    AngularmaterialModule,DxButtonModule
  ],
  
})
export class ProductModule {}
