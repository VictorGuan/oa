import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPositionPage } from './select-position';
import { EmployeeProvider } from '../../providers/employee';

@NgModule({
  declarations: [
    SelectPositionPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPositionPage),
  ] ,
  providers:[
    EmployeeProvider
  ]
})
export class SelectPositionPageModule {}
