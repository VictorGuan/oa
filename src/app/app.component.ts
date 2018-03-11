import { LoginProvider } from './../providers/login';
import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from "@ionic/storage";
import { TabsPage } from '../pages/tabs/tabs';
import { CoreService } from '../providers/baseurl.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "TabsPage";

  constructor(private storage: Storage,
    platform: Platform,
    private coreService: CoreService, 
    private loginSrv: LoginProvider,
    private modalCtrl: ModalController,
    statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
       statusBar.styleDefault();
      splashScreen.hide();
    });
  } 
}
