import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayComponent } from './components/play/play.component';
import { PrepareComponent } from './components/prepare/prepare.component';
import { StartComponent } from './components/start/start.component';
import { OverComponent } from './components/over/over.component';
import { JoinComponent } from './components/join/join.component';


const routes: Routes = [
  {
    path: 'play/:id/:player',
    component: PlayComponent
  },
  {
    path: 'join/:id/:player',
    component: JoinComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
