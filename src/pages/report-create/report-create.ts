import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController,LoadingController,Platform} from 'ionic-angular';
import { ReportProvider } from '../../providers/report/report';
import { EventHandlerProvider } from '../../providers/event-handler/event-handler';
import { Report } from '../../models/report'; 
/**
 * Generated class for the ReportCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-create',
  templateUrl: 'report-create.html',
})
export class ReportCreatePage {

  report: Array<Report> =[];
  isSubmit : boolean ;
  plan : string ='';
  summary : string ='';
  constructor(public navCtrl: NavController
              ,public navParams: NavParams
              ,public loadingCtrl:LoadingController
              ,public alertCtrl:AlertController
              ,public _reportProvider : ReportProvider
              ,public eventHandler : EventHandlerProvider   
            ) {
              this._reportProvider =_reportProvider;
              this.eventHandler = eventHandler;
              this.isSubmit = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportCreatePage');
    this.getEnableCreateReport();
  }

  handleGoback () {
    this.navCtrl.pop();
  }

  handleSubmit():void{
    //test
    let paramView ={
      "type": 2,
      "fields": [
        {
          "key": "日报日期",
          "type": "Date",
          "value": "2017-12-12"
        },
        {
          "key": "当日工作情况",
          "type": "string",
          "value": "工作情况工作情况工作情况工作情况"
        },
        {
          "key": "当日工作问题",
          "type": "integer",
          "value": "工作问题工作问题工作问题工作问题"
        }
      ]
    }
    this.createReport(paramView);
  }

  getEnableCreateReport(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
      });
      loader.present().then(() => {this._reportProvider.getEnableCreateReport().subscribe(
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

  createReport(viewParam){
    this._reportProvider.createReport(viewParam).subscribe(
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

  handleData(){}
}
