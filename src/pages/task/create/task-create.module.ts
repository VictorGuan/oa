import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskCreatePage } from './task-create';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { TaskProvider } from '../../../providers/task';

@NgModule({
  declarations: [
    TaskCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TaskCreatePage),
  ],
  providers:[,
    File,TaskProvider,ImagePicker]
})
export class TaskCreatePageModule {}
