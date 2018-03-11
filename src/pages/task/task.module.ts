import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskPage } from './task';
import { TaskProvider } from '../../providers/task';

@NgModule({
  declarations: [
    TaskPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskPage),
  ],
  providers:[TaskProvider]
})
export class TaskPageModule {}
