export class Shop {
    id?:number;
    business_id?:number;
    name?:string;
    domain?:string;   
    address?:string;
    manager?:string;
    status?:number;
    created_at?:Date;
    updated_at?:Date;
    departments_count?:number;
    staffCount:number;
}

export class ShopDetail{
    id?:number;
    business_id?:number;
    name?:string;
    domain?:string;
    address?:string;
    manager?:string;
    status?:number;
    created_at?:Date;
    updated_at?:Date;
    staffCount?:number;
    departments?:any;
    dutylogs?:any;
    status_log?:any
}