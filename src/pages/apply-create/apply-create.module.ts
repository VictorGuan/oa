import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyCreatePage } from './apply-create';
import { ApplyProvider } from '../../providers/apply';

@NgModule({
  declarations: [
    ApplyCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyCreatePage),
  ],
  providers:[
    ApplyProvider 
  ]
})
export class ApplyCreatePageModule {}
