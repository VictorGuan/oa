import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceCheckPage } from './attendance-check';

import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    AttendanceCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceCheckPage),ComponentsModule
  ],
})
export class AttendanceCheckPageModule {}
