import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePersonalCheckDetailPage } from './attendance-personal-check-detail';

@NgModule({
  declarations: [
    AttendancePersonalCheckDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendancePersonalCheckDetailPage),
  ],
})
export class AttendancePersonalCheckDetailPageModule {}
