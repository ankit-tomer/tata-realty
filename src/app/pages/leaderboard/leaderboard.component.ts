import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { map } from 'rxjs/operators';
import { Group, User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  groups: Group[];
  group: Group;
  user: User;

  constructor(private userService: UserService) {
    this.group = new Group();
  }

  ngOnInit() {
    this.user = this.userService.getUserInfo();
    if(this.user.uid && this.user.uid != null) {
      this.userService.getGroupsbyUid(this.user.uid).valueChanges().subscribe(groups => {
        this.group = groups[0];
      });
    }
    this.userService.getLeaderboard().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(groups => {
      this.groups = groups;
    });
  }

  secondsToTime(secs: number) {
    let measuredTime = new Date(null);
    measuredTime.setSeconds(secs); // specify value of SECONDS
    let MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  }

  getOrdinalSuffix(i: number) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return "st";
    }
    if (j == 2 && k != 12) {
      return "nd";
    }
    if (j == 3 && k != 13) {
      return "rd";
    }
    return "th";
  }
}
