import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportSettingPage } from './report-setting';

import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ReportSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportSettingPage),ComponentsModule
  ],
})
export class ReportSettingPageModule {}
