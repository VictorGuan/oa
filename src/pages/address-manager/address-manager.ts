import { Component } from '@angular/core';
import { IonicPage, AlertController, NavParams , ItemSliding} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-address-manager',
  templateUrl: 'address-manager.html'
})
export class AddressManagerPage {
  data:Array<any>;
  citys:Array<any>; // 某个省份下的城市数据
  areas:Array<any>; // 某个城市下的辖区数据
  streets :Array<any>;// 某个辖区下的街道数据
  addressList:any;

  province:string;
  constructor(public alertCtrl: AlertController, public navParams: NavParams) {
    this.addressList = [
      {id:1,address:'安徽省合肥市瑶海区蜀山开发区'},
      {id:2,address:'北京市北京市朝阳区三里屯街道办事处'}
    ]
    this.data = [
      {
        name:"AAA",
        children:[
          {
            name:"aaa",
            children:[
              {
                name:"a",
                children:[
                  {name:"1"}
                ]
              }
            ]
          }
        ]
      },
      {
        name:"BBB",
        children:[
          {
            name:"bbb",
            children:[
              {
                name:"b",
                children:[
                  {name:"2"}
                ]
              }
            ]
          }
        ]
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressManagerPage');
  }
  handleProvinceChange () {
    
  }
  handleCityChange (item) {
    
  }
  handleAreaChange (item) {
    
  }
  handleStreetChange (item) {

  }

  // 添加省
  handleAdd () {
    this.alertCtrl.create({
      title: '添加省',
      inputs: [{
          name: 'name',
          placeholder: '名称'
        },
        {
          name: 'shortName',
          placeholder: '缩写'
      }],
      buttons: [
        {
          text: '取消',
          handler: data => {

          }
        },
        {
          text: '确定',
          handler: data => {

          }
        }
      ]
    }).present();
  }
  // 保存
  handleSave() {

  }
  // 编辑
  handleEdit (slidItem:ItemSliding) {
    this.alertCtrl.create({
      title:"修改地址",
      inputs:[{
        name:"address",
        value:"111"
      }],
      buttons:[
        {
          text:"取消",
          handler: data => {
            slidItem.close();
          }
        },
        {
          text:"确定",
          handler: data => {
            slidItem.close();
          }
        }
      ]
    }).present();
  }
  // 删除
  handleDel (slidItem:ItemSliding) {
    slidItem.close();
  }

}
