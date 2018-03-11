import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeePage } from './employee';
import { EmployeeProvider } from '../../providers/employee';
 
  
@NgModule({
  declarations: [
    EmployeePage, 
  ],
  imports: [
    IonicPageModule.forChild(EmployeePage) 
  ]  ,
  providers:[
    EmployeeProvider
  ]
})
export class EmployeePageModule {}
