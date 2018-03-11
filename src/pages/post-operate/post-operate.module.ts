import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostOperatePage } from './post-operate';

import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    PostOperatePage,
  ],
  imports: [
    IonicPageModule.forChild(PostOperatePage),ComponentsModule
  ],
})
export class PostOperatePageModule {}
