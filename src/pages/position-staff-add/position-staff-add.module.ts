import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositionStaffAddPage } from './position-staff-add';

@NgModule({
  declarations: [
    PositionStaffAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PositionStaffAddPage),
  ],
})
export class PositionStaffAddPageModule {}
