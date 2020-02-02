import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/shared/services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Player, Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  game: Game;
  player: Player;

  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute) {
    this.game = new Game();
    this.player = new Player();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.gameService.getPlayer(params.get('id')).valueChanges().subscribe(player => {
          this.player = player;
          this.player.key = params.get('id');

          this.gameService.getGame(this.player.gameId).valueChanges().subscribe(game => {
            this.game = game;
            this.game.key = this.player.gameId;

            // console.log(this.player);
            // console.log(this.game);
          });
        });
      }
    });
  }

  onAccept() {
    this.gameService.joinGame(this.player.key, {joined: true})
      .then(res => {
        this.router.navigate(['/game/play/' + this.game.key]);
      }, err => {
        //console.log(err);
      });
  }
}
