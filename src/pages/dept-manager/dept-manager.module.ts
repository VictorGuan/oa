import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptManagerPage } from './dept-manager';

@NgModule({
  declarations: [
    DeptManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(DeptManagerPage),
  ],
})
export class DeptManagerPageModule {}
