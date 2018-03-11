import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PunchClockPage } from './punch-clock';

@NgModule({
  declarations: [
    PunchClockPage,
  ],
  imports: [
    IonicPageModule.forChild(PunchClockPage),
  ],
})
export class PunchClockPageModule {}
