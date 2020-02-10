import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  userInfo: User;
  
  constructor(private angularFireAuth: AngularFireAuth) { 
    this.user = angularFireAuth.authState;

    if(localStorage.getItem('user')){
			this.userInfo = JSON.parse(localStorage.getItem('user'));
		}
		else{
			this.userInfo = new User();
		}
  }

  setAccount(user: firebase.User) {
    this.userInfo.fullName = user.displayName;
    this.userInfo.email = user.email;
    this.userInfo.phone = user.phoneNumber;
    this.userInfo.photo = user.photoURL;
    this.userInfo.uid = user.uid;
    localStorage.setItem('user', JSON.stringify(this.userInfo));
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  isLoggedIn() {
    if(localStorage.getItem('user')){
    //if(this.user) {
      return true;
    }
    else{
      return false;
    }
  }

  getAccount() {
    return this.userInfo;
  }

  updateProfile(profile: object) {
    this.angularFireAuth
    .auth
    .currentUser
    .updateProfile(profile).then(function() {
      this.setAccount(this.angularFireAuth.auth.currentUser);
    }, function(error) {
      
    });
  }

}
