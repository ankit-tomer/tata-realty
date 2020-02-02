import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { ByInviteComponent } from './components/by-invite/by-invite.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberComponent } from './components/member/member.component';

// const firebaseUiAuthConfig: firebaseui.auth.Config = {
//   signInFlow: 'popup',
//   signInOptions: [
//     {
//       provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//       defaultCountry: 'IN',
//       recaptchaParameters: {
//         type: 'image', // 'audio'
//         size: 'invisible', // 'invisible' or 'compact'
//         badge: 'bottomright' //' bottomright' or 'inline' applies to invisible.
//       }
//     }
//   ],
//   tosUrl: '/tos',
//   privacyPolicyUrl: '/privacy-policy',
//   credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
// };

@NgModule({
  declarations: [SignUpComponent, ByInviteComponent, MemberComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule
  ]
})
export class SignUpModule { }
