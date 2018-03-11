import {Component , Input , Output , OnInit , EventEmitter} from '@angular/core';

@Component({
    selector:'simple-tree',
    template:`
        <ul>
            <li *ngFor="let item of items" no-lines>
                <div class="tree-item" (click)="handleNodeClick(item , $event)">
                    <ion-icon #arrow *ngIf="item.children && item.children.length"
                            name="md-arrow-dropdown"
                            (click)="handleDropArrowClick($event)">
                    </ion-icon>
                    <span>
                        {{item.name}}
                    </span>
                    <ion-icon *ngIf="item.isSelected" 
                            item-end color="primary" 
                            name="ios-checkmark">
                    </ion-icon>
                </div>
                <simple-tree 
                    *ngIf="item.children && item.children.length"
                    [items]="item.children" (onSelect)="handleSelect($event)">
                </simple-tree>
            </li>
        </ul>
    `
})

export class SimpleTreePage {
    @Input() items : Array<any> ;
    @Output() onSelect = new EventEmitter<boolean>();
    constructor () {
       
    }

    // 节点的点击事件
    handleNodeClick (item , e) {
       this.onSelect.emit(item);
    }

    handleSelect (item) {
        this.onSelect.emit(item);
    }

    // 展开收缩
    handleDropArrowClick (e) {
        e.preventDefault();
        e.stopPropagation();    
        let childTree = e.target.parentNode.nextElementSibling;
        let deg = childTree.style.display == "none" ? "0deg":"-90deg";
        childTree.style.display = childTree.style.display == "none" ? "block":"none";
        e.target.style = "transform:rotate("+deg+");"+
                        "-webkit-transform:rotate("+deg+");"
    }
}