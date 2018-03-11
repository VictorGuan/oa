import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptCreatePage } from './dept-create';

@NgModule({
  declarations: [
    DeptCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DeptCreatePage),
  ],
})
export class DeptCreatePageModule {}
