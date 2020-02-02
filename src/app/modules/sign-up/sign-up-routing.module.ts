import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ByInviteComponent } from './components/by-invite/by-invite.component';
import { MemberComponent } from './components/member/member.component';


const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  },
  {
    path: 'by-invite/:id',
    component: ByInviteComponent
  },
  {
    path: 'member',
    component: MemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
