import { Component, OnInit } from '@angular/core';
import { countUpTimerConfigModel, timerTexts, CountupTimerService } from 'ngx-timer';
import { Game, Player } from 'src/app/interfaces/game';
import { GameService } from 'src/app/shared/services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Group } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PresencessService } from 'src/app/shared/services/presencess.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  timerConfig: countUpTimerConfigModel;
  game: Game;
  group: Group;

  user: User;
  player: Player;
  playerId: string;

  presence$;

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

        this.gameService.getPlayer(this.playerId).valueChanges().subscribe(player => {
          this.player = player;
        });

        this.presence.playerId = this.playerId;
        this.presence$ = this.presence.getPresence(this.playerId);

        this.gameService.getGame(params.get('id')).valueChanges().subscribe(game => {
          this.game = game;
          this.game.key = params.get('id');

          this.presence$.subscribe(pres => {
            console.log(pres);
            if (pres.status != 'online') {
              console.log('ended');

              this.countupTimerService.pauseTimer();

              // this.countupTimerService.getTimerValue().subscribe(time => {
              //   console.log('time: ' + time);
              // });
              console.log('totalSeconds: ' + this.countupTimerService.totalSeconds);
              console.log('timerValue: ' + this.countupTimerService.timerValue.hours + ':' + this.countupTimerService.timerValue.mins + ':' + this.countupTimerService.timerValue.seconds);

              let gameScore = {
                status: 'over',
                endedById: this.user.uid,
                endedByName: this.player.name, 
                score: this.countupTimerService.timerValue.hours + ':' + this.countupTimerService.timerValue.mins + ':' + this.countupTimerService.timerValue.seconds,
                scoreSeconds: this.countupTimerService.totalSeconds
              }

              console.log(gameScore);

              this.gameService.startGame(this.game.key, gameScore)
                .then(res => {
                  this.router.navigate(['/game/over/' + this.game.key + '/' + this.playerId]);
                  return false;
                }, err => {
                  //console.log(err);
                });
            }
          });
          // if(this.presence$.status != 'online') {
          //   console.log(this.presence$.status);
          // }

          this.userService.getGroupsbyUid(this.game.uid).valueChanges().subscribe(groups => {
            this.group = groups[0];
          });

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

          let cdate = new Date();
          cdate.setHours(cdate.getHours());
          cdate.setSeconds(cdate.getSeconds());
          this.countupTimerService.startTimer(cdate);

        });
      }
    });
  }

}
