import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { TaskProvider } from '../../../providers/task';


@IonicPage()
@Component({
  selector: 'page-task-operate',
  templateUrl: 'task-operate.html',
})
export class TaskOperatePage {
  positionName: string = "";
  positionId: number;
  tasks: Array<any> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    platform: Platform,
    private taskSrv: TaskProvider,
    public modalCtrl: ModalController) {
    this.positionName = this.navParams.get("name");
    this.positionId = this.navParams.get("positionId"); 
    platform.ready().then(() => {
      this.taskSrv.getTasksByPosition(this.positionId).subscribe((items) => {
        items.forEach(element => {
          this.tasks.push(element);
        });
      });
    });
  }

  ionViewDidLoad() {

  }


  handleGoback() {
    this.navCtrl.pop();
  }

  handleAdd() {
    this.navCtrl.push("TaskDoPage", { positionId:this.positionId,name:this.positionName});
  }

  handleEdit(task: any) {
    this.navCtrl.push("TaskEditPage", { taskId:task.id});
  }

  getPeriodType(task: any) {
    let period = "每";
    period += task.period_value;
    switch (task.period_type) {
      case "0":
        period += "分钟";
        break;
      case "1":
        period += "小时";
        break;
      case "2":
        period += "天";
        break;
      default:
        break;
    }
    return period;
  }


}
