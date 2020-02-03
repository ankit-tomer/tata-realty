import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/shared/services/game.service';
import { Game, Player } from 'src/app/interfaces/game';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.component.html',
  styleUrls: ['./prepare.component.css']
})
export class PrepareComponent implements OnInit {

  game: Game;

  user: User;
  player: Player;

  playerId: string;

  constructor(private authService: AuthService, private userService: UserService, private gameService: GameService, private router: Router, private route: ActivatedRoute) {
    this.game = new Game();
    this.user = new User();
    this.player = new Player();
  }

  ngOnInit() {

    this.user = this.userService.getUserInfo();

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.playerId = params.get('player');

        this.gameService.getPlayer(this.playerId).valueChanges().subscribe(player => {
          this.player = player;
        });

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
        });
      }
    });
  }


  handleEvent(e) {
    if(e.left == 0) {
      this.gameService.startGame(this.game.key, { status: 'started' })
      .then(res => {
        this.router.navigate(['/game/start/' + this.game.key + '/' + this.playerId]);
        console.log('started');
      }, err => {
        //console.log(err);
      });
    }
  }
}
