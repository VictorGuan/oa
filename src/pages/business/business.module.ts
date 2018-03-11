import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusinessPage } from './business';

//import { StoreManagerPage } from '../store-manager/store-manager';

@NgModule({
  declarations: [
    BusinessPage,
    //StoreManagerPage
  ],
  imports: [
    IonicPageModule.forChild(BusinessPage,)
  ],
})
export class BusinessPageModule {}
