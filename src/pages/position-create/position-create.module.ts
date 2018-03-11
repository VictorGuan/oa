import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositionCreatePage } from './position-create';

@NgModule({
  declarations: [
    PositionCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PositionCreatePage),
  ],
})
export class PositionCreatePageModule {}
