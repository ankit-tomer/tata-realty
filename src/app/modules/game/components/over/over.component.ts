import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { GameService } from 'src/app/shared/services/game.service';
import { Game, Player } from 'src/app/interfaces/game';
import { User, Group } from 'src/app/interfaces/user';

@Component({
  selector: 'app-over',
  templateUrl: './over.component.html',
  styleUrls: ['./over.component.css']
})
export class OverComponent implements OnInit {

  game: Game;
  group: Group;
  user: User;
  player: Player;
  playerId: string;
  score = [];

  constructor(private authService: AuthService, private userService: UserService, private gameService: GameService, private router: Router, private route: ActivatedRoute) {
    this.game = new Game();
    this.group = new Group();
    this.player = new Player();
  }

  ngOnInit() {

    //window.location.reload();

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

          let score: string = this.game.score;
          this.score = score.split(':');
          //let arrayScore = score.split(':');
          //console.log(this.score);

          this.userService.getGroupsbyUid(this.game.uid).valueChanges().subscribe(groups => {
            this.group = groups[0];
          });

        });
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/user']);
  }

}
