import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyManagerPage } from './apply-manager';
import { ApplyProvider } from '../../providers/apply';

@NgModule({
  declarations: [
    ApplyManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyManagerPage),
  ],
  providers:[
    ApplyProvider
  ]
})
export class ApplyManagerPageModule {}
