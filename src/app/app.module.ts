import { TabsPage } from './../pages/tabs/tabs';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { CoreService } from '../providers/baseurl.service'; 
import {Storage, IonicStorageModule} from "@ionic/storage";
import { CommonModule } from '@angular/common';
import { LoginProvider } from '../providers/login';
import { BusinessServiceProvider } from '../providers/business-service/business-service';
import { PunishmentRewardProvider } from '../providers/punishment-reward/punishment-reward';
import { File } from '@ionic-native/file';
import { ReportProvider } from '../providers/report/report';
import { EventHandlerProvider } from '../providers/event-handler/event-handler';
import { SchedulingProvider } from '../providers/scheduling/scheduling';
import { AttendanceCheckProvider } from '../providers/attendance-check/attendance-check';

@NgModule({
  declarations: [
    MyApp,  
  ],
  imports: [
    BrowserModule, 
    CommonModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,  
  ],
  providers: [ 
    LoginProvider,
    StatusBar,
    SplashScreen,
    CoreService, 
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BusinessServiceProvider,
    PunishmentRewardProvider,
    ReportProvider,
    EventHandlerProvider,
    SchedulingProvider,
    AttendanceCheckProvider
  ]
})
export class AppModule { }
