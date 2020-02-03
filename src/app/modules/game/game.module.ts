import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayComponent } from './compoenents/play/play.component';
import { PrepareComponent } from './compoenents/prepare/prepare.component';
import { StartComponent } from './compoenents/start/start.component';
import { OverComponent } from './compoenents/over/over.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CountdownModule } from 'ngx-countdown';
import { NgxTimerModule } from 'ngx-timer';


@NgModule({
  declarations: [PlayComponent, PrepareComponent, StartComponent, OverComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    CountdownModule,
    NgxTimerModule
  ]
})
export class GameModule { }
