import { Component, Input } from '@angular/core';

@Component({
  selector: 'flowstatus',
  templateUrl: 'flowstatus.html'
})
export class FlowstatusComponent {
  currentClasses: {};
  @Input() status: number;
  statusLabel: string;
  iconName: string;

  constructor() {
  }

  ngOnInit() {
    this.setCurrentClasses();
  }

  getLable(status) {
    switch (this.status) {
      case 0://被驳回
        return "已驳回";
      case 1://已经通过
        return "已通过";
      case 2://审批中
        return "审批中";
      case -1://刚建立，未被任何人审批
        return "已提交";
      default:
        break;
    }

    return "已提交";
  }
  getIcon(status) {
    switch (this.status) {
      case 0://被驳回
        return "ios-close-circle";
      case 1://已经通过
        return "ios-checkmark-circle";
      case 2://审批中
        return "ios-checkmark-circle";
      case -1://刚建立，未被任何人审批
        return "ios-checkmark-circle";
      default:
        break;
    }

    return "ios-checkmark-circle";
  }


  setCurrentClasses() {
    this.currentClasses = {
      'pass': this.status == 1,
      'reject': this.status != 1
    };
  }
}
