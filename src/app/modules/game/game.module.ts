import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTimerModule } from 'ngx-timer';

import { GameRoutingModule } from './game-routing.module';
import { PlayComponent } from './compoenents/play/play.component';
import { PrepareComponent } from './compoenents/prepare/prepare.component';
import { StartComponent } from './compoenents/start/start.component';
import { OverComponent } from './compoenents/over/over.component';
import { JoinComponent } from './compoenents/join/join.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PlayComponent, PrepareComponent, StartComponent, OverComponent, JoinComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    NgxTimerModule,
    SharedModule
  ]
})
export class GameModule { }
