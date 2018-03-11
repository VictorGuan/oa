import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeProvider } from '../../providers/employee';

@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {
  suffix: string;//邮件后缀
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  isReadyEmail: boolean;
  positionName: string = "";
  currentPosition: any;
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private employeeSrv: EmployeeProvider,
    private platform: Platform,
    formBuilder: FormBuilder, public navParams: NavParams) {
    this.form = formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      sex: [''],
      dob: [''],
      age: ['0'],
      phone: [''],
      entryDate: [''],
      experience: [''],
      comment: ['']
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
      if (this.isReadyToSave)
        this.isReadyToSave = this.isReadyEmail;
    });

  }

  getSuffix() {
    if (!this.currentPosition) return;
    this.employeeSrv.getSuffix(this.currentPosition.id).subscribe((v) => {
      this.suffix = v.suffix;
    })
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {

    });
  }

  handleGoback() {
    this.navCtrl.pop();
  }

  checkEmail(email: string) {
    let name = email.concat(this.suffix);
    this.employeeSrv.checkEmail(name).subscribe((v) => {
      this.isReadyEmail = v;
      if (!this.isReadyEmail) {
        let toast = this.toastCtrl.create({
          message: "邮件地址已存在，请重新输入",
          //   position: 'middle',
          duration: 3000
        });
        toast.present();
      }
    })
  }

  // 选择岗位
  handleSelectPost() {
    let positionModal = this.modalCtrl.create('SelectPositionPage');
    positionModal.onDidDismiss(data => {
      if (data) {
        this.currentPosition = data;
        this.positionName = this.currentPosition.name;
        this.getSuffix();
      }
    });
    positionModal.present();
  }

  handleSave() {
    if (!this.currentPosition) return;

    if (!this.form.valid) { return; }

    let employee = this.form.value;
    let newItem = {
      position_id: this.currentPosition.id,
      email: employee.email.concat(this.suffix),
      name: employee.name,
      sex: employee.sex,
      dob: employee.dob,
      age: employee.age,
      phone: employee.phone,
      entryDate: employee.entryDate,
      experience: employee.experience,
      comment: employee.comment
    };
    this.employeeSrv.save(newItem).subscribe((v) => {
      if (v) {
        let toast = this.toastCtrl.create({
          message: "员工入职成功",
          duration: 3000
        });
        toast.present();
      }
    })
    this.navCtrl.pop();
  }
}
