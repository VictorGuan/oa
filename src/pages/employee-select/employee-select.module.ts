import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeSelectPage } from './employee-select';

import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    EmployeeSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeSelectPage),ComponentsModule
  ],
})
export class EmployeeSelectPageModule {}
