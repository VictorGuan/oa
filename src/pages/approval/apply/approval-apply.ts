import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Platform, ToastController } from 'ionic-angular';
import { ApplyProvider } from '../../../providers/apply';

@IonicPage()
@Component({
  selector: 'page-approval-apply',
  templateUrl: 'approval-apply.html',
})
export class ApprovalApplyPage {
  id: number;
  data: any;
  comments: Array<any> = [];
  constructor(public navCtrl: NavController,
    platform: Platform,
    public applySrv: ApplyProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams) {
    this.id = navParams.get("id");
    platform.ready().then(() => {
      this.applySrv.showFlowDetail(this.id).subscribe((data) => {
        this.data = data;
      });

      this.applySrv.getComments(this.id).subscribe((data) => {
        data.forEach(element => {
          this.comments.push(element);
        });
      });
    });
  }

  reject(desc) {
    this.applySrv.action(this.id, "decline").subscribe((res) => {
      if (res.message == "操作成功") {
        this.addComment(desc.value);
      }
    })
  }

  addComment(comment: string) {
    this.applySrv.createComment(this.id, comment).subscribe((res) => {
      if (res.message == "操作成功") {
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 2000
        });
        toast.present();
      }
    })
  }

  agree(desc) {
    this.applySrv.action(this.id, "approve").subscribe((res) => {
      if (res.message == "操作成功") {
        this.addComment(desc.value);
      }
    })
  }
}
