import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class formatDatePipe implements PipeTransform {
  constructor() {}

  transform(date: any): string {
    return new Date(date).toLocaleDateString();
  }

}