import { NgModule } from '@angular/core';
import { FlowstatusComponent } from './flowstatus/flowstatus';
import { TreeComponent } from './tree/tree';

import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [FlowstatusComponent,
    TreeComponent],
	imports: [IonicModule],
	exports: [FlowstatusComponent,
    TreeComponent]

})
export class ComponentsModule {}
