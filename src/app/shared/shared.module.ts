import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { RootComponent } from './components/root/root.component';



@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    RootComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    RootComponent
  ]
})
export class SharedModule { }
