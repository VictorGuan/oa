import { Component, Input , Output , OnInit , EventEmitter} from '@angular/core';
/**
 * Generated class for the TreeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tree',
  templateUrl: 'tree.html'
})
export class TreeComponent {

  @Input() items : Array<any> ;
  @Output() onSelect = new EventEmitter<boolean>();
  constructor() {
    console.log('Hello TreeComponent Component');
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
