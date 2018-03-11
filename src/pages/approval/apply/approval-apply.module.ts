import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../../pipes/local.module';
import { ApplyProvider } from '../../../providers/apply';
import { ApprovalApplyPage } from './approval-apply';
import { ComponentsModule } from '../../../components/components.module';
  

@NgModule({
  declarations: [
    ApprovalApplyPage 
  ],
  imports: [
    IonicPageModule.forChild(ApprovalApplyPage),
    PipesModule,
    ComponentsModule
  ],
  providers:[
    ApplyProvider 
  ]
})
export class ApprovalApplyPageModule {}
