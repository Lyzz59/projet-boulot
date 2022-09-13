import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDatePipe } from './pipes/formatDate.pipe';
import { CustomDatePipe } from './pipes/custom.datepipe';



@NgModule({
  declarations: [
    formatDatePipe,
    CustomDatePipe
  ],
  exports: [
    formatDatePipe,
    CustomDatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
