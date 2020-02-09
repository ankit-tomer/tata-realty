import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { of } from 'rxjs'
import * as NoSleep from 'nosleep.js';

@Injectable({
  providedIn: 'root'
})
export class PresencessService {

  playerId: string;
  orientation: any = { y: 0, z: 0, status: 'success' };
  status: string;
  noSleep: NoSleep;

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFireDatabase) {
    //console.log('let there be presence');
    this.noSleep = new NoSleep();
    this.updateOnUser().subscribe();
    this.updateOnDisconnect();
    this.updateOnAway();
  }

  getPresence(uid: string) {
    return this.db.object(`players/` + this.playerId).valueChanges();
  }

  getUser() {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }


  async setPresence(status: string) {
    //console.log(this.playerId);
    const user = await this.getUser();
    //if (user) {
    if (this.playerId && this.playerId != '') {
      this.status = status;
      //return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
      return this.db.object(`players/` + this.playerId).update({ status, timestamp: this.timestamp });
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
      switchMap(user => user ? connection : of('offline')),
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
    if (this.playerId && this.playerId != '') {
      return this.db.object(`players/` + this.playerId).query.ref.onDisconnect()
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

  unsetOrievntation() {
    window.removeEventListener('deviceorientation', (e) => {
      this.orientation = { y: 0, z: 0, status: 'success' };
    });
  }

  setOrientation() {
    return new Promise<any>((resolve, reject) => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', (e) => {
                this.orientation.y = Math.round(e.beta);
                this.orientation.z = Math.round(e.gamma);
                this.orientation.status = 'success';

                if (this.orientation.y > 10 || this.orientation.y < -10 || this.orientation.z > 10 || this.orientation.z < -10) {
                  this.setPresence('moved');
                }
                else {
                  if(this.status != 'online') {
                    this.setPresence('online');
                  }
                }

                resolve('success');
              });
            }
            else {
              reject('failed');
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', (e) => {
          this.orientation.y = Math.round(e.beta);
          this.orientation.z = Math.round(e.gamma);
          this.orientation.status = 'success';

          if (this.orientation.y > 10 || this.orientation.y < -10 || this.orientation.z > 10 || this.orientation.z < -10) {
            this.setPresence('moved');
          }
          else {
            this.setPresence('online');
          }

          resolve('success');
        });
      }
    });
  }
}
