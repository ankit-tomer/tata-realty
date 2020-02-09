import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/user.service';
import { User, GroupMember, Group } from 'src/app/interfaces/user';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PresencessService } from 'src/app/shared/services/presencess.service';
import { GameService } from 'src/app/shared/services/game.service';
import { Router } from '@angular/router';
import { Game, Player } from 'src/app/interfaces/game';
import { SmsService } from 'src/app/shared/services/sms.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  group: Group;
  member: GroupMember;
  groupMembers: GroupMember[];

  canBePlayed: boolean = false;
  inviteUrl: string;

  gameId: string;
  adminPlayerId: string;

  constructor(private authService: AuthService, private userService: UserService, public toastrService: ToastrService, private gameService: GameService, private router: Router, private presence: PresencessService, private smsService: SmsService) {
    this.member = new GroupMember();
    this.group = new Group();
  }

  ngOnInit() {
    //this.user = this.authService.getAccount();
    this.user = this.userService.getUserInfo();
    // console.log(this.user);
    // console.log(this.group);
    this.getGroups();
  }

  onSubmit() {
    this.member.isAdmin = false;
    this.member.groupId = this.group.key;

    if (!this.memberExists(this.member.phone)) {
      this.userService.createMember(this.member)
        .then(res => {
          this.smsService.sendSms({ to: this.member.phone, message: environment.baseUrl+'/sign-up/by-invite/'+res.key })
            .subscribe(
              (res) => {
                this.toastrService.success('Invitation sent successfully.', 'Invite');
                this.member = new GroupMember();
              },
              (err) => {
                this.toastrService.error(err, 'Invite');
              }
            );

          this.inviteUrl = environment.baseUrl+'/sign-up/by-invite/' + res.key;
          //console.log(res);

        }, err => {
          this.toastrService.error(err.message, 'Invite');
          //console.log(err);
        });
    }
    else {
      this.toastrService.error('Member already exists.', 'Invite');
    }

  }

  memberExists(phone: string): boolean {
    let memberExists: boolean = false;
    for (var member of this.groupMembers) {
      if (member.phone == phone) {
        memberExists = true;
      }
    }
    return memberExists;
  }

  onSubmitGroup() {
    this.group.uid = this.user.uid;
    this.group.gender = this.user.gender;
    this.group.totalScore = 0;
    this.userService.createGroup(this.group)
      .then(res => {
        this.group.key = res.key;

        this.member.groupId = this.group.key;
        this.member.isAdmin = true;
        this.member.name = this.user.fullName;
        this.member.phone = this.user.phone;
        this.member.uid = this.user.uid;

        this.userService.createMember(this.member)
          .then(res3 => {
            this.toastrService.success('Group created successfully.', 'Group');
            this.member = new GroupMember();
          }, err => {
            //console.log(err);
          });

      }, err => {
        this.toastrService.error(err.message, 'Group');
        //console.log(err);
      });
  }

  getGroup() {
    this.group = this.userService.getGroup();
  }

  getGroups() {
    this.userService.getGroupsbyUid(this.user.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(groups => {
      //console.log(groups[0]);
      if (groups.length > 0) {
        this.group = groups[0];
        this.getMembers();
      }
    });
  }

  getMembers() {
    this.userService.getMembers(this.group.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(members => {
      //console.log(members)
      this.groupMembers = members;

      let count: number = 0;

      for (var member of this.groupMembers) {
        if (member.uid) {
          count++;
        }
      }

      if (count > 1) {
        this.canBePlayed = true;
      }

    });
  }

  onPlay() {

    let game: Game = new Game();
    game.uid = this.user.uid;
    game.status = 'created';

    this.gameService.createGame(game)
      .then(res => {

        this.gameId = res.key;

        for (var member of this.groupMembers) {
          if (member.uid) {

            let player: Player = new Player();
            player.uid = member.uid;
            player.isAdmin = member.isAdmin ? true : false;
            player.name = member.name;
            player.gameId = res.key;
            let receipant: any = { to: member.phone, message: '' };

            this.gameService.createPlayer(player)
              .then(res2 => {

                if (player.isAdmin) {
                  this.adminPlayerId = res2.key;
                  this.presence.playerId = res2.key;
                  this.presence.setPresence('online');
                }
                else {
                  receipant.message = environment.baseUrl+'/game/join/' + player.gameId + '/' + res2.key;
                  //console.log(receipant);
                  //send invite to join the game
                  this.smsService.sendSms(receipant)
                    .subscribe(
                      (res3) => {
                        receipant = { to: '', message: '' }
                        //console.log(res3);
                      },
                      (err) => {
                      }
                    );
                }


              }, err => {
                //console.log(err);
              });
          }
        }

        setTimeout(this.goToGamePlay.bind(this), 1000);

      }, err => {
        //console.log(err);
      });
  }

  goToGamePlay() {
    this.router.navigate(['/game/play/' + this.gameId + '/' + this.adminPlayerId]);
  }

}
