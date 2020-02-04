import { Component, OnInit, Input } from '@angular/core';
import { Group, User } from 'src/app/interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-score',
  templateUrl: './my-score.component.html',
  styleUrls: ['./my-score.component.css']
})
export class MyScoreComponent implements OnInit {

  @Input() group: Group;
  @Input() user: User;

  constructor(private userService: UserService) { 
    
  }

  ngOnInit() {
    //console.log(this.user);
  }

  secondsToTime(secs: number) {
    let measuredTime = new Date(null);
    measuredTime.setSeconds(secs); // specify value of SECONDS
    let MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  }
}
