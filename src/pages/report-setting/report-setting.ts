import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController,Platform} from 'ionic-angular';

import { ReportProvider } from '../../providers/report/report';
import {BusinessServiceProvider} from '../../providers/business-service/business-service'; 
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';
import {Position} from '../../models/position';
/**
 * Generated class for the ReportSettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-setting',
  templateUrl: 'report-setting.html',
})
export class ReportSettingPage {

  positions: Array<Position>=[];
  position:string ='';
  treeData:Array<any>;
  isShowTree:boolean =false;
  reportTypes:Array<any>;
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public loadingCtrl:LoadingController
              ,public alertCtrl:AlertController
              ,public _reportProvider : ReportProvider
              ,private _businessService:BusinessServiceProvider 
              ,public eventHandler : EventHandlerProvider 
            ) {
              this._businessService = _businessService;  
              this._reportProvider = _reportProvider
              this.eventHandler = eventHandler;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportSettingPage');
    this.getPositionsList();
    //this.getPositionReportType(5);
  }

  handleGoback () {
    this.navCtrl.pop();
  }

  handleSave(event:any){
    if(this.reportTypes && this.position != ''){
      let id = Number(this.position);
      let param = [];
      for(let i=0;i<this.reportTypes.length;i++){
        param.push({id:this.reportTypes[i]['id'],
                    set:this.reportTypes[i]['set']
      });
      }
      this.setReporttoPositon(param,id);
    }
  }
  
  checkPositon(event:any):void{
    let positionId ;
    positionId = this.position;
    this.getPositionReportType(positionId);
  }

  getPositionReportType(id:number){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
      });
      loader.present().then(() => {this._reportProvider.getPositionReportType(id).subscribe(
        data => {          
          this.reportTypes = data;
          loader.dismiss();
        },
        (error) => {
          this.eventHandler.errorHandle(error);
        },
        () =>{
        }
      )}
      ) 
  }
  
  setReporttoPositon(viewParam:any,id:number){
    this._reportProvider.setReporttoPositon(viewParam,id).subscribe(
      data => {
        this.eventHandler.successHandle(data);
      },
      (error) => {
        this.eventHandler.errorHandle(error);
      },
      () =>{
        this.navCtrl.pop();
      }
    )
  }

  getPositionsList():void{
    this._businessService.getPositionsList().subscribe(
      data => {
        if(data){
          //this.treeData = this.formatTreeData(data);
          this.treeData= data;
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

  formatTreeData(data:any):any{
       data[0]['children']=data[0]['shops'];
       delete data[0]['shops'];
       return data;
  }

  handleData():void{
    //temp function;
    if(this.treeData){
      this.positions =  this.treeData[0]['shops'][0]['departments'][0]['positions'];
    }
  }

  //showSet(set:number):boolean{
    //return set == 1 ? true:false;
  //}

    showTree(event:any):void{
      this.isShowTree = !this.isShowTree;
    }

    // 响应节点被选择
    handleSelect (item) {
      this.resetTree(this.treeData);
      item.isSelected = true ;
      this.handleNodeSelect(item);
    }
    
    // 重置勾选状态
    resetTree (list) {
      list.forEach( item => {
          item.isSelected = false ;
          if(item.children) this.resetTree(item.children);
      })
    }
  
     // 节点被选择的回调 
     handleNodeSelect (item) {
  
    }
}
