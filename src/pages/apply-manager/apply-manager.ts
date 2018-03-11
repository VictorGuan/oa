import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, AlertController } from 'ionic-angular';
import { ModalController, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location';
import { ApplyProvider } from '../../providers/apply';

@IonicPage()
@Component({
  selector: 'page-apply-manager',
  templateUrl: 'apply-manager.html',
})
export class ApplyManagerPage {
  last: any = {
    level1: 0,//分类1
    level2: 0,//分类2
    level3: 0 //分类3
  };
  current: any = {
    level1: 0,//分类1
    level2: 0,//分类2
    level3: 0 //分类3
  };
  currentItems: Array<any> = [];

  allLevel3: Array<any> = [];
  allLevel1: Array<any> = [];
  allLevel2: Array<any> = [];

  searchWord: string;//搜索关键字
  a: string;
  b: string;
  c: string;
  constructor(public platform: Platform,
    public navCtrl: NavController,
    public applyTypesSrv: ApplyProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.bindLevel1();
    });
  }

  handleGoBack() {
    this.navCtrl.pop();
  }

  bindLevel1() {
    this.allLevel1 = [];
    this.currentItems = [];
    this.applyTypesSrv.query().subscribe((items) => {
      items.forEach((item) => {
        this.allLevel1.push(item);
        this.currentItems.push(item);
      });

      this.allLevel2 = [];
      this.allLevel3 = [];

      this.current = {
        level1: 0,
        level2: 0,
        level3: 0
      };

      this.last = {
        level1: 0,
        level2: 0,
        level3: 0
      };

    });
  }

  bindLevel2() {
    if (this.last.level1 != this.current.level1) {
      if (this.current.level1 == 0) {
        this.current.level2 = 0;
        this.current.level3 = 0;

        this.currentItems = [];

        this.allLevel2 = [];
        this.allLevel3 = [];

        this.last.level2 = 0;
        this.last.level3 = 0;
      } else {
        this.currentItems = [];
        this.allLevel2 = [];
        this.applyTypesSrv.query(this.current.level1).subscribe((items) => {
          items.forEach((item) => {
            this.allLevel2.push(item);
            this.currentItems.push(item);
          });

          this.current.level2 = 0;
          this.current.level3 = 0;

          this.allLevel3 = [];

          this.last.level2 = 0;
          this.last.level3 = 0;
        });
      }
      this.last.level1 = this.current.level1;
    }
  }


  bindLevel3() {
    if (this.last.level2 != this.current.level2) {
      if (this.current.level2 == 0) {
        this.current.level3 = 0;
        this.last.level3 = 0;

      } else {
        this.allLevel3 = [];
        this.currentItems = [];
        this.applyTypesSrv.query(this.current.level2).subscribe((items) => {
          items.forEach((item) => {
            this.allLevel3.push(item);
            this.currentItems.push(item);
          });

        });
        this.last.level2 = this.current.level2;
      }
    }
  }

  bindItems(pid: number, level: number) {
    this.currentItems = [];
    this.applyTypesSrv.query(pid).subscribe((items) => {
      items.forEach((item) => {
        this.currentItems.push(item);
      });

      switch (level) {
        case 1:
          this.allLevel1 = this.currentItems;
          break;
        case 2:
          this.allLevel2 = this.currentItems;
          break;
        case 3:
          this.allLevel3 = this.currentItems;
          break;
        default:
          break;
      }
    });
  }

  change(level: number, text) {
    switch (level) {
      case 2:
        this.a = text;
        this.bindLevel2();
        break;
      case 3:
        this.b = text;
        this.bindLevel3();
        break;
      case 4:
        this.c = text;
        this.bindItems(this.current.level3, 4);
        break;
      default:
        break;
    }
  }

  handleSearch() {
    this.currentItems = [];
    this.applyTypesSrv.search(this.searchWord).subscribe((items) => {
      items.forEach((item) => {
        this.currentItems.push(item);
      });
      this.searchWord = "";
    });
  }

  handleAdd() {
    
    let pid = 0;
    let level = 1;
    let inputs = [{ name: 'name', placeholder: "名称" }];
    if (this.current.level1 == 0) {

    }
    else if (this.current.level2 == 0) {
      pid = this.current.level1;
      level = 2;
    } else if (this.current.level3 == 0) {
      pid = this.current.level2;
      level = 3;
    } else {
      pid = this.current.level3;
      level = 4;
      inputs = [{ name: 'name', placeholder: "名称" }, { name: 'input_page_name', placeholder: "输入模版名" }, { name: 'show_page_name', placeholder: "显示模版名" }];
    }
 
    let prompt = this.alertCtrl.create({
      subTitle: [this.a,this.b,this.c].join(''),
      inputs: inputs,
      buttons: [{
        text: "取消", handler: data => {
        }
      }, {
        text: "确定", handler: data => {
          let createItem: any = {
            name: data.name,
            level: level,
            pid: pid
          };

          if (level == 4) {//具体申请
            createItem = Object.assign(createItem, {
              input_page_name: data.input_page_name,
              show_page_name: data.show_page_name
            });
          }

          this.applyTypesSrv.add(createItem).subscribe(res => {
            if (res) {
              let toast = this.toastCtrl.create({
                message: '添加成功',
                duration: 3000
              });
              toast.present().then((value) => {
                this.bindItems(pid, level);
              });
            }
          });
        }
      }]
    });
    prompt.present({
      keyboardClose: false
    });
  }


  saveItem(slidItem: ItemSliding, item: any) {

    let inputs = [{ name: 'name', placeholder: "名称" }];
    if (item.level == 4) {
      inputs = [{ name: 'name', placeholder: "名称" }, { name: 'input_page_name', placeholder: "输入模版名" }, { name: 'show_page_name', placeholder: "显示模版名" }];
    }

    let prompt = this.alertCtrl.create({
      title: "修改名称",
      inputs: inputs,
      buttons: [{
        text: "取消", handler: data => {

        }
      }, {
        text: "确定", handler: data => {
          item.name = data.name;
          if (item.level == 4) {
            item.input_page_name = data.input_page_name;
            item.show_page_name = data.show_page_name;
          }
          this.applyTypesSrv.save(item).subscribe(res => {
            if (res) {
              let toast = this.toastCtrl.create({
                message: '修改成功',
                duration: 3000
              });
              toast.present().then((value) => {
                this.bindItems(item.pid, item.level);
              })
            }
          });
        }
      }]
    });
    prompt.present({
      keyboardClose: false
    });
    slidItem.close();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(slidItem: ItemSliding, item: any) {

    // let prompt = this.alertCtrl.create({
    //   title: "确认需要删除当前资料吗？",
    //   buttons: [{
    //     text: "取消", handler: data => {

    //     }
    //   }, {
    //     text: "确定", handler: data => {

    //       this.applyTypesSrv.delete(item).subscribe(res => {
    //         if (res) {
    //           let alert = this.alertCtrl.create({
    //             title: "提示",
    //             subTitle: "删除成功",
    //             buttons: ['确定']
    //           });
    //           alert.present().then((value) => {
    //             this.bindItems(item.pid, item.level);
    //           });
    //         }
    //       });
    //     }
    //   }]
    // });
    // prompt.present();
    slidItem.close();
  }

}
