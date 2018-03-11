import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PunishmentRewardOpenPage } from './punishment-reward-open';

import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    PunishmentRewardOpenPage,
  ],
  imports: [
    IonicPageModule.forChild(PunishmentRewardOpenPage),ComponentsModule
  ],
})
export class PunishmentRewardOpenPageModule {}
