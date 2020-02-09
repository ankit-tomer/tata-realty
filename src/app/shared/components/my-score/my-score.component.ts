import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Group, User } from 'src/app/interfaces/user';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-score',
  templateUrl: './my-score.component.html',
  styleUrls: ['./my-score.component.css']
})
export class MyScoreComponent implements OnInit {

  @Input() group: Group;
  @Input() user: User;

  groups: Group[];
  groupScore: string;
  currentPosition: number;

  constructor(private userService: UserService) { 
    
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(changes);
    if(changes.group.currentValue.name) {
      this.groupScore = this.secondsToTime(this.group.totalScore);
      this.getCurrentPosition(this.group);
    }
  }

  ngOnInit() {
    
  }

  secondsToTime(secs: number) {
    let measuredTime = new Date(null);
    measuredTime.setSeconds(secs); // specify value of SECONDS
    let MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  }

  getCurrentPosition(group: Group) {
    this.userService.getGroups().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(groups => {
      this.groups = groups.reverse();
      console.log(groups);
      let pos: number = 0;
      for (let group of this.groups) {
        pos++;
        if (group.key == group.key) {
          //console.log(pos);
          this.currentPosition = pos;
          //return false;
        }
      }
    });
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
