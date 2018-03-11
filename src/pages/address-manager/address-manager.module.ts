import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressManagerPage } from './address-manager';

@NgModule({
  declarations: [
    AddressManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressManagerPage),
  ],
})
export class AddressManagerPageModule {}
