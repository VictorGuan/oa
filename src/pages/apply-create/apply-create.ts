import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { ApplyProvider } from '../../providers/apply';

@IonicPage()
@Component({
  selector: 'page-apply-create',
  templateUrl: 'apply-create.html',
})
export class ApplyCreatePage { data: Array<any> = [];
  allLevel1: Array<any> = [];
  allLevel2: Array<any> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public applySrv: ApplyProvider,
    public platform: Platform,
    public menuCtrl: MenuController) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
    this.applySrv.query().subscribe((items) => {
        items.forEach((item) => {
          this.allLevel1.push({
            id: item.id,
            name: item.name,
            isSelected: false
          });
        });
        if (this.allLevel1.length > 0)
          this.getLevel2(this.allLevel1[0]);
      });
    });
  }
  
  ionViewDidLeave(){
    this.menuCtrl.enable(false, "applysettingMenu");
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true, "applysettingMenu");
  }
 

  getLevel2(item: any) {
    item.isSelected = true;
    this.allLevel2 = [];
    this.applySrv.query(item.id).subscribe((items) => {
      items.forEach((item) => {
        this.allLevel2.push({
          id: item.id,
          name: item.name,
          isSelected: false
        });
      });
      if (this.allLevel2.length > 0) {
        this.getData(this.allLevel2[0]);
      }

    });
  }

  getData(item: any) {
    item.isSelected = true;
    this.data = [];
    this.applySrv.querySettings(item.id).subscribe((items) => {
      items.forEach((item) => {
        this.data.push(item);
      });
    });
  }

  handleGoBack() {
    this.navCtrl.pop();
  }

  // 显示关闭筛选菜单
  handleShowFilterMenu() {
    this.menuCtrl.toggle();
  }

  // 筛选重置
  handleReset() {
    // this.filterData.forEach(item => {
    //   item.items.forEach(obj => {
    //     obj.isSelected = false;
    //   })
    // })
  }

  // 提交筛选
  handleOk() {
    this.menuCtrl.toggle();
  }

  // 展开收缩
  handleCollapse(ionArrow, ionRow) {
    let deg = ionRow.style.display == "none" ? "0" : "180deg";
    ionRow.style.display = ionRow.style.display == "none" ? "flex" : "none";
    ionArrow.style = "transform:rotate(" + deg + ");" +
      "-webkit-transform:rotate(" + deg + ");" +
      "-moz-transform:rotate(" + deg + ");" +
      "-o-transform:rotate(" + deg + ");"
  }
}
