import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministrativeManagerPage } from './administrative-manager';

@NgModule({
  declarations: [
    AdministrativeManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministrativeManagerPage),
  ],
})
export class AdministrativeManagerPageModule {}
