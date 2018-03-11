import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceCheckItemDetailPage } from './attendance-check-item-detail';

@NgModule({
  declarations: [
    AttendanceCheckItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceCheckItemDetailPage),
  ],
})
export class AttendanceCheckItemDetailPageModule {}
