import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/layout/menu/menu.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'TESTDIGITALWARE/ventas' },

  {
    path: '',
    children: [
      {
        path: '',
        component: MenuComponent,
        loadChildren: () =>
          import('../app/components/layout/menu/menu.module').then(
            (m) => m.MenuModule
          ),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
