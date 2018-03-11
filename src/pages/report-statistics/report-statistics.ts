import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


/**
 * Generated class for the ReportStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-statistics',
  templateUrl: 'report-statistics.html',
})
export class ReportStatisticsPage {

  organization:number;
  reportType:number;
  status:number;
  constructor(public navCtrl: NavController, public navParams: NavParams , public menuCtrl:MenuController) {
  }

  ionViewDidLoad() {
    this.initChart();
  }

  handleGoback () {
    this.navCtrl.pop();
  }
  handleShowFilterMenu () {
    this.menuCtrl.toggle();
  }
  initChart () {
    let myChart = echarts.init(document.getElementById('chart'));
    let labelTop = {
        normal : {
            label : {
                show : true,
                position : 'center',
                formatter : '{b}',
                textStyle: {
                    baseline : 'bottom'
                }
            },
            labelLine : {
                show : false
            }
        }
    };
    let labelFromatter = {
        normal : {
            label : {
                formatter : function (params){
                    return 7 - params.value + '/7';
                },
                textStyle: {
                    color:'#3EC4EF',
                    baseline : 'top',
                    fontSize:14
                }
            },
            color:'#3EC4EF'
        },
    }
    let labelBottom = {
        normal : {
            color: '#ccc',
            label : {
                show : true,
                position : 'center'
            },
            labelLine : {
                show : false
            }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    let radius = [40, 45],
    option = {
        series : [{
          type : 'pie',
          center : ['50%', '50%'],
          radius : radius,
          itemStyle : labelFromatter,
          data : [
              {name:'other', value:0, itemStyle : labelBottom},
              {name:'出勤人数', value:7,itemStyle : labelTop}
          ]
      }]
    };
    myChart.setOption(option);
  }

}
