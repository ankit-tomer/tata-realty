import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresencessService {

  playerId: string;

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) {
    //console.log('let there be presence');
    this.updateOnUser().subscribe();
    this.updateOnDisconnect();
    this.updateOnAway();
  }

  getPresence(uid: string) {
    return this.db.object(`players/`+this.playerId).valueChanges();
  }

  getUser() {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }


 async setPresence(status: string) {
    //console.log(this.playerId);
    const user = await this.getUser();
    //if (user) {
    if(this.playerId && this.playerId != '') {
      //return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
      return this.db.object(`players/`+this.playerId).update({ status, timestamp: this.timestamp });
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  updateOnUser() {
    const connection = this.db.object('.info/connected').valueChanges().pipe(
      map(connected => connected ? 'online' : 'offline')
    );

    return this.angularFireAuth.authState.pipe(
      switchMap(user =>  user ? connection : of('offline')),
      tap(status => this.setPresence(status))
    );
  }

  // updateOnDisconnect() {
  //   return this.angularFireAuth.authState.pipe(
  //     tap(user => {
  //       if (user) {
  //         this.db.object(`players/`+this.playerId).query.ref.onDisconnect()
  //           .update({
  //             status: 'offline',
  //             timestamp: this.timestamp
  //         });
  //       }
  //     })
  //   );
  // }

  updateOnDisconnect() {
    if(this.playerId && this.playerId != '') {
      return this.db.object(`players/`+this.playerId).query.ref.onDisconnect()
        .update({
          status: 'offline',
          timestamp: this.timestamp
      });
    }
  }

  // async signOut() {
  //     await this.setPresence('offline');
  //     await this.angularFireAuth.auth.signOut();
  // }

  updateOnAway() {
    document.onvisibilitychange = (e) => {

      if (document.visibilityState === 'hidden') {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    };
  }

}
