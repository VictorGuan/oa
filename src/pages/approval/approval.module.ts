import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApprovalPage } from './approval';
import { ApplyProvider } from '../../providers/apply';
import { PipesModule } from '../../pipes/local.module';
import { ComponentsModule } from '../../components/components.module';
 

@NgModule({
  declarations: [
    ApprovalPage 
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ApprovalPage),
    PipesModule
  ],
  providers:[
    ApplyProvider 
  ]
})
export class ApprovalPageModule {}
