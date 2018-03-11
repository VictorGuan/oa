import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptDetailPage } from './dept-detail';

@NgModule({
  declarations: [
    DeptDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeptDetailPage),
  ],
})
export class DeptDetailPageModule {}
