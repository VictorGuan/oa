import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplyProvider } from '../../../providers/apply';

/**
 * Generated class for the Apply001Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-apply001',
  templateUrl: 'apply001.html',
})
export class Apply001Page {
  isReadyToSave: boolean;
  id: number;
  applyName: string;
  form: FormGroup;
  isReadyEmail: boolean;
  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public applySrv: ApplyProvider,
    private platform: Platform,
    formBuilder: FormBuilder, public navParams: NavParams) {
    this.id = this.navParams.get('id');
    this.applyName = this.navParams.get('name');

    this.form = formBuilder.group({
      deliveryDate: ['', Validators.required],
      departmentName: ['', Validators.required],
      amount: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Apply001Page');
  }

  submit() {
    if (!this.form.valid) { return; }
    let newItem = this.form.value;
    let arr: Array<any> = [];
    arr.push({
      key: "deliveryDate",
      type: "Date",
      value: newItem.deliveryDate
    });
    arr.push({
      key: "departmentName",
      type: "string",
      value: newItem.departmentName
    });
    arr.push({
      key: "amount",
      type: "integer",
      value: newItem.amount
    });
    this.applySrv.addApply(this.id, arr).subscribe((json) => {
      if (json.message == "添加成功") {
        let toast = this.toastCtrl.create({
          message: "提交申请成功",
          duration: 1500
        });
        toast.onDidDismiss(() => {
          this.navCtrl.pop();
        });
        toast.present();
      }
    });
  }

}
