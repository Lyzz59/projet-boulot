import { Pipe, PipeTransform } from '@angular/core';

  import { DatePipe, formatDate } from '@angular/common';  

  @Pipe({

   name: 'customDate'

  })

  export class CustomDatePipe extends 

 DatePipe implements PipeTransform {

   override transform(value: any, args?: any): any {
 return super.transform(value, " EEEE d MMM ");   } }