import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

import {pinyin} from '../../common/pinyin';

/**
 * Generated class for the PositionStaffAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-position-staff-add',
  templateUrl: 'position-staff-add.html',
})
export class PositionStaffAddPage {
  
  mockUpEmp : any[]; 
  ouputItem : any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PositionStaffAddPage');
    this.initializeItems();
  }

  initializeItems(){
    this.mockUpEmp = [{"id":1,"name":"李子明"},{"id":2,"name":"王欢"},{"id":3,"name":"陈琛"},{"id":4,"name":"黄日海"},{"id":5,"name":"李宁"},{"id":6,"name":"王文义"}];
    //this.mockUpEmp =['victro','Json','Frank','Michel','Vincent','abby']
  }
  
  handleGoback(event:any):void{
    this.navCtrl.pop();
  }

  addBulkEmps(event:any):void{

  }

  addSingleEmp(event:any,item:any):void{
    this.ouputItem.push(item);
    this.events.publish('staffAddEventHandler',this.ouputItem);
    this.navCtrl.pop();
  }

  search(ev:any):void{
    this.initializeItems();

    let text = ev.target.value;
    
    if(text && text.trim()!=''){
      this.mockUpEmp = this.mockUpEmp.filter((item)=>{
        return (pinyin.getCamelChars(item.name).indexOf(text.toUpperCase()) >-1);
      });
    }

  }

  checkItem(event:any):void{

  }
  
}
