import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendancePersonalDetailPage } from './attendance-personal-detail';

@NgModule({
  declarations: [
    AttendancePersonalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendancePersonalDetailPage),
  ],
})
export class AttendancePersonalDetailPageModule {}
