import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
// import { HomePage } from '../home/home';
// import { MessagePage } from '../message/message';
// import { ApplyPage } from '../apply/apply';
// import { TaskPage } from '../task/task';
// import { ReportPage } from '../report/report';
// import { BusinessPage } from '../business/business';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = 'HomePage';
  msgRoot = 'MessagePage';
  applyRoot = 'ApplyPage';
  taskRoot = 'TaskPage';
  reportRoot = 'ReportPage';

  constructor() {
  }
}
