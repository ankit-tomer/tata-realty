import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Game, Player } from 'src/app/interfaces/game';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private dbPathGames = '/games';
  private dbPathPlayers = '/players';
  gamesRef: AngularFireList<Game>;
  playersRef: AngularFireList<Player>;

  game: Game;
  player: Player;
  gamePlayers: Player[];

  constructor(private userService: UserService, private db: AngularFireDatabase) { 
    this.gamesRef = db.list(this.dbPathGames);
    this.playersRef = db.list(this.dbPathPlayers);
    
    this.game = new Game();
    this.player = new Player();
  }

  createGame(game: Game) {
    return new Promise<any>((resolve, reject) => {
      const ref = this.gamesRef.push(game)
        .then(res => {
          resolve(res);
          //console.log(res)
        }, err => reject(err))
    });
  }

  createPlayer(player: Player) {
    return new Promise<any>((resolve, reject) => {
      const ref = this.playersRef.push(player)
        .then(res => {
          resolve(res);
          //console.log(res)
        }, err => reject(err))
    });
  }

  startGame(key: string, value: any) {
    return this.gamesRef.update(key, value);
  }

  joinGame(key: string, value: any) {
    return this.playersRef.update(key, value);
  }

  getGame(key: string): AngularFireObject<Game> {
    return this.db.object(this.dbPathGames +'/'+ key);
  }

  getPlayer(key: string): AngularFireObject<Player> {
    return this.db.object(this.dbPathPlayers +'/'+ key);
  }

  getPlayers(gameId: string): AngularFireList<Player> {
    this.playersRef = this.db.list(this.dbPathPlayers, ref => ref.orderByChild('gameId').equalTo(gameId));
    return this.playersRef;
  }
}
