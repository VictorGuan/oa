import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Apply001Page } from './apply001';
import { ApplyProvider } from '../../../providers/apply';

@NgModule({
  declarations: [
    Apply001Page,
  ],
  imports: [
    IonicPageModule.forChild(Apply001Page),
  ], 
  providers:[
    ApplyProvider 
  ]
})
export class Apply001PageModule {}
