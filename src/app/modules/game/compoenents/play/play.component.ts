import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PresencessService } from 'src/app/shared/services/presencess.service';
import { Game, Player } from 'src/app/interfaces/game';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User, Group } from 'src/app/interfaces/user';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  game: Game;
  players: Player[];
  group: Group;

  canBeStarted: boolean = false;
  isAdmin: boolean = false;

  user: User;
  playerId: string;

  constructor(private authService: AuthService, private userService: UserService, private gameService: GameService, private router: Router, private route: ActivatedRoute, private presence: PresencessService) {
    this.game = new Game();
    this.user = new User();
    this.group = new Group();
  }

  ngOnInit() {
    this.user = this.userService.getUserInfo();

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.playerId = params.get('player');
        this.presence.playerId = this.playerId;

        this.gameService.getGame(params.get('id')).valueChanges().subscribe(game => {
          this.game = game;
          this.game.key = params.get('id');

          if (this.user.uid == this.game.uid) {
            this.isAdmin = true;
          }

          this.getPlayers();

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

        });
      }
    });
  }

  getPlayers() {
    this.gameService.getPlayers(this.game.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(players => {
      // console.log(players)
      this.players = players;

      let count: number = 0;

      for (let player of players) {
        if (player.status == 'online') {
          count++;
        }
      }

      if (count > 1) {
        this.canBeStarted = true;
      }
      else {
        this.canBeStarted = false;
      }

      //console.log(this.canBeStarted);
    });
  }

  onStart() {
    this.gameService.startGame(this.game.key, { status: 'prepared' })
      .then(res => {
        this.router.navigate(['/game/prepare/' + this.game.key + '/' + this.playerId]);
      }, err => {
        //console.log(err);
      });
  }

}
