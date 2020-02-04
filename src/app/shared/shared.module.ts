import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { MyScoreComponent } from './components/my-score/my-score.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    MyScoreComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    MyScoreComponent
  ]
})
export class SharedModule { }
