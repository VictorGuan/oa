import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApplyProvider } from '../../../providers/apply';

/**
 * Generated class for the ApplypositionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-applyposition',
  templateUrl: 'applyposition.html',
})
export class ApplyPositionPage {
  objName: string;
  applyName: string;
  operateItems: Array<any> = [];
  copyItems: Array<any> = [];
  userList: Array<any> = [];
  positionId: number;
  constructor(public navCtrl: NavController,
    private platform: Platform,
    public applySrv: ApplyProvider,
    public navParams: NavParams) {
    this.positionId = this.navParams.get("positionId");
    this.objName = this.navParams.get("name");
    this.applyName = this.navParams.get("applyName");
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.applySrv.showPositionDetail(this.positionId).subscribe((res) => {
        this.operateItems = res.operateItems;
        this.copyItems = res.copyItems;
        this.userList=res.userList;
      });
    });
  }

}
