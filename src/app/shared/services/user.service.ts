import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User, Group, GroupMember } from 'src/app/interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPathGroups = '/groups';
  private dbPathGroupMembers = '/groupMembers';
  private dbPathusers = '/users';
  groupsRef: AngularFireList<Group>;
  groupsMembersRef: AngularFireList<GroupMember>;
  usersRef: AngularFireList<User>;

  group: Group;
  userInfo: User

  constructor(private authService: AuthService, private db: AngularFireDatabase) {
    this.groupsRef = db.list(this.dbPathGroups);
    this.groupsMembersRef = db.list(this.dbPathGroupMembers);
    this.usersRef = db.list(this.dbPathusers);

    if (localStorage.getItem('group')) {
      this.group = JSON.parse(localStorage.getItem('group'));
    }
    else {
      this.group = new Group();
    }

    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }
    else {
      this.userInfo = new User();
    }
  }

  createGroup(group: Group) {
    return new Promise<any>((resolve, reject) => {
      const ref = this.groupsRef.push(group)
        .then(res => {
          resolve(res);
          //console.log(res)
        }, err => reject(err))
    });
  }

  updateGroup(key: string, value: any): Promise<void> {
    return this.groupsRef.update(key, value);
  }

  setGroup(group: Group) {
    this.group = group;
    localStorage.setItem('group', JSON.stringify(this.group));
  }

  getGroup() {
    return this.group;
  }

  getGroupById(key: string): AngularFireObject<Group> {
    return this.db.object(this.dbPathGroups + '/' + key);
  }

  getGroupsbyUid(uid: string) {
    this.groupsRef = this.db.list(this.dbPathGroups, ref => ref.orderByChild('uid').equalTo(uid));
    return this.groupsRef;
  }

  createMember(groupMember: GroupMember) {
    return new Promise<any>((resolve, reject) => {
      const ref = this.groupsMembersRef.push(groupMember)
        .then(res => {
          resolve(res);
          //console.log(res)
        }, err => reject(err))
    });
  }

  getMembers(groupId: string): AngularFireList<GroupMember> {
    this.groupsMembersRef = this.db.list(this.dbPathGroupMembers, ref => ref.orderByChild('groupId').equalTo(groupId));
    return this.groupsMembersRef;
  }

  getMemberById(key: string): AngularFireObject<GroupMember> {
    return this.db.object(this.dbPathGroupMembers + '/' + key);
  }

  updateMember(key: string, value: any): Promise<void> {
    return this.groupsMembersRef.update(key, value);
  }

  createUser(user: User): Promise<void> {
    return this.db.object(`users/${user.uid}`).update({ fullName: user.fullName, gender: user.gender, phone: user.phone });
  }

  updateUser(uid: string, value: any): Promise<void> {
    return this.db.object(`users/${uid}`).update(value);
  }

  getUser(uid: string): AngularFireObject<User> {
    return this.db.object(`users/${uid}`);
  }

  setUser(user: User) {
    this.userInfo = user;
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

  getUserInfo() {
    return this.userInfo;
  }

  getUserByPhone(phone: string): AngularFireList<User> {
    this.usersRef = this.db.list(this.dbPathusers, ref => ref.orderByChild('phone').equalTo(phone));
    return this.usersRef;
  }

  getGroups(): AngularFireList<Group> {
    return this.db.list(this.dbPathGroups, ref => ref.orderByChild('totalScore').limitToLast(99999));
  }

  getLeaderboard(): AngularFireList<Group> {
    return this.db.list(this.dbPathGroups, ref => ref.orderByChild('totalScore').limitToLast(10));
  }

  getDailyLeaderboard(createdAt: string): AngularFireList<any> {
    return this.db.list('groupScores', ref => ref.orderByChild('createdAt').equalTo(createdAt).limitToLast(99999));
  }

  updateScore(groupId: string, value: any): Promise<void> {
    return this.db.object(`groupScores/${groupId}`).update(value);
  }
}
