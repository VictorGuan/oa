import { Component } from '@angular/core';
import { NavController, IonicPage, ActionSheetController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController 
  ) {


  }

  presentActionSheet(event) {
    let id = event.currentTarget.id;
    switch(id){
      case "business":
        let actionSheet1 = this.actionSheetCtrl.create({
          title: '请选择组织架构',
          buttons: [
            {
              text: '行业管理',
              role: 'destructive',
              handler: () => {
                this.navCtrl.push('BusinessPage');
              }
            },
            {
              text: '行政管理',
              role: 'destructive',
              handler: () => {
                this.navCtrl.push('AdministrativeManagerPage');
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
      actionSheet1.present();
      break; 
      case "punishment":
        let actionSheet2 = this.actionSheetCtrl.create({
          title: '请选择奖惩模块',
          buttons: [
            {
              text: '建立奖惩',
              role: 'destructive',
              handler: () => {
                this.navCtrl.push('PunishmentPage');
              }
            },
            {
              text: '查看分配奖惩',
              role: 'destructive',
              handler: () => {
                this.navCtrl.push('PunishmentRewardDistributionPage');
              }
            },
            {
              text: '开奖惩单',
              role: 'destructive',
              handler: () => {
                this.navCtrl.push('PunishmentRewardOpenPage');
              }
            },
            {
              text: '奖惩分配',
              role: 'destructive',
              handler: () => {
                this.navCtrl.push('PunishmentDeliverPage');
              }
            },
            {
              text: '奖惩记录',
              role: 'destructive',
              handler: () => {
                this.navCtrl.push('PunishmentRewardRecordPage');
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
      actionSheet2.present();
      break; 
      case "report":
      let actionSheet3 = this.actionSheetCtrl.create({
        title: '请选择报表模块',
        buttons: [
          {
            text: '工作汇报首页',
            role: 'destructive',
            handler: () => {
              this.navCtrl.push('ReportPage');
            }
          },
          {
            text: '管理工作报表',
            role: 'destructive',
            handler: () => {
              this.navCtrl.push('ReportManagerPage');
            }
          },
          {
            text: '设置工作报表',
            role: 'destructive',
            handler: () => {
              this.navCtrl.push('ReportSettingPage');
            }
          },
          {
            text: '提交工作报表',
            role: 'destructive',
            handler: () => {
              this.navCtrl.push('ReportCreatePage');
            }
          },
          {
            text: '工作报表统计',
            role: 'destructive',
            handler: () => {
              this.navCtrl.push('ReportStatisticsPage');
            }
          },
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
    actionSheet3.present();
    break; 
    case "schedule":
    let actionSheet4 = this.actionSheetCtrl.create({
      title: '请选择排班模块',
      buttons: [
        {
          text: '岗位班次设定',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push('PostOperatePage');
          }
        },
        {
          text: '员工排班设置',
          role: 'destructive',
          handler: () => {
            this.navCtrl.push('EmployeeSelectPage');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
  actionSheet4.present();
  break;
  case "attendance":
  let actionSheet5 = this.actionSheetCtrl.create({
    title: '请选择考勤模块',
    buttons: [
      {
        text: '考勤奖罚设置',
        role: 'destructive',
        handler: () => {
          this.navCtrl.push('AttendanceSettingPage');
        }
      },
      {
        text: '考勤打卡',
        role: 'destructive',
        handler: () => {
          this.navCtrl.push('PunchClockPage');
        }
      },
      {
        text: '考勤核对',
        role: 'destructive',
        handler: () => {
          this.navCtrl.push('AttendanceCheckPage');
        }
      },
      {
        text: '查看本人考勤',
        role: 'destructive',
        handler: () => {
          this.navCtrl.push('AttendanceCheckDetailPage',{"view":"personal"});
        }
      },
      {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet5.present();
  break;
  default:
  break;
    }

    
  }

  showActionSheet(event) {

    let buttons = [];
    switch (event.currentTarget.id) {
      case "apply": {
        buttons.push({
          text: "申请类别管理",
          handler: () => {
            this.navCtrl.push('ApplyManagerPage');
          }
        });
        buttons.push({
          text: "申请流程设置",
          handler: () => {
            this.navCtrl.push('ApplySettingPage');
          }
        });

        buttons.push({
          text: "付费申请流程设置",
          handler: () => {
            this.navCtrl.push('ApplyPaySettingPage');
          }
        });

        buttons.push({
          text: "提交申请流程",
          handler: () => {
            this.navCtrl.push('ApplyCreatePage');
          }
        });

        buttons.push({
          text: "申请首页",
          handler: () => {
            this.navCtrl.push('ApprovalPage');
          }
        });

        break;
      }
      case "other": {
        buttons.push({
          text: "地址管理",
          handler: () => {
            this.navCtrl.push('LocationPage');
          }
        });

        buttons.push({
          text: "登录",
          handler: () => {
            this.navCtrl.push('LoginPage');
          }
        });

        buttons.push({
          text: "员工入职",
          handler: () => {
            this.navCtrl.push('EmployeePage');
          }
        });

        buttons.push({
          text: "员工离职",
          handler: () => {
            this.navCtrl.push('EmployeeLeavePage');
          }
        });
 

        break;
      }
      case "task":
      {

        buttons.push({
          text: "新建任务",
          handler: () => {
            this.navCtrl.push('TaskCreatePage');
          }
        });

        buttons.push({
          text: "显示任务",
          handler: () => {
            this.navCtrl.push('TaskDetailPage', { id: 28 });
          }
        });


        buttons.push({
          text: "岗位任务",
          handler: () => {
            let positionModal = this.modalCtrl.create('SelectPositionPage');
            positionModal.onDidDismiss(posi => {
              if (posi) {
                posi.id=1;//20170121 测试值
                this.navCtrl.push('TaskOperatePage', { positionId: posi.id, name: posi.name });
              }
            });
            positionModal.present();
          }
        });
      }
      default: break;
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: '请选择演示作业',
      buttons: buttons
    });
    actionSheet.present();
  }


}
