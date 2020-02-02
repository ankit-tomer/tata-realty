import { Component, OnInit } from '@angular/core';
import { countDownTimerConfigModel, countDownTimerTexts, CountdownTimerService } from 'ngx-timer';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/shared/services/game.service';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.component.html',
  styleUrls: ['./prepare.component.css']
})
export class PrepareComponent implements OnInit {

  timerConfig: countDownTimerConfigModel;
  game: Game;

  playerId: string;

  constructor(private countdownTimerService: CountdownTimerService, private gameService: GameService, private router: Router, private route: ActivatedRoute) {
    this.game = new Game();
  }

  ngOnInit() {

    //countUpTimerConfigModel
    this.timerConfig = new countDownTimerConfigModel();

    //custom class
    this.timerConfig.timerClass = 'test_Timer_class';

    //timer text values  
    this.timerConfig.timerTexts = new countDownTimerTexts();
    this.timerConfig.timerTexts.hourText = " hrs."; //default - hh
    this.timerConfig.timerTexts.minuteText = " mins."; //default - mm
    this.timerConfig.timerTexts.secondsText = " secs."; //default - ss

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.playerId = params.get('player');

        this.gameService.getGame(params.get('id')).valueChanges().subscribe(game => {
          this.game = game;
          this.game.key = params.get('id');

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
          cdate.setSeconds(cdate.getSeconds() + 16);
          this.countdownTimerService.startTimer(cdate);

          this.countdownTimerService.onTimerStatusChange.subscribe(status => {
            if (status && status == 'STOP') {
              this.gameService.startGame(this.game.key, { status: 'started' })
                .then(res => {
                  this.router.navigate(['/game/start/' + this.game.key + '/' + this.playerId]);
                }, err => {
                  //console.log(err);
                });
            }
          });

        });
      }
    });
  }

}
