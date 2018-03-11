import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositionDetailPage } from './position-detail';

@NgModule({
  declarations: [
    PositionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PositionDetailPage),
  ],
})
export class PositionDetailPageModule {}
