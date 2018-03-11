import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportManagerPage } from './report-manager';

@NgModule({
  declarations: [
    ReportManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportManagerPage),
  ],
})
export class ReportManagerPageModule {}
