import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceSettingPage } from './attendance-setting';

import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    AttendanceSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceSettingPage),ComponentsModule
  ],
})
export class AttendanceSettingPageModule {}
