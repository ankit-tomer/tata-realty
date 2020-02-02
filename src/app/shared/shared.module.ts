import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
