import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewController , AlertController} from 'ionic-angular';
import { Events } from 'ionic-angular';

import {BusinessServiceProvider} from '../../providers/business-service/business-service';

/**
 * Generated class for the DeptCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dept-create',
  templateUrl: 'dept-create.html',
})
export class DeptCreatePage {

  shop:string ='';
  selectedManager:string ='';
  deptName:string ='';
  depts : any;
  managerList : Array<number> =[];
  selectedShop :any;
  selectedShopName :string;
  initManagerList = [-1,1,2,3,4,5,6,7];
  
  constructor (public viewCtrl : ViewController,
              public navParams: NavParams , 
              public alertCtrl : AlertController
              ,private _businessService:BusinessServiceProvider 
              ,public navCtrl: NavController
              ,public events : Events         
            ) {
              this.depts =this.navParams.get('depts');
              this.selectedShop = this.navParams.get('selectedShop');
              this._businessService = _businessService;
              if(this.depts){
                this.managerList =[];
                this.depts.forEach(element => {
                  this.managerList.push(element.manager);
                });
              }
              //set init manager list 
              if(this.managerList.length ==0 ){
                this.managerList =this.initManagerList;
              }
              this.shop = this.selectedShop.name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeptCreatePage');
  }

  // 输入部门名称
  handleInputDeptName () {
      this.alertCtrl.create({
          title:"输入部门名称",
          inputs:[{
              name:"deptName",
              placeholder:"输入部门名称"
          }],
          buttons:[{
              text:"取消",
              handler:data => {

              }
          },{
              text:"确定",
              handler:data => {
                  this.deptName = data.deptName;
              }
          }]
      }).present();
  }

  // 选择部门负责人
  handleSelectManager(){}

  // 关闭modal
  dismiss () {
      this.viewCtrl.dismiss();
  }

  // 创建
  handleCreate(event){
    let id = this.selectedShop.id;
    let viewParam ={
        "name":this.deptName,
        "manager":this.selectedManager
    };
    this._businessService.addDept(viewParam,id).subscribe(
        data => {
          let successAlert =this.alertCtrl.create({
            subTitle: viewParam.name + data.message
          });
          successAlert.present();
        setTimeout(() => {
          successAlert.dismiss();
        }, 3000);
        },
        (error) => {
          let errorAlert =this.alertCtrl.create({
              title:'Error with'+ error.status
            });
          errorAlert.present();
          setTimeout(() => {
            errorAlert.dismiss();
          }, 1000);
        },
        () =>{
          this.navCtrl.pop();
          this.events.publish('deptEventHandler');
        }
      )  
  }

}
