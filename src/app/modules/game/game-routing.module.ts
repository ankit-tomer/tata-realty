import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './compoenents/play/play.component';
import { PrepareComponent } from './compoenents/prepare/prepare.component';
import { StartComponent } from './compoenents/start/start.component';
import { OverComponent } from './compoenents/over/over.component';
import { JoinComponent } from './compoenents/join/join.component';


const routes: Routes = [
  {
    path: 'play/:id/:player',
    component: PlayComponent
  },
  {
    path: 'prepare/:id/:player',
    component: PrepareComponent
  },
  {
    path: 'start/:id/:player',
    component: StartComponent
  },
  {
    path: 'over/:id/:player',
    component: OverComponent
  },
  {
    path: 'join/:id',
    component: JoinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
