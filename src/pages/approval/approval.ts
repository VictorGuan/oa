import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { ApplyProvider } from '../../providers/apply';

@IonicPage()
@Component({
  selector: 'page-approval',
  templateUrl: 'approval.html',
})
export class ApprovalPage {
  isPass: boolean;
  isReject: boolean;
  isApply: boolean;
  isEnd: boolean;
  segmentValue: string;
  items: Array<any> = [];
  beginDate: any;
  endDate: any;
  from_user: string;
  approval_user: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public applySrv: ApplyProvider,
    public platform: Platform,
    public menuCtrl: MenuController) {
    this.segmentValue = "one";
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.changed();
    });
  }

  handleGoback() {
    this.navCtrl.pop();
  }

  handleSearch() {
    this.menuCtrl.toggle();
  }

  // 重置
  handleResetFilter() {

  }

  // 确定
  handleConfirmFilter() {
    let condition = {
      from_time: this.beginDate,
      to_time: this.endDate,
      from_user: this.from_user
    };
    let status = 0;
    if (this.isPass) {
      status = 1;
    }
    if (this.isReject) {
      status = 0;
    }
    if (this.isApply) {
      status = 2;
    }
    if (this.isEnd) {
      status = 1;
    }

    Object.assign(condition, {
      by_status: status
    });

    if (condition.from_time)
      condition.from_time = condition.from_time + " 0";
    else
      condition.from_time = "0000";

    if (condition.to_time)
      condition.to_time = condition.to_time + " 0";
    else
      condition.to_time = "0000";

    this.items = [];
    this.applySrv.getFlowsByCondition(condition).subscribe((items) => {
      items.forEach(element => {
        this.items.push(element);
      });
    });
  }

  changed() {
    switch (this.segmentValue) {
      case "one":
        {
          this.items = [];
          this.applySrv.getFlowsForFrom().subscribe((data) => {
            data.forEach(element => {
              element.status = 1;
              this.items.push(element);
            });

          });
        }
        break;
      case "tow":
        {
          this.items = [];
          this.applySrv.getFlowsForApprove().subscribe((data) => {
            data.forEach(element => {
              this.items.push(element);
            });

          });
        }
        break;
      case "three":
        {
          this.items = [];
          this.applySrv.getFlowsForCopy().subscribe((data) => {
            data.forEach(element => {
              this.items.push(element);
            });

          });
        }
        break;
      default:
        break;
    }
  }

  goDetail(id) {
    this.navCtrl.push("ApprovalApplyPage", {
      id: id
    });
  }
}
