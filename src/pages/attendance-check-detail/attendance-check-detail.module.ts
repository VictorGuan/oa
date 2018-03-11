import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceCheckDetailPage } from './attendance-check-detail';

@NgModule({
  declarations: [
    AttendanceCheckDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceCheckDetailPage),
  ],
})
export class AttendanceCheckDetailPageModule {}
