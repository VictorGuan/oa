import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular';
import { LoginProvider } from '../../providers/login';
import { CoreService } from '../../providers/baseurl.service';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginName: any;
  password: any;
  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    private loginSrv: LoginProvider,
    private storage: Storage,
    private coreService: CoreService,
    private formBuilder: FormBuilder,
    private app: App,
    public navParams: NavParams) {
    this.loginForm = formBuilder.group({
      loginName: ['xw-001@kkk.io', Validators.compose([Validators.required, Validators.email])],
      password: ['123456', Validators.compose([Validators.required, Validators.minLength(3)])]
    })
    this.loginName = this.loginForm.controls['loginName'];
    this.password = this.loginForm.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  handleGoback () {
    this.navCtrl.pop();
  }
  // 登陆
  doLogin(form) {
     this.loginSrv.doLogin(form.loginName,form.password).subscribe((result) => {
      this.coreService.token = result.token;
      this.storage.set('access_token', this.coreService.token);
      if (this.navCtrl.canGoBack())
      this.navCtrl.pop();
    else {
      this.app.getRootNav().setRoot("TabsPage");
    }
    }, err => {
      console.error(err);
    })
    // let newItem = {
    //   employeeCode: org.employeeCode,
    //   orgName: org.orgName,
    //   url: url,
    //   password: org.password,
    //   uuid: this.helper.getUUID()
    // };

    // const loading = this.loadingCtrl.create({
    //   content: this.translate.instant('OrganizationPage.LoadingTip'),
    //   duration: 10000
    // });

    // loading.onDidDismiss((orgs) => {
    //   if (orgs) {
    //     if (orgs.length == 1) {
    //       this.storage.set('DefaultOrg', orgs[0]).then((value) => {
    //         this.events.publish('user:login', value);
    //       });
    //     }
    //     if (this.navCtrl.canGoBack())
    //       this.navCtrl.pop();
    //     else {
    //       this.app.getRootNav().setRoot("TabsPage");
    //     }
    //   }
    // });
    // loading.present();

    // this.accountProvider.register(newItem.employeeCode, newItem.password, newItem.uuid, newItem.url).subscribe((result) => {
    //   let saveOrg: Organization = newItem;
    //   saveOrg.employeeDepartment = result.EmployeeDepartment;
    //   saveOrg.id = result.EmployeeId;//用员工主键做为此处的主键
    //   saveOrg.employeeName = result.EmployeeName;
    //   this.storage.get('Orgs').then((allOrg) => {
    //     if (allOrg)
    //       allOrg.push(saveOrg);
    //     else
    //       allOrg = [saveOrg];

    //     return this.storage.set('Orgs', allOrg);
    //   }).then((all) => {
    //     loading.dismiss(all);
    //   });
    // },err=>{
    //   console.log(err);
    //   loading.dismiss(null);
    // });
 
  }

}
