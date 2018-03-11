import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationPage } from './location';
import { LocationProvider } from '../../providers/location';
 
 

@NgModule({
  declarations: [
    LocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationPage) 
  ] ,
  providers:[
    LocationProvider
  ]
})
export class LocationPageModule {}
