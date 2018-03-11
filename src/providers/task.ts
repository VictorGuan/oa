import { Injectable, state } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Location } from './../models/location';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CoreService } from './baseurl.service';
import { Item } from '../models/item';
import { stringify } from '@angular/compiler/src/util';
import { Header } from 'ionic-angular/components/toolbar/toolbar-header';


@Injectable()
export class TaskProvider {
    url: string;
    constructor(public http: Http,
        public alertCtrl: AlertController, private coreService: CoreService) {
        this.url = this.coreService.baseUrl.concat("api/task/")
    }


    add(docs: Array<Blob>, data: any) {
        var form = new FormData();
        docs.forEach((doc) => {
            form.append("docs[]", doc);
        });
        form.append("data", JSON.stringify(data));// 
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': undefined //'application/x-www-form-urlencoded;charset=utf-8'  multipart/form-data
            })
        });
        options.headers.delete("Content-Type");

        this.coreService.optionsAddToken(options);
        // let body: string = JSON.stringify({'formData': form});
        return this.http.post(this.url.concat('add'), form, options).map(res => {
            return res.json().message == "添加成功";
        });
    }


    editAutoTask(taskId:number,docs: Array<Blob>, data: any){
        var form = new FormData();
        docs.forEach((doc) => {
            form.append("docs[]", doc);
        });
        form.append("data", JSON.stringify(data));// 
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': undefined //'application/x-www-form-urlencoded;charset=utf-8'  multipart/form-data
            })
        });
        options.headers.delete("Content-Type");

        this.coreService.optionsAddToken(options);
        // let body: string = JSON.stringify({'formData': form});
        return this.http.post(this.url.concat('auto/patch/',taskId.toString()), form, options).map(res => {
            return res.json().message == "修改成功";
        });
    }

    createAutoTask(docs: Array<Blob>, data: any){
        var form = new FormData();
        docs.forEach((doc) => {
            form.append("docs[]", doc);
        });
        form.append("data", JSON.stringify(data));// 
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': undefined //'application/x-www-form-urlencoded;charset=utf-8'  multipart/form-data
            })
        });
        options.headers.delete("Content-Type");

        this.coreService.optionsAddToken(options);
        // let body: string = JSON.stringify({'formData': form});
        return this.http.post(this.url.concat('auto/add'), form, options).map(res => {
            return res.json().message == "添加成功";
        });
    }

    show(id: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);

        return this.http.get(this.url.concat('show/', id.toString()), options).map((res) => res.json());
    }

    addLog(id: number, docs: Array<Blob>, data: any) {

        var form = new FormData();
        docs.forEach((doc) => {
            form.append("docs[]", doc);
        });
        form.append("data", JSON.stringify(data));// 
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': undefined //'application/x-www-form-urlencoded;charset=utf-8'  multipart/form-data
            })
        });
        options.headers.delete("Content-Type");

        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('log/add/', id.toString()), form, options).map(res => {
            return res.json().message == "添加成功";
        });
    }

    setStatus(id: number, status: number) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('set/status/', id.toString()), {
            status: status
        }, options).map((res) => {
            return res.json().message == "添加成功";
        });
    }


    getTasksBySelf() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);

        return this.http.get(this.url.concat('index/self'), options).map((res) => res.json());
    }

    getTasksByDispatch() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);

        return this.http.get(this.url.concat('index/dispatch'), options).map((res) => res.json());
    }

    getTasksByInvolve() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);

        return this.http.get(this.url.concat('index/involve'), options).map((res) => res.json());
    }

    getStatus(status: number) {
        switch (status) {
            case 0:
                return "刚建立";
            case 1:
                return "未查看";
            case 2:
                return "已查看";
            case 3:
                return "进行中";
            case 4:
                return "申请延期";
            case 5:
                return "已经提交";
            case 6:
                return "逾期";
            case 7:
                return "取消";
            case 8:
                return "已通过";
            case 9:
                return "未通过";
            default:
                break;
        }
        return "未知";
    }


    getTasksByPosition(position:number){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);

        return this.http.get(this.url.concat('auto/show/on/position/',position.toString()), options).map((res) => res.json());
        
    }


    getPositionTaskById(taskId:number){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);

        return this.http.get(this.url.concat('auto/show/',taskId.toString()), options).map((res) => res.json());
        
    }
    

}
