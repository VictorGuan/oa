import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AttendancePersonalCheckDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attendance-personal-check-detail',
  templateUrl: 'attendance-personal-check-detail.html',
})
export class AttendancePersonalCheckDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendancePersonalCheckDetailPage');
  }

  handleGoback () {
    this.navCtrl.pop();
  }
}
