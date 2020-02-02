import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyPipe } from 'src/app/pipes/verify.pipe';



@NgModule({
  declarations: [
    VerifyPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VerifyPipe
  ]
})
export class PipeModule { }
