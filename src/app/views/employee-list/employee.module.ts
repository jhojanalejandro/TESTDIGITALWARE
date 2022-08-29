import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';
import { EmployeeListComponent } from './employee-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEmployeeComponent } from './modal-employee/add-employee.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    AddEmployeeComponent
  ],
  imports: [CommonModule,SharedModule,AngularmaterialModule],
  exports: [
    AngularmaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class EmployeeModule {}
