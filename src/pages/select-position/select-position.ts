import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, AlertController } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee';

/**
 * Generated class for the SelectPositionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-position',
  templateUrl: 'select-position.html',
})
export class SelectPositionPage {

  businessId: number;
  arrBusiness: Array<any> = [];

  shopId: number;
  arrShop: Array<any> = [];

  deptId: number;
  arrDept: Array<any> = [];

  positions: Array<any> = [];
  currentPositionId: number;

  constructor(public viewCtrl: ViewController,
    private platform: Platform,
    private employeeSrv: EmployeeProvider,
    private alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.bindBusiness();
    });
  }

  bindBusiness() {
    this.employeeSrv.getBusiness().subscribe((items) => {
      items.forEach(element => {
        this.arrBusiness.push(element);
      });
    });
  }


  change(kind) {
    switch (kind) {
      case 1:
        {
          this.arrShop = [];
          this.employeeSrv.getShops(this.businessId).subscribe((items) => {
            items.forEach(element => {
              this.arrShop.push(element);
            });
          });
        }
        break;
      case 2:
        {
          this.arrDept = [];
          this.employeeSrv.getDepartments(this.shopId).subscribe((items) => {
            items.forEach(element => {
              this.arrDept.push(element);
            });
          });
        }
        break;
      case 3:
        {
          this.positions = [];
          this.employeeSrv.getPositions(this.deptId).subscribe((items) => {
            items.forEach(element => {
              this.positions.push(element);
            });
          });
        }
        break;
      default:
        break;
    }
  }

  selPosition() {
    if (this.currentPositionId) {
      let p = this.positions.find(p => p.id == this.currentPositionId);
      this.viewCtrl.dismiss({
        id: this.currentPositionId,
        name: p ? p.name : ""
      });
    } else {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '尚未选择岗位信息'
      });
      alert.present();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
