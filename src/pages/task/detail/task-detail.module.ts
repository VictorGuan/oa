 
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskDetailPage } from './task-detail';
import { TaskProvider } from '../../../providers/task';
import { PipesModule } from '../../../pipes/local.module';
  
@NgModule({
  declarations: [
    TaskDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskDetailPage),
    PipesModule,
  ],
  providers:[TaskProvider]
})
export class TaskDetailPageModule {}
