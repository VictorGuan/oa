import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PunishmentRewardCreatePage } from './punishment-reward-create';

import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    PunishmentRewardCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PunishmentRewardCreatePage),ComponentsModule
  ],
})
export class PunishmentRewardCreatePageModule {}
