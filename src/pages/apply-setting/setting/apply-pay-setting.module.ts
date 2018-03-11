import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyPaySettingPage } from './apply-pay-setting';
import { ApplyProvider } from '../../../providers/apply';
import { EmployeeProvider } from '../../../providers/employee';

@NgModule({
  declarations: [
    ApplyPaySettingPage 
  ],
  imports: [
    IonicPageModule.forChild(ApplyPaySettingPage),
  ] ,
  providers:[
    ApplyProvider,
    EmployeeProvider
  ]
})
export class ApplyPaySettingPageModule {}
