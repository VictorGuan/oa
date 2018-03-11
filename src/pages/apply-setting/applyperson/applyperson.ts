import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApplyProvider } from '../../../providers/apply';

/**
 * Generated class for the ApplypersonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-applyperson',
  templateUrl: 'applyperson.html',
})
export class ApplyPersonPage {

  objName: string;
  applyName: string;
  operateItems: Array<any> = [];
  copyItems: Array<any> = [];
  staffId: number;
  special: boolean = false; 
  constructor(public navCtrl: NavController,
    private platform: Platform,
    public applySrv: ApplyProvider,
    public navParams: NavParams) {
    this.staffId = this.navParams.get("staffId");
    this.objName = this.navParams.get("name");
    this.applyName = this.navParams.get("applyName");
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.applySrv.showStaffDetail(this.staffId).subscribe((res) => {
        this.operateItems = res.operateItems;
        this.copyItems = res.copyItems;
        this.special = res.special;
      });
 
    });
  }

}
