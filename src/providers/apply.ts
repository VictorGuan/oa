import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Location } from './../models/location';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CoreService } from './baseurl.service';
import { Item } from '../models/item';


@Injectable()
export class ApplyProvider {
    url: string;
    constructor(public http: Http, public alertCtrl: AlertController, private coreService: CoreService) {
        this.url = this.coreService.baseUrl.concat("api/application/")
    }

    //申请分类
    query(id?: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);
        if (id) {
            let endpoint = this.url.concat('type/index/childs/', id.toString());
            return this.http.get(endpoint, options).map((res) => res.json());
        }
        return this.http.get(this.url.concat('type/index'), options).map((res) => res.json());
    }

    add(item: any) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);
        if (item.hasOwnProperty("input_page_name")) {
            return this.http.post(this.url.concat('type/add/concrete'), item, options).map(res => {
                return res.json().message == "添加成功";
            });
        } else {
            return this.http.post(this.url.concat('type/add'), item, options).map(res => {
                return res.json().message == "添加成功";
            });
        }

    }

    save(item: Item) {

        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);
        if (item.hasOwnProperty("input_page_name")) {
            return this.http.patch(this.url.concat('type/patch/concrete/', item.id.toString()), { "name": item.name }, options).map(res => {
                return res.json().message == "修改成功";
            });
        } else {
            return this.http.patch(this.url.concat('type/patch/', item.id.toString()), { "name": item.name }, options).map(res => {
                return res.json().message == "修改成功";
            });
        }
    }

    delete(item: Item) {
        return this.http.patch(this.url.concat('patch/', item.id.toString()), { "name": item.name }).map(res => {

            return (<any>res).message == "修改成功";
        });
    }

    search(searchWord: string) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('type/search'), {
            name: searchWord
        }, options).map((res) => res.json());
    }

    // api/application/type/concrete/index/2
    querySettings(id: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('type/concrete/index/', id.toString());
        return this.http.get(endpoint, options).map((res) => res.json());
    }


    addflow(id: number, item: any) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('flow/add/', id.toString()), item, options).map((res) => res.json());
    }

    getFlows(id: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('flow/index/', id.toString());
        return this.http.get(endpoint, options).map((res) => res.json());
    }

    addFlowToUser(item) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('flow/add/to/user'), item, options).map((res) => res.json());
    }

    addFlowToPosition(item) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('flow/add/to/position'), item, options).map((res) => res.json());
    }
 
    getFlowsByCondition(condition:any){
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('index/search/byCondition'), condition, options).map((res) => res.json());
    }

    showStaffDetail(id: number) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('flow/show/detail/on/user/', id.toString());

        return this.http.post(endpoint, options).map((res) => {
            let json = res.json();
            let arr0 = [];
            json.审批详细列表.forEach(element => {
                arr0.push(
                    {
                        levelName: element.行政等级,
                        name: element.员工名称,
                        no: element.序号
                    }
                );
            });
            let arr1 = [];
            json.抄送详细列表.forEach(element => {
                arr1.push(
                    {
                        levelName: element.行政等级,
                        name: element.员工名称,
                        no: element.序号
                    }
                );
            });

            let special = false;
            json.是否特殊.forEach(element => {
                special = element.special == "1";
            });


            return {
                operateItems: arr0,
                copyItems: arr1,
                special: special
            };

        });
    }

    showPositionDetail(id: number) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('flow/show/detail/on/position/', id.toString());

        return this.http.post(endpoint, options).map((res) => {
            let json = res.json();
            let arr0 = [];
            json.审批详细列表.forEach(element => {
                arr0.push(
                    {
                        levelName: element.行政等级,
                        name: element.员工名称,
                        no: element.序号
                    }
                );
            });
            let arr1 = [];
            json.抄送详细列表.forEach(element => {
                arr1.push(
                    {
                        levelName: element.行政等级,
                        name: element.员工名称,
                        no: element.序号
                    }
                );
            });

            let arr2 = [];
            json.跟岗位流程不同的用户列表.forEach(element => {
                arr2.push(
                    {
                        name: element.name
                    }
                );
            });



            return {
                operateItems: arr0,
                copyItems: arr1,
                userList: arr2
            };

        });
    }


    addApply(application_type_id, fields: Array<any>) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);
        let item =
            {
                "application_type_id": application_type_id,
                "fields": fields
            }

        return this.http.post(this.url.concat('add'), item, options).map((res) => res.json());
    }


    getFlowsForFrom() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('index/from/current/user');

        return this.http.get(endpoint, options).map((res) => res.json());
    }


    getFlowsForApprove() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('index/approve/by/current/user');

        return this.http.get(endpoint, options).map((res) => res.json());
    }

    getFlowsForCopy() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('index/copy/to/current/user');

        return this.http.get(endpoint, options).map((res) => res.json());
    }

    showFlowDetail(id: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('index/show/', id.toString());

        return this.http.get(endpoint, options).map((res) => res.json());
    }

    getComments(id: number) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        let options = new RequestOptions({ headers: headers });
        this.coreService.optionsAddToken(options);
        let endpoint = this.url.concat('comment/show/', id.toString());

        return this.http.get(endpoint, options).map((res) => res.json());
    }


    action(id: number, action: string) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('action'), {
            application_id: id,
            action: action
        }, options).map((res) => res.json());
    }

   createComment(id: number, comment: string) {
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json;charset=utf-8'
            })
        });
        this.coreService.optionsAddToken(options);

        return this.http.post(this.url.concat('action'), {
            application_id: id,
            comment: comment,
            comment_type:0
        }, options).map((res) => res.json());
    }

}
