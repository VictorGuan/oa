import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ToastController } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee';

@IonicPage()
@Component({
  selector: 'page-employee-leave',
  templateUrl: 'employee-leave.html',
})
export class EmployeeLeavePage {
  stuffid:number;
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private employeeSrv: EmployeeProvider,
     public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
  }

  handleGoback () {
    this.navCtrl.pop();
  }

  handleConfirm () {
    this.employeeSrv.dimission(this.stuffid).subscribe((v) => {
      if (v) {
        let toast = this.toastCtrl.create({
          message: "员工从岗位成功离职",
          duration: 3000
        });
        toast.onDidDismiss(()=>{
          this.navCtrl.pop();
        });
        toast.present();
      }
    });
  }
}
