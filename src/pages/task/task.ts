import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform, ModalController } from 'ionic-angular';
import { TaskProvider } from '../../providers/task';

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  way: string = "one";
  type: number;
  menu: any;
  tasks: Array<any> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private taskSrv: TaskProvider,
    private platform: Platform, 
    public menuCtrl: MenuController) {
    this.menu = menuCtrl;
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.changed();
    });
 }
 
 
  changed() {
    switch (this.way) {
      case "one":
        {
          this.tasks = [];
          this.taskSrv.getTasksBySelf().subscribe((items) => {
            items.forEach(element => {
              this.tasks.push(element);
            });
          });
        }
        break;
      case "tow":
        {
          this.tasks = [];
          this.taskSrv.getTasksByDispatch().subscribe((items) => {
            items.forEach(element => {
              this.tasks.push(element);
            });
          });
        }
        break;
      case "three":
        {
          this.tasks = [];
          this.taskSrv.getTasksByInvolve().subscribe((items) => {
            items.forEach(element => {
              this.tasks.push(element);
            });
          });
        }
        break;
      default:
        break;
    }
  }

  getStatus(status: number) {
    return this.taskSrv.getStatus(status);
  }
}
