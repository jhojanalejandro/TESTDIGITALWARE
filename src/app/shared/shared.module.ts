import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import {LOCALE_ID } from '@angular/core';
import { AngularmaterialModule } from '../angular material/angularmaterial.module';

registerLocaleData(localeEs, 'es'); //Esto no es un import, pero va justo despues de ellos!
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularmaterialModule,

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AngularmaterialModule,

    ],
    providers: [
    {provide: LOCALE_ID, useValue: 'es'} // Añades esta línea en los providers
  ],
})
export class SharedModule
{
}
