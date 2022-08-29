import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddClientComponent } from './modal-client/add-client.component';
import { CustomerListComponent } from './customer-list.component';

@NgModule({
  declarations: [
    AddClientComponent,
    CustomerListComponent
  ],
  imports: [CommonModule,SharedModule,AngularmaterialModule],
  exports: [
    AngularmaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class ClientModule {}
