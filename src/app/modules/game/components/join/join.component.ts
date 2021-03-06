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
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  game: Game;
  players: Player[];
  group: Group;

  canBeStarted: boolean = false;
  isAdmin: boolean = false;

  user: User;
  player: Player;
  playerId: string;

  errorContent: string = '';

  constructor(private authService: AuthService, private userService: UserService, private gameService: GameService, private router: Router, private route: ActivatedRoute, private presence: PresencessService) {
    this.game = new Game();
    this.user = new User();
    this.group = new Group();
    this.player = new Player();
  }

  ngOnInit() {
    this.user = this.userService.getUserInfo();

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.playerId = params.get('player');

        console.log(this.user);
        this.gameService.getPlayer(this.playerId).valueChanges().subscribe(player => {
          this.player = player;
          console.log(this.player);
          if (this.user.uid != this.player.uid) {
            this.router.navigate(['/not-found']);
            return false;
          }
        });

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

  onJoin() {

    this.presence.noSleep.enable();
    this.presence.setOrientation().then(data => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.locationSuccess.bind(this), this.locationError.bind(this));
      } else {
        this.errorContent = 'Geolocation is not supported by this browser.';
      }
    }, err => {
      this.errorContent = 'You need to provide all the neccessory permission to join the game, please read game instructions carefully.'
    });
  }

  locationSuccess(position: any) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    if (lat.toFixed(1) == this.game.lat.toFixed(1) && lon.toFixed(1) == this.game.lon.toFixed(1)) {
      this.presence.playerId = this.playerId;
      this.presence.setPresence('online');
      this.router.navigate(['/game/play/' + this.game.key + '/' + this.playerId]);
    }
    else {
      this.errorContent = 'You need to at the same location as the game admin to play this game.'
    }
    // console.log(lat.toFixed(1) +':'+ lon.toFixed(1));
    // console.log(this.game.lat.toFixed(1) +':'+ this.game.lon.toFixed(1));

    // if (lat.toFixed(1) == this.game.lat.toFixed(1) && lon.toFixed(1) == this.game.lon.toFixed(1)) {
    //   this.presence.noSleep.enable();
    //   this.presence.setOrientation().then(data => {
    //     this.presence.playerId = this.playerId;
    //     this.presence.setPresence('online');
    //     this.router.navigate(['/game/play/' + this.game.key + '/' + this.playerId]);
    //   }, err => {
    //     alert(err);
    //     this.errorContent = 'You need to provide all the neccessory permission to join the game, please read game instructions carefully.'
    //   });
    // }
    // else {
    //   this.errorContent = 'You need to at the same location as the game admin to play this game.'
    // }
  }

  locationError() {
    this.errorContent = 'You need to provide all the neccessory permission to join the game, please read game instructions carefully.'
  }
}
