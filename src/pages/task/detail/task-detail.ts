import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController } from 'ionic-angular';
import { TaskProvider } from '../../../providers/task';

@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {
  type: string = "one";
  voiceMode: boolean = false; // 语音模式
  mulMode: boolean = false;   // 更多模式
  emojiMode: boolean = false; // 表情模式
  taskId: number;
  task: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    private taskSrv: TaskProvider,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController) {
    this.taskId = this.navParams.get("id");
    platform.ready().then(() => {
      this.taskSrv.show(this.taskId).subscribe((item) => {
        this.task = item;
      });
    });
  }

  ionViewDidLoad() {

  }

  handleGoback() {
    this.navCtrl.pop();
  }

  handleMoreMenu() {
    this.actionSheetCtrl.create({
      buttons: [{
        text: "收到",
        handler: () => {
          this.changeStatus(2);
        }
      }, {
        text: "开办",
        handler: () => {
          this.changeStatus(3);
        }
      }, {
        text: "申请延期",
        handler: () => {
          this.changeStatus(4);
        }
      }, {
        text: "完成",
        handler: () => {
          this.changeStatus(5);
        }
      }]
    }).present();
  }
 
  changeStatus(status:number){
    this.taskSrv.setStatus(this.taskId, status).subscribe(v => {
      if (v) {
        let toast = this.toastCtrl.create({
          message: "操作成功",
          duration: 1500
        });
        toast.present();
      }
    }, (err) => {
      console.error(err);
    });
  }

  getDesc(descs: Array<any>): string {
    if (descs && descs.length > 0) {
      let items = descs.filter((desc) => desc.type == 0);
      let arr = [];
      items.forEach((i) => {
        if (i.content)
          arr.push(i.content);
      });
      return arr.join(';');
    }
    return "";
  }

  getInvolves(involves: Array<any>, isCharge: number) {
    let items = involves.filter((involve) => involve.isCharge == isCharge);
    let arr = [];
    items.forEach((i) => {
      if (i.staffName)
        arr.push(i.staffName[0].name);
    });
    return arr.join(';');
  }
}
