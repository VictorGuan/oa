import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreAddressPage } from './store-address';

@NgModule({
  declarations: [
    StoreAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreAddressPage),
  ],
})
export class StoreAddressPageModule {}
