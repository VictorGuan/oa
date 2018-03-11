import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, RequestMethod } from '@angular/http';

@Injectable()
export class CoreService {

  constructor() { }

  public baseUrl: string = 'http://104.225.239.50:8000/';
 
  private _token: string;//token
  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  optionsAddToken(options: RequestOptionsArgs): void {
    let token: string = this._token;
    if (token) {
      if (options.headers) {
        options.headers.append('Authorization', 'Bearer ' + token );
      } else {
        options.headers = new Headers({
          'Authorization': 'Bearer ' + token
        });
      }
    }
  }
  
    //-------------------------------get------------------------------------------------
    public getLocation : string  ='/api/location/index';
    public getChlidLocation :string = 'api/location/getChildLocation/';
    public getBusiness : string ='api/organization/business/index';
    public getShops : string = 'api/organization/shop/index/';
    public getSpecifiedShop:string = 'api/organization/shop/detail/';
    public getDept : string = 'api/organization/department/index/';
    public getDeptDetail : string = 'api/organization/department/detail/';
    public getPosition : string = 'api/organization/position/index/';
    public getAdministrativeRank : string = 'api/organization/exelevel/index';

    public getBusinessList : string ='api/organization/business/list';
    public getStoresList : string ='api/organization/shop/list';
    public getDeptList : string ='api/organization/department/list';
    public getPositionsList : string ='api/organization/position/list';
    public getEmpList : string ='api/organization/position/list'

    public getShopPunishment :string ='api/fine/dispatch/show/';

    public getAllReports : string ='api/report/type/show';
    public getPositionReportType : string ='api/report/position/show/';
    public getEnableCreateReport : string ='api/report/type/show/on/user';
    public getUserCreatedReprot :string ='api/report/index/self';
    public getUserReviewedReprot : string ='api/report/index/check/by';
    public getUserForwardReprot : string ='api/report/index/copy/to';

    //attendance check;
    public getPositionsAttendanceCheckList : string ='api/attendance/type/list/on/position/';
    public getAttendanceCheckDetailList : string ='api/attendance/record/show/';
    public getCurrentDayOnOfficeTime : string ='api/attendance/shift/show/shift';

    //-------------------------------post------------------------------------------------
    public addBusiness : string = 'api/organization/business/add';
    public addShop : string = 'api/organization/shop/add/';
    public searchShop : string = 'api/organization/shop/search';
    public addDept : string = 'api/organization/department/add/';
    public createPosition : string = 'api/organization/position/add/';
    public addAdministrativeRank : string  ='api/organization/exelevel/add';

    public deliverDeptPunishment : string ='api/fine/dispatch/on/department/';
    public deliverShopPunishement : string ='api/fine/dispatch/on/shop/';

    public addReportType : string ='api/report/type/add';
    public setReporttoPositon : string ='api/report/position/set/';
    public createReport : string ='api/report/add';
    public editUserReportType :string='api/report/set/status/';

    public addPunishmentReward : string ='api/fine/type/add';
    public searchPunishmentReward :string ='api/fine/type/search';
    public searchActivePunishmentReward :string ='api/fine/type/list/on/target';
    public searchSpecifiedActivePunishment : string ='api/fine/type/list/on/staff';
    public addSpecifiedPunishment : string ='api/fine/ticket/add';
    public getStaffActivePunishment : string ='api/fine/type/list/on/staff';
    public addShopPunishement : string ='api/fine/ticket/add';
    public getMyPunishmentReward : string ='api/fine/index/show/self';
    public getMyDeliver : string ='api/fine/index/show/dispatch';

    //attendance check;
    public addAttendanceCheckApply : string ='api/attendance/type/add/apply/';
    public addClockOnAndOff : string ='api/attendance/record/add';
    public showEmployeeAttendanceCheckRecord : string ='api/attendance/check/show/on/position/';
    public verifyAttendanceCheckDetail : string ='api/attendance/check/add/';
    public getEmployeeAttendanceChcekDetail : string ='api/attendance/record/self';

    //scheduling
    public addPositionSchedule : string ='api/shift/position/add/';
    public editPositionSchedule : string ='api/shift/position/patch/';
    public showPositionSchedule : string ='api/shift/position/show/';
    public showPositionListwithStatus :string ='api/shift/position/list';
    public showEmployeeListwithStatus : string ='api/shift/staff/list';
    public setEmployeeSchedule : string ='api/shift/staff/add/';
    public showEmployeeSchedule : string ='api/shift/staff/show/';

     //-------------------------------patch------------------------------------------------
    public patchBusiness : string = 'api/organization/business/patch/';
    public editShopName : string = 'api/organization/shop/patch/name/';
    public editShopAddress : string = 'api/organization/shop/patch/address/';
    public endShop : string = 'api/organization/shop/patch/status/';
    public editPostionName : string ='api/organization/position/patch/';
    public editAdministrativeRank : string ='api/organization/exelevel/patch/';
    public updateAdministrativeRank : string ='api/organization/exelevel/update/levels';

    public editPunishmentReward : string ='api/fine/type/patch';
    public patchActivePunishmentReward : string ='api/fine/type/apply/on/target';

    public editReportType : string ='api/report/type/patch/';
}