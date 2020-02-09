import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayComponent } from './components/play/play.component';
import { PrepareComponent } from './components/prepare/prepare.component';
import { StartComponent } from './components/start/start.component';
import { OverComponent } from './components/over/over.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CountdownModule } from 'ngx-countdown';
import { NgxTimerModule } from 'ngx-timer';
import { JoinComponent } from './components/join/join.component';

import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [PlayComponent, PrepareComponent, StartComponent, OverComponent, JoinComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    SharedModule,
    CountdownModule,
    NgxTimerModule,
    QRCodeModule
  ]
})
export class GameModule { }
