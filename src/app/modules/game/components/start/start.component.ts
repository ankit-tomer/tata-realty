import { Component, OnInit, OnDestroy } from '@angular/core';
import { countUpTimerConfigModel, timerTexts, CountupTimerService } from 'ngx-timer';
import { Game, Player } from 'src/app/interfaces/game';
import { GameService } from 'src/app/shared/services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Group } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PresencessService } from 'src/app/shared/services/presencess.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {

  timerConfig: countUpTimerConfigModel;
  game: Game;
  group: Group;

  user: User;
  player: Player;
  playerId: string;
  groupScore: number;

  presence$;

  playerSub: Subscription;
  groupSub: Subscription;
  presenceSub: Subscription;
  gameSub: Subscription;

  constructor(private countupTimerService: CountupTimerService, private authService: AuthService, private userService: UserService, private gameService: GameService, private router: Router, private route: ActivatedRoute, private presence: PresencessService) {
    this.game = new Game();
    this.group = new Group();
    this.player = new Player();
  }

  ngOnInit() {
    this.user = this.userService.getUserInfo();

    //countUpTimerConfigModel
    this.timerConfig = new countUpTimerConfigModel();

    //custom class
    this.timerConfig.timerClass = 'test_Timer_class';

    //timer text values  
    this.timerConfig.timerTexts = new timerTexts();
    this.timerConfig.timerTexts.hourText = " hrs."; //default - hh
    this.timerConfig.timerTexts.minuteText = " mins."; //default - mm
    this.timerConfig.timerTexts.secondsText = " secs."; //default - ss

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.playerId = params.get('player');

        this.playerSub = this.gameService.getPlayer(this.playerId).valueChanges().subscribe(player => {
          this.player = player;
        });

        this.presence.playerId = this.playerId;
        this.presence.gameStarted = true;
        this.presence$ = this.presence.getPresence(this.playerId);

        let cdate = new Date();
        cdate.setHours(cdate.getHours());
        cdate.setSeconds(cdate.getSeconds());
        this.countupTimerService.startTimer(cdate);
        //this.noSleep.enable();

        this.gameSub = this.gameService.getGame(params.get('id')).valueChanges().subscribe(game => {
          this.game = game;
          this.game.key = params.get('id');

          this.getGroup();

          this.presenceSub = this.presence$.subscribe(pres => {

            if (pres.status != 'online' && this.game.status != 'over') {

              this.presence.noSleep.disable();
              this.countupTimerService.pauseTimer();
              this.presence.unsetOrievntation();

              let gameScore = {
                status: 'over',
                endedById: this.user.uid,
                endedByName: this.player.name,
                score: this.countupTimerService.timerValue.hours + ':' + this.countupTimerService.timerValue.mins + ':' + this.countupTimerService.timerValue.seconds,
                scoreSeconds: this.countupTimerService.totalSeconds
              }

              let totalScore: number = 0;
              totalScore = this.groupScore + gameScore.scoreSeconds;

              //console.log(totalScore);

              this.gameService.startGame(this.game.key, gameScore)
                .then(res => {
                  this.userService.updateGroup(this.group.key, { totalScore: totalScore })
                    .then(res => {
                      let createdAt: Date = new Date();
                      this.userService.updateScore(this.group.key, { name: this.group.name, gender: this.group.gender, createdAt: createdAt.toLocaleDateString(), score: gameScore.scoreSeconds, gameId: this.game.key })
                        .then(res2 => {
                          this.countupTimerService.stopTimer();
                          this.router.navigate(['/game/over/' + this.game.key + '/' + this.playerId]);
                          return false;
                        });
                    });
                }, err => {
                  //console.log(err);
                });
            }
          });

          // if(this.presence$.status != 'online') {
          //   console.log(this.presence$.status);
          // }

          switch (this.game.status) {
            case 'created':
              break;
            case 'prepared':
              this.router.navigate(['/game/prepare/' + this.game.key + '/' + this.playerId]);
              break;
            case 'started':
              this.router.navigate(['/game/start/' + this.game.key + '/' + this.playerId]);
              break;
            case 'over':
              this.router.navigate(['/game/over/' + this.game.key + '/' + this.playerId]);
              break;
          }

        });
      }
    });
  }

  getGroup() {
    this.userService.getGroupsbyUid(this.game.uid).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(groups => {
      this.group = groups[0];
      if (this.group.totalScore) {
        this.groupScore = this.group.totalScore;
      }
      else {
        this.groupScore = 0;
      }
    });
  }

  ngOnDestroy() {
    console.log('left page');
    // prevent memory leak when component destroyed
    this.presenceSub.unsubscribe();
    this.playerSub.unsubscribe();
    this.gameSub.unsubscribe();
    this.presence.unsetOrievntation();
  }
}
