import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Group, User, GroupMember } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import * as firebase from 'firebase';
import { WindowService } from 'src/app/shared/services/window.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  group: Group;
  groupMember: GroupMember;
  user: User;

  windowRef: any;
  verificationCode: string;
  sent: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private route: ActivatedRoute, private windowService: WindowService, public toastrService: ToastrService) {
    this.group = new Group();
    this.groupMember = new GroupMember();
    this.user = new User();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user']);
    }

    this.windowRef = this.windowService.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
  }

  onSubmit() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const phoneNumberString = '+91' + this.user.phone;

    this.userService.getUserByPhone(this.user.phone).valueChanges().subscribe(users => {
      if (users.length > 0) {
        this.toastrService.error('Your phone no is already registered with us.', 'Sign Up');
        return false;
      }
      else {
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
    });


  }

  onVerify() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        //console.log(result);
        this.toastrService.success('Your mobile no. verified successfully.', 'Sign Up');

        this.authService.setAccount(result.user);

        if (result.additionalUserInfo.isNewUser) {

          this.group.uid = result.user.uid;

          this.userService.createGroup(this.group)
            .then(res => {
              //console.log(res);
              this.group.key = res.key;
              this.userService.setGroup(this.group);

              this.user.uid = result.user.uid;

              this.userService.createUser(this.user)
                .then(res2 => {
                  //console.log(res);
                  this.user.key = res2.key;
                  this.userService.setUser(this.user);

                  this.groupMember.name = this.user.fullName;
                  this.groupMember.phone = this.user.phone;
                  this.groupMember.isAdmin = true;
                  this.groupMember.uid = this.user.uid;
                  this.groupMember.groupId = this.group.key;

                  this.userService.createMember(this.groupMember)
                    .then(res3 => {

                      this.router.navigate(['/user']);

                    }, err => {
                      //console.log(err);
                    });

                }, err => {
                  //console.log(err);
                });

            }, err => {
              //console.log(err);
            });

        }
        else {
          this.router.navigate(['/user']);
        }
      })
      .catch((err) => {
        this.toastrService.error(err, 'Sign Up');
        //console.log('sms not sent', err);
      });
  }

}
