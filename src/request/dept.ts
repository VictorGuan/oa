export class Dept{
        id?:number;
        shop_id?:number;
        name?: string;
        manager?:string;
        created_at?:Date;
        updated_at?:Date;
        positions_count?:number;
        staffCount?:number;
}

export class DeptDetail{
        id?:number;
        shop_id?:number;
        name?: string;
        manager?:string;
        created_at?:Date;
        updated_at?:Date;
        positions_count?:number;
        staffCount?:number;
        positions?:any
}