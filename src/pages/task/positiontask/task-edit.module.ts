import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; 
import { TaskProvider } from '../../../providers/task';
import { TaskEditPage } from './task-edit';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
  
@NgModule({
  declarations: [
    TaskEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskEditPage),
  ],
  providers:[File,TaskProvider,ImagePicker]
})
export class TaskOperatePageModule {}
