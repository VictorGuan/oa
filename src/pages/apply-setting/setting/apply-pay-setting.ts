import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ActionSheetController, ModalController, Platform } from 'ionic-angular';
import { ApplyProvider } from '../../../providers/apply';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EmployeeProvider } from '../../../providers/employee';

// import {ApplyBuyerPage} from './apply-buyer';
// import {ApplyPersonalPage} from './apply-personal';

@IonicPage()
@Component({
  selector: 'page-apply-pay-setting',
  templateUrl: 'apply-pay-setting.html',
})
export class ApplyPaySettingPage {
  showFilter: boolean;
  data: Array<any>;
  operateText: string;
  filterTab: string;
  ruleTab: string;
  procedure: string;
  id: number;
  levels: Array<any> = [
    {
      name: "集团层",
      id: "7"
    },
    {
      name: "集团副总",
      id: "6"
    }
    ,
    {
      name: "集团行业副总",
      id: "5"
    }
    ,
    {
      name: "行业区域副总",
      id: "4"
    }
    ,
    {
      name: "店长总经理",
      id: "3"
    }
    ,
    {
      name: "副总经理",
      id: "2"
    }
    ,
    {
      name: "部门主管",
      id: "1"
    }
    ,
    {
      name: "员工",
      id: "0"
    }
    ,
    {
      name: "无",
      id: "-1"
    }
  ];
  isUp: boolean = true;
  name: string;
  currentFlowId: number;
  apply_exe_level_up_limit: string;
  apply_exe_level_up_limit_text: string;
  apply_exe_level_low_limit: string;
  apply_exe_level_low_limit_text: string;
  copy_exe_level_up_limit: string;
  copy_exe_level_up_limit_text: string;
  copy_exe_level_low_limit: string;
  copy_exe_level_low_limit_text: string;
  flows: Array<any> = [];

  businessId: number;
  arrBusiness: Array<any> = [];

  shopId: number;
  arrShop: Array<any> = [];

  deptId: number;
  arrDept: Array<any> = [];

  positions: Array<any> = [];
  currentPositionId: number;

  filterCode: string = "";
  filterName: string = "";
  applyName: string;
  constructor(public navCtrl: NavController,
    private platform: Platform,
    private employeeSrv: EmployeeProvider,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public applySrv: ApplyProvider,
    public actionsheetCtrl: ActionSheetController) {
    this.id = this.navParams.get('id');
    this.applyName = this.navParams.get('name');

    this.filterTab = "tabOne";
    this.ruleTab = "tabOne";
    this.procedure = "one";
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.applySrv.getFlows(this.id).subscribe((items) => {
        this.flows = [];
        items.forEach(element => {
          let cl = this.levels.find((l) => l.id == element.copy_exe_level_low_limit);
          this.flows.push({
            id: element.id,
            isSelected: false,
            name: element.name,
            apply_exe_level_up_limit: element.apply_exe_level_up_limit,
            apply_exe_level_up_limit_text: this.levels.find((l) => l.id == element.apply_exe_level_up_limit).name,
            apply_exe_level_low_limit: element.apply_exe_level_low_limit,
            apply_exe_level_low_limit_text: this.levels.find((l) => l.id == element.apply_exe_level_low_limit).name,
            copy_exe_level_up_limit: element.copy_exe_level_up_limit,
            copy_exe_level_up_limit_text: this.levels.find((l) => l.id == element.copy_exe_level_up_limit).name,
            copy_exe_level_low_limit: element.copy_exe_level_low_limit,
            copy_exe_level_low_limit_text: cl.name
          });
        });
        if (this.flows.length > 0) {
          this.flows[0].isSelected = true;
          this.apply_exe_level_low_limit_text = this.flows[0].apply_exe_level_low_limit_text;
          this.apply_exe_level_up_limit_text = this.flows[0].apply_exe_level_up_limit_text;
          this.copy_exe_level_low_limit_text = this.flows[0].copy_exe_level_low_limit_text;
          this.copy_exe_level_up_limit_text = this.flows[0].copy_exe_level_up_limit_text;
          this.name = this.flows[0].name;
        }
      });
      this.bindBusiness();
    });

  }

  // 重置（过滤）
  handleResetFilter() { }

  // 确认（过滤）
  handleConfirmFilter() {
    if (this.filterTab == "tabOne") {
      if (this.positions && this.positions.length > 0) {
        this.showFilter = !this.showFilter;
        this.data = [];
        if (this.currentPositionId) {
          this.positions.forEach((p) => {
            if (p.staffCount > 0) {
              p.staff.forEach(element => {//filterCode
                let isOK = false;
                if (this.filterName) {
                  if (element.name.indexOf(this.filterName) > 0) {
                    isOK = true;
                  }
                }

                if (this.filterCode) {
                  if (element.email.indexOf(this.filterCode) > 0) {
                    isOK = true;
                  }
                }

                if (isOK) {
                  this.data.push({
                    name: element.name,
                    isSelected: false,
                    id: element.id,
                    type: 1
                  });
                }

              });
            }
          });
        } else {//岗位
          this.positions.forEach((p) => {
            this.data.push({
              name: p.name,
              isSelected: false,
              id: p.id,
              type: 0
            });
          });
        }
      }
    } else {
      this.showFilter = false;//关闭筛选
    }
  }

  setCurrentFlow(flow: any) {
    flow.isSelected = !flow.isSelected;
    if (flow.isSelected) {
      this.currentFlowId = flow.id;
      this.name = flow.name;
      this.apply_exe_level_up_limit_text = flow.apply_exe_level_up_limit_text;
      this.apply_exe_level_low_limit_text = flow.apply_exe_level_low_limit_text;
      this.copy_exe_level_up_limit_text = flow.copy_exe_level_up_limit_text;
      this.copy_exe_level_low_limit_text = flow.copy_exe_level_low_limit_text;
    }
  }

  handleConfirmAddRule() {
    if (!this.name) return;
    this.applySrv.addflow(this.id, {
      name: this.name,
      apply_exe_level_up_limit: this.apply_exe_level_up_limit,
      apply_exe_level_low_limit: this.apply_exe_level_low_limit,
      copy_exe_level_up_limit: this.copy_exe_level_up_limit,
      copy_exe_level_low_limit: this.copy_exe_level_low_limit
    }).subscribe((v) => {
      if (v.message === "添加成功")
        this.menuCtrl.close("applysettingcreateMenu");
    });
  }


  ionViewDidLeave() {
    this.menuCtrl.enable(false, "applysettingcreateMenu");
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(true, "applysettingcreateMenu");
  }


  // 显示过滤弹框
  handleShowFilterMenu() {
    this.showFilter = !this.showFilter;
  }

  // 添加规则
  handleAddRule() {
    // let modal = this.modalCtrl.create('ApplyPaySettingCreatePage');
    // modal.present();
    this.menuCtrl.open("applysettingcreateMenu").then((v) => {
      console.log(v);
    }, err => {
      console.error(err);
    }
    )
  }

  // 返回
  handleGoBack(drawer) {
    drawer.style.display = "none";
    this.navCtrl.pop();
  }

  // 点击当前岗位或者员工
  handleItemClick(item: any) {
    if (item.type == 0) {//选择的岗位 
      this.navCtrl.push('ApplyPositionPage', {
        positionId: item.id,
        name: item.name,
        applyName: this.applyName
      });
    } else {
      this.navCtrl.push('ApplyPersonPage', {
        staffId: item.id,
        name: item.name,
        applyName: this.applyName
      })
    }
  }

  // 操作
  handleOperate() {
    this.actionsheetCtrl.create({
      buttons: [{
        text: "分配",
        handler: () => {
          let items = this.data.filter((d) => {
            d.isSelected
          });

          items.forEach((item) => {
            if (item.type == 0) {//选择的岗位
              this.applySrv.addFlowToPosition({
                position_id: item.id,
                application_type_id: this.id,
                application_flow_id: this.currentFlowId
              });
            } else {
              this.applySrv.addFlowToUser({
                user_id: item.id,
                application_type_id: this.id,
                application_flow_id: this.currentFlowId
              });
            }
          });
        }
      }, {
        text: "查看",
        handler: () => {

        }
      }, {
        text: "取消",
        handler: () => {

        }
      }]
    }).present();
  }

  // 选择
  handleSelect() {
    this.actionsheetCtrl.create({
      buttons: [{
        text: "全选",
        handler: () => {
          this.data.forEach((d) => {
            d.isSelected = true;
          });
        }
      }, {
        text: "反选",
        handler: () => {
          this.data.forEach((d) => {
            d.isSelected = !d.isSelected;
          });
        }
      }, {
        text: "取消",
        handler: () => {

        }
      }]
    }).present();
  }


  setOP(id, text) {
    if (this.isUp) {
      this.apply_exe_level_up_limit = id;
      this.apply_exe_level_up_limit_text = text;
    } else {
      this.apply_exe_level_low_limit = id;
      this.apply_exe_level_low_limit_text = text;
    }
  }

  setCopy(id, text) {
    if (this.isUp) {
      this.copy_exe_level_up_limit = id;
      this.copy_exe_level_up_limit_text = text;
    } else {
      this.copy_exe_level_low_limit = id;
      this.copy_exe_level_low_limit_text = text;
    }
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

}



