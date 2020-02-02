import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './shared/components/root/root.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/services/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { PrizesComponent } from './pages/prizes/prizes.component';
import { RulesComponent } from './pages/rules/rules.component';
import { TermsComponent } from './pages/terms/terms.component';
import { WinnersComponent } from './pages/winners/winners.component';
import { HowToPlayComponent } from './pages/how-to-play/how-to-play.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'how-to-play',
        component: HowToPlayComponent,
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
      },
      {
        path: 'prizes',
        component: PrizesComponent,
      },
      {
        path: 'rules',
        component: RulesComponent,
      },
      {
        path: 'terms',
        component: TermsComponent,
      },
      {
        path: 'winners',
        component: WinnersComponent,
      },
      {
        path: 'user',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'game',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('./modules/game/game.module').then(m => m.GameModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule)
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
