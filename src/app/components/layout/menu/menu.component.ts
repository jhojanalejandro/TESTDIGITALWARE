import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  mobileQuery: MediaQueryList;

  fillerNav=[
    {name:"INICIO", route:"TESTDIGITALWARE/ventas", icon:"home"},
    {name:"PRODUCTOS", route:"TESTDIGITALWARE/productos", icon:"assignment"},
    {name:"CLIENTES", route:"TESTDIGITALWARE/clientes", icon:"person"},
    {name:"EMPLPEADOS", route:"TESTDIGITALWARE/empleados", icon:" person_pin"},
    {name:"CONSULTAS", route:"TESTDIGITALWARE/consultas", icon:" work"},
  ]
 
  
    private _mobileQueryListener: () => void;
  
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }
  
    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  
    shouldRun =true;
    openDialog() {
      // const dialogRef = this.dialog.open(SettingsComponent);
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
      // });
    }

    


  ngOnInit(): void {
  }

}
