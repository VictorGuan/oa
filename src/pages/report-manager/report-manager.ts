import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController,Platform} from 'ionic-angular';

import { ReportProvider } from '../../providers/report/report';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';
import { Report } from '../../models/report';

/**
 * Generated class for the ReportManagerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-manager',
  templateUrl: 'report-manager.html',
})
export class ReportManagerPage {

  report: Array<Report> =[];
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public loadingCtrl:LoadingController
              ,public alertCtrl:AlertController
              ,public _reportProvider : ReportProvider
              ,public eventHandler : EventHandlerProvider 
              ,public platform: Platform,
            ) {
              this._reportProvider =_reportProvider;
              this.eventHandler = eventHandler;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportManagerPage');
    
    this.platform.ready().then(() => {
      this.getAllReports();
    });
  }

  handleGoback () {
    this.navCtrl.pop();
  }
  handleAdd(){
    this.alertCtrl.create({
      title:"添加",
      inputs:[{
        name:"name",
        placeholder:"名称",
      },{
        name:"period_type",
        placeholder:"类型",
      },{
        name:"period_value",
        placeholder:"提交周期",
      },{
        name:"icon_name",
        placeholder:"图标名称",
      },{
        name:"input_template",
        placeholder:"模板名",
      },{
        name:"show_template",
        placeholder:"显示模板名",
      },{
        name:"amount",
        placeholder:"罚款金额",
      }],
      buttons:[{
        text:"取消",
        handler: (data) => {

        }
      },{
        text:"确定",
        handler: (data) => {
          this.addReportType(data);
        }
      }]
    }).present();
  }
  
  handleEdit(item:any){
    if(item){
    this.alertCtrl.create({
      title:"修改",
      inputs:[{
        name:"name",
        placeholder:"名称",
        value:item.name
      },{
        name:"period_type",
        placeholder:"类型",
        value:item.period_type
      },{
        name:"period_value",
        placeholder:"提交周期",
        value:item.period_value
      },{
        name:"icon_name",
        placeholder:"图标名称",
        value:item.icon_name
      },{
        name:"input_template",
        placeholder:"模板名",
        value:item.input_template
      },{
        name:"show_template",
        placeholder:"显示模板名",
        value:item.show_template
      },{
        name:"amount",
        placeholder:"罚款金额",
        value:item.amount
      }],
      buttons:[{
        text:"取消",
        handler: (data) => {

        }
      },{
        text:"确定",
        handler: (data) => {
          let id = item.id;
          this.editReportType(data,id);
        }
      }]
    }).present();
   }
  }

  getAllReports(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
      });
      loader.present().then(() => {this._reportProvider.getAllReports().subscribe(
        data => {          
          this.report= data;
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

  addReportType(viewParam:any){
    this._reportProvider.addReportType(viewParam).subscribe(
      data => {
        this.eventHandler.successHandle(data);
      },
      (error) => {
        this.eventHandler.errorHandle(error);
      },
      () =>{
        this.handleData();
      }
    )
  }

  editReportType(viewParam:any,id:number){
    this._reportProvider.editReportType(viewParam,id).subscribe(
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
    this.getAllReports();
  }

}
