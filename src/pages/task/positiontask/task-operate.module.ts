import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskOperatePage } from './task-operate';
import { TaskProvider } from '../../../providers/task';
  
@NgModule({
  declarations: [
    TaskOperatePage,
  ],
  imports: [
    IonicPageModule.forChild(TaskOperatePage),
  ],
  providers:[TaskProvider]
})
export class TaskOperatePageModule {}
