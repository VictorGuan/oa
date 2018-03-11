import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceSettingDetailPage } from './attendance-setting-detail';

@NgModule({
  declarations: [
    AttendanceSettingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceSettingDetailPage),
  ],
})
export class AttendanceSettingDetailPageModule {}
