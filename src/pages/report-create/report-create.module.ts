import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportCreatePage } from './report-create';

@NgModule({
  declarations: [
    ReportCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ReportCreatePage),
  ],
})
export class ReportCreatePageModule {}
