import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

/* Firebase services */
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { RootComponent } from './shared/components/root/root.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PipeModule } from './modules/pipe/pipe.module';
import { PrizesComponent } from './pages/prizes/prizes.component';
import { RulesComponent } from './pages/rules/rules.component';
import { TermsComponent } from './pages/terms/terms.component';
import { WinnersComponent } from './pages/winners/winners.component';
import { AboutComponent } from './pages/about/about.component';
import { HowToPlayComponent } from './pages/how-to-play/how-to-play.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { SharedModule } from './shared/shared.module';

import { SlickCarouselModule } from 'ngx-slick-carousel';

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
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    PrizesComponent,
    RulesComponent,
    TermsComponent,
    WinnersComponent,
    AboutComponent,
    HowToPlayComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-center'
    }),
    FormsModule,
    PipeModule,
    SharedModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
