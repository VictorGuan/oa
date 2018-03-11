import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController,Platform} from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';

import { EventHandlerProvider } from '../../providers/event-handler/event-handler';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  type: string ;
  userReport : Array<any>;
  fields :Array<any>;
  numberOfStatus:number;
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public loadingCtrl:LoadingController
              ,public alertCtrl:AlertController
              ,public _reportProvider : ReportProvider        
              ,public eventHandler : EventHandlerProvider   
            ) {
              this._reportProvider =_reportProvider;
              this.eventHandler = eventHandler;
              this.type ="1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
    this.getUserCreatedReprot();
  }

  changeType(event:any):void{
    this.userReport =[];
    switch(this.type){
      case "1" :
        this.getUserCreatedReprot();
      break;
      case "2" :
        this.getUserReviewedReprot();
      break;
      case "3" :
        this.getUserForwardReprot();
      break;
      default:
      break;
    }
  }

  getUserCreatedReprot(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
      });
      loader.present().then(() => {this._reportProvider.getUserCreatedReprot().subscribe(
        data => {
          this.userReport = data;          
          loader.dismiss();
        },
        (error) => {
          this.eventHandler.errorHandle(error);
        },
        () =>{
          this.handleData();
        }
      )}
      )
  }

  getUserReviewedReprot(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
      });
      loader.present().then(() => {this._reportProvider.getUserReviewedReprot().subscribe(
        data => {
          this.userReport = data;           
          loader.dismiss();
        },
        (error) => {
          this.eventHandler.errorHandle(error);
        },
        () =>{
          this.handleData();
        }
      )}
      )
  }

  getUserForwardReprot(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
      });
      loader.present().then(() => {this._reportProvider.getUserForwardReprot().subscribe(
        data => {          
          this.userReport = data; 
          loader.dismiss();
        },
        (error) => {
          this.eventHandler.errorHandle(error);
        },
        () =>{
          this.handleData();
        }
      )}
      )
  }

  editUserReportType(viewParam:any,id:number){
    this._reportProvider.editUserReportType(viewParam,id).subscribe(
      data => {
        this.eventHandler.successHandle(data);
      },
      (error) => {
        this.eventHandler.errorHandle(error);
      },
      () =>{
      }
    )
  }

  handleData():void{
    this.fields=[];
    if(this.userReport){
      for(let i=0;i<this.userReport.length;i++){
        this.fields.push(this.userReport[i]['fields']);
      }
    }
  }

  statusMapping(item:any):string{
    let status ='';
    switch(item.status){
      case "0": 
        status ="刚提交";
      break;
      case "1":
        status ="通过";
      break;
      case "2":
        status ="逾期";
      break;
      default:
      break;       
    }
    return status;
  }

  changeStatus(item:any):void{
    this.alertCtrl.create({
      title:"修改状态",
      inputs:[{
        name:"status",
        placeholder:"名称",
        value:item.status
      },],
      buttons:[{
        text:"取消",
        handler: (data) => {
        }
      },{
        text:"确定",
        handler: (data) => {
          let id = item.id; 
          let param ={
            "status":Number(data.status),
          }        
          this.editUserReportType(param,id);
        }
      }]
    }).present();
  }

}
