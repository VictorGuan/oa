import { Location } from './../../models/location';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ItemSliding, Platform } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location';
/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  last: any = {
    province: 0,//省份
    city: 0,//市
    area: 0,//区
    street: 0//街道
  };
  current: any = {
    province: 0,//省份
    city: 0,//市
    area: 0,//区
    street: 0//街道
  };
  currentItems: Array<Location> = [];
  allProvinces: Array<Location> = [];
  allCitys: Array<Location> = [];
  allAreas: Array<Location> = [];
  allStreets: Array<Location> = [];
  p: string;
  c: string;
  a: string;
  s: string;
  constructor(public platform: Platform,
    public navCtrl: NavController,
    public locations: LocationProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.bindProvinces();
    });
  }

  handleGoback() {
    this.navCtrl.pop();
  }

  bindProvinces() {
    this.allProvinces = [];
    this.currentItems = [];
    this.locations.query().subscribe((items) => {
      items.forEach((item) => {
        this.allProvinces.push(item);
        this.currentItems.push(item);
      });

      this.allCitys = [];
      this.allAreas = [];
      this.allStreets = [];

      this.current = {
        province: 0,
        city: 0,
        area: 0,
        street: 0
      };

      this.last = {
        province: 0,
        city: 0,
        area: 0,
        street: 0
      };

    });
  }

  bindCitys() {
    if (this.last.province != this.current.province) {
      if (this.current.province == 0) {
        this.current.city = 0;
        this.current.area = 0;
        this.current.street = 0;

        this.currentItems = [];

        this.allCitys = [];
        this.allAreas = [];
        this.allStreets = [];

        this.last.city = 0;
        this.last.area = 0;
        this.last.street = 0;

      } else {
        this.currentItems = [];
        this.allCitys = [];
        this.locations.query(this.current.province).subscribe((items) => {
          items.forEach((item) => {
            this.allCitys.push(item);
            this.currentItems.push(item);
          });

          this.current.city = 0;
          this.current.area = 0;
          this.current.street = 0;

          this.allAreas = [];
          this.allStreets = [];

          this.last.city = 0;
          this.last.area = 0;
          this.last.street = 0;
        });
      }
      this.last.province = this.current.province;
    }
  }

  bindAreas() {
    if (this.last.city != this.current.city) {
      if (this.current.city == 0) {

        this.current.area = 0;
        this.current.street = 0;

        this.allStreets = [];

        this.last.area = 0;
        this.last.street = 0;

      } else {
        this.allAreas = [];
        this.currentItems = [];
        this.locations.query(this.current.city).subscribe((items) => {
          items.forEach((item) => {
            this.allAreas.push(item);
            this.currentItems.push(item);
          });

          this.current.area = 0;
          this.current.street = 0;

          this.allStreets = [];

          this.last.area = 0;
          this.last.street = 0;

        });
      }
      this.last.city = this.current.city;
    }
  }

  bindStreets() {
    if (this.last.area != this.current.area) {
      if (this.current.area == 0) {
        this.current.street = 0;
        this.last.street = 0;

      } else {
        this.allStreets = [];
        this.currentItems = [];
        this.locations.query(this.current.area).subscribe((items) => {
          items.forEach((item) => {
            this.allStreets.push(item);
            this.currentItems.push(item);
          });

        });
        this.last.area = this.current.area;
      }
    }
  }

  bindItems(pid: number, type: number) {
    this.currentItems = [];
    this.locations.query(pid).subscribe((items) => {
      items.forEach((item) => {
        this.currentItems.push(item);
      });

      switch (type) {
        case 0:
          this.allProvinces = this.currentItems;
          break;
        case 1:
          this.allCitys = this.currentItems;
          break;
        case 2:
          this.allAreas = this.currentItems;
          break;
        case 3:
          this.allStreets = this.currentItems;
          break;
        default:
          break;
      }
    });
  }

  addItem() {
    let pid = 0;
    let type = 0;
    if (this.current.province == 0) {
    }
    else if (this.current.city == 0) {
      pid = this.current.province;
      type = 1;
    } else if (this.current.area == 0) {
      pid = this.current.city;
      type = 2;
    } else if (this.current.street == 0) {
      pid = this.current.area;
      type = 3;
    } else {
      pid = this.current.street;
      type = 4;
    }
    let arr = [];
    arr.push(this.p);
    arr.push(this.c);
    arr.push(this.a);

    let opts = {
      subTitle: arr.join(''),
      inputs: [{ name: 'name', placeholder: "名称" }], buttons: [{
        text: "取消", handler: data => { }
      }, {
        text: "确定", handler: data => {
          let createItem = {
            name: data.name,
            type: type,
            pid: pid
          };

          this.locations.add(createItem).subscribe(res => {
            if (res) {
              let toast = this.toastCtrl.create({
                message: '添加成功',
                duration: 3000
              });
              toast.present().then((value) => {
                this.bindItems(pid, type);
              });
            }
          });
        }
      }]
    };
    if (this.s)
      Object.assign(opts, { message: this.s });

    let prompt = this.alertCtrl.create(opts);
    prompt.present({
      keyboardClose: false
    });
  }

  saveItem(slidItem: ItemSliding, item: Location) {
    let prompt = this.alertCtrl.create({
      title: "修改名称",
      inputs: [{ name: 'name', placeholder: "名称" }, { name: 'shortname', placeholder: "缩写" }], buttons: [{
        text: "取消", handler: data => {

        }
      }, {
        text: "确定", handler: data => {
          item.name = data.name;
          this.locations.save(item).subscribe(res => {
            if (res) {
              let toast = this.toastCtrl.create({
                message: '修改成功',
                duration: 3000
              });
              toast.present().then((value) => {
                this.bindItems(item.pid, item.type);
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
  deleteItem(slidItem: ItemSliding, item: Location) {

    let prompt = this.alertCtrl.create({
      title: "确认需要删除当前资料吗？",
      buttons: [{
        text: "取消", handler: data => {

        }
      }, {
        text: "确定", handler: data => {

          this.locations.delete(item).subscribe(res => {
            if (res) {
              let alert = this.alertCtrl.create({
                title: "提示",
                subTitle: "删除成功",
                buttons: ['确定']
              });
              alert.present().then((value) => {
                this.bindItems(item.pid, item.type);
              });
            }
          });
        }
      }]
    });
    prompt.present();
    slidItem.close();
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Location) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }


  change(kind, text) {
    switch (kind) {
      case 1:
        this.bindCitys();
        this.p = text;
        break;
      case 2:
        this.bindAreas();
        this.c = text;
        break;
      case 3:
        this.bindStreets();
        this.a = text;
        break;
      case 4:
        this.bindItems(this.current.street, 5);
        this.s = text;
        break;
      default:
        break;
    }
  }
}
