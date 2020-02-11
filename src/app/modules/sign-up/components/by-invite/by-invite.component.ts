import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Group, User, GroupMember } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { WindowService } from 'src/app/shared/services/window.service';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-by-invite',
  templateUrl: './by-invite.component.html',
  styleUrls: ['./by-invite.component.css']
})
export class ByInviteComponent implements OnInit {

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
    //console.log(this.authService.getAccount());
    this.windowRef = this.windowService.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.userService.getMemberById(params.get('id')).valueChanges().subscribe(member => {
          this.groupMember = member;
          this.groupMember.key = params.get('id');

          if (this.authService.isLoggedIn()) {
            this.user = this.userService.getUserInfo();
            this.userService.updateMember(this.groupMember.key, { uid: this.user.uid })
              .then(res => {

                this.router.navigate(['/user/group/' + this.groupMember.groupId]);

              }, err => {
                //console.log(err);
              });
          }

          //console.log(this.user);
          this.userService.getGroupById(this.groupMember.groupId).valueChanges().subscribe(group => {
            this.group = group;
            //console.log(group);
          });
        });
      }
    });
  }

  onSignUp() {
    this.router.navigate(['/sign-up']);
  }

  onSubmit() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const phoneNumberString = '+91' + this.groupMember.phone;

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

  onVerify() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        //console.log(result);
        this.toastrService.success('Your mobile no. verified successfully.', 'Sign Up');

        this.authService.setAccount(result.user);

        let createdAt: Date = new Date();
        this.user.fullName = this.groupMember.name;
        this.user.phone = this.groupMember.phone;
        this.user.uid = result.user.uid;
        this.user.createdAt = createdAt;

        if (result.additionalUserInfo.isNewUser) {

          this.userService.createUser(this.user)
            .then(res => {

              this.userService.setUser(this.user);

              this.userService.updateMember(this.groupMember.key, { uid: this.user.uid })
                .then(res => {

                  this.router.navigate(['/user/group/' + this.groupMember.groupId]);

                }, err => {
                  //console.log(err);
                });

            }, err => {
              //console.log(err);
            });
        }
        else {
          this.userService.updateMember(this.groupMember.key, { uid: this.user.uid })
            .then(res => {

              this.userService.setUser(this.user);

              this.router.navigate(['/user/group/' + this.groupMember.groupId]);

            }, err => {
              //console.log(err);
            });
        }
      })
      .catch((err) => {
        this.toastrService.error(err, 'Sign Up');
        //console.log('sms not sent', err);
      });
  }
}
