import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeysPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'local',
})
export class LocalPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value): any {
    // console.log(value);
    // console.log(typeof(value));

    if (typeof value === 'string') {
      var arr = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z?$/.exec(value);
      if (arr) {
        let month = +arr[2] - 1; 
        return new Date(+arr[1], month, +arr[3], +arr[4],
          +arr[5], +arr[6]);
      }
    }

    return value;
 
  }
}
