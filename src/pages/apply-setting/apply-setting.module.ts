import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplySettingPage } from './apply-setting';
import { ApplyProvider } from '../../providers/apply';

@NgModule({
  declarations: [
    ApplySettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplySettingPage),
  ],
  providers:[
    ApplyProvider
  ]
})
export class ApplySettingPageModule {}
