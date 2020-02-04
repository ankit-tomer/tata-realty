import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WindowService } from 'src/app/shared/services/window.service';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  user: User;

  windowRef: any;
  verificationCode: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private route: ActivatedRoute, private windowService: WindowService, public toastrService: ToastrService) {
    this.user = new User();
  }

  ngOnInit() {
    this.windowRef = this.windowService.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user']);
    }
  }

  onSubmit() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const phoneNumberString = '+91' + this.user.phone;

    this.userService.getUserByPhone(this.user.phone).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      if (users.length > 0) {
        firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
          .then((result) => {
            this.windowRef.confirmationResult = result;
            this.toastrService.success('OTP has been sent to your mobile no.', 'Sign Up');
            //console.log(result);
          })
          .catch((err) => {
            this.toastrService.error(err, 'Sign Up');
            //console.log('sms not sent', err);
          });
      }
      else {
        this.toastrService.error('Your phone no is not registered with us.', 'Sign In');
      }
    });
  }

  onVerify() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        //console.log(result);
        this.toastrService.success('Your mobile no. verified successfully.', 'Sign Up');

        this.authService.setAccount(result.user);
        this.user.uid = result.user.uid;
        console.log(this.user.uid)
        this.userService.getUser(this.user.uid).valueChanges().subscribe(user => {
          console.log(user);
          let userInfo: User = new User();
          userInfo = user;
          userInfo.uid = this.user.uid;
          //console.log(userInfo);
          this.userService.setUser(userInfo);
          this.router.navigate(['/user']);
        });
      })
      .catch((err) => {
        this.toastrService.error(err, 'Sign Up');
        //console.log('sms not sent', err);
      });
  }

}
