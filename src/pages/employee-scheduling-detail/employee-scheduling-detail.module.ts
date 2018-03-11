import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeSchedulingDetailPage } from './employee-scheduling-detail';

@NgModule({
  declarations: [
    EmployeeSchedulingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeSchedulingDetailPage),
  ],
})
export class EmployeeSchedulingDetailPageModule {}
