import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'; 
import { TaskProvider } from '../../../providers/task';
import { TaskDoPage } from './task-do';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';

@NgModule({
  declarations: [
    TaskDoPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskDoPage),
  ],
  providers:[File,TaskProvider,ImagePicker]
})
export class TaskOperatePageModule {}
