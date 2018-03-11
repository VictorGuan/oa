import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController} from 'ionic-angular';
import { SchedulingProvider } from '../../providers/scheduling/scheduling';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';

/**
 * Generated class for the PostOperatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-operate',
  templateUrl: 'post-operate.html',
})
export class PostOperatePage {
  menu:any;
  status:number;
  treeData:any;
  isShowTree:boolean;
  selectDate:string;
  selectedObj:any;
  paramOfDate :any ={};
  
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              , public menuCtrl:MenuController
              ,private _businessService:BusinessServiceProvider  
              ,public eventHandler : EventHandlerProvider   
              ,public _schedulingProvider :SchedulingProvider 
            ) {
              this._schedulingProvider =_schedulingProvider;
              this._businessService = _businessService;  
              this.eventHandler = eventHandler;
              this.menu = menuCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostOperatePage');
    //this.showPositionListwithStatus(param);
    //this.getPositionsList();
  }

  reset():void{
    this.status = 9999;
    this.selectDate ="1900-01-01";
    this.paramOfDate ={};
  }

  search(event:any):void{
    if(this.selectDate){
      let viewParam = this.handleSelectDate(this.selectDate);
      this.showPositionListwithStatus(viewParam);
    }
  }
  
   handleSelectDate(selecteDate:string):any{
    let param ={};
    let month = new Date(selecteDate).getMonth() + 1;
    let year  = new Date(selecteDate).getFullYear();
    param ={
      "year":year,
      "month":month
    }
    this.paramOfDate =param;
    return param;
   }
    // 返回
    handleGoback () {
      this.navCtrl.pop();
    }
    
    showPositionListwithStatus(viewParam:any){
      this._schedulingProvider.showPositionListwithStatus(viewParam).subscribe(
        data => {
         if(data){
           this.treeData = data;
         }
        },
        (error) => {
          this.eventHandler.errorHandle(error);
        },
        () =>{
          this.handleData();
          this.menu.close();
        }
      )
    }

    getPositionsList():void{
      this._businessService.getPositionsList().subscribe(
        data => {
          if(data){
            this.treeData = data;
          }
        },
        (error) => {
          this.eventHandler.errorHandle(error);
        },
        () =>{
          this.handleData();
        }
      )
  }

  routerPositonSetting(item:any):void{
    let routerParam={
      "Date":this.paramOfDate,
      "item":item
    }
    this.navCtrl.push('PostShiftSettingPage',{item:routerParam});
  }
      // 响应节点被选择
  handleSelect (item) {
    this.resetR(this.treeData);
    item.isSelected = true ;
    this.handleNodeSelect(item);
  }
  
  // 重置勾选状态
  resetR (list) {
    list.forEach( item => {
        item.isSelected = false ;
        if(item.children) this.resetR(item.children);
    })
  }

   // 节点被选择的回调 
   handleNodeSelect (item) {
    this.selectedObj =item;
    if(item.shift_status == 0){
      this.isShowTree =false;
      this.routerPositonSetting(item);
    }
  }


  handleData():void{ 
   this.isShowTree =true;
   if(this.treeData){
    this.replaceShopsToChildren("shops",this.treeData);
    this.replaceDepartmentsToChildren("departments",this.treeData);
    this.replacePositionsToChildren("positions",this.treeData);
    //this.replaceStaffsToChildren("staff",this.treeData);
   }
  }

  replaceShopsToChildren(field:string,data:any):void{
    for(let i=0;i<data.length;i++){
        data[i]['children'] = data[i][field];
        delete data[i][field];
    }
  }

  replaceDepartmentsToChildren(field:string,data:any):void{
    for(let l=0;l<data.length;l++){
      for(let i=0;i<data[l]['children'].length;i++){
        data[l]['children'][i]['children'] =data[l]['children'][i][field];
        delete data[l]['children'][i][field];
      }
    }
  }


  replacePositionsToChildren(field:string,data:any):void{
    for(let p=0;p<data.length;p++){
      for(let l=0;l<data[p]['children'].length;l++){
        for(let i=0;i<data[p]['children'][l]['children'].length;i++){
          data[p]['children'][l]['children'][i]['children'] = data[p]['children'][l]['children'][i][field];
          delete data[p]['children'][l]['children'][i][field];
          break;
        }
      }
    }
  }

  replaceStaffsToChildren(field:string,data:any):void{
    for(let s=0;s<data.length;s++){
      for(let p=0;p<data[s]['children'].length;p++){
        for(let l=0;l<data[s]['children'][p]['children'].length;l++){
          for(let i=0;i<data[s]['children'][p]['children'][l]['children'].length;i++){
            data[s]['children'][p]['children'][l]['children'][i]['children'] =data[s]['children'][p]['children'][l]['children'][i][field];
            delete data[s]['children'][p]['children'][l]['children'][i][field];
          }
        }
      }
    }
  }
}
