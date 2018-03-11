import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeSchedulingPage } from './employee-scheduling';

@NgModule({
  declarations: [
    EmployeeSchedulingPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeSchedulingPage),
  ],
})
export class EmployeeSchedulingPageModule {}
