import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeePage } from './employee';
import { EmployeeProvider } from '../../providers/employee';
import { EmployeeLeavePage } from './employee-leave';
  
@NgModule({
  declarations: [
    EmployeeLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeLeavePage) 
  ]  ,
  providers:[
    EmployeeProvider
  ]
})
export class EmployeeLeavePageModule {}
