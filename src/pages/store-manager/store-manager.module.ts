import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreManagerPage } from './store-manager';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 

@NgModule({
  declarations: [
    StoreManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreManagerPage),
  ],
  providers : [
    BusinessServiceProvider
  ]
})
export class StoreManagerPageModule {}
