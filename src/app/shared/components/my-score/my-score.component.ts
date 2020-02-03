import { Component, OnInit, Input } from '@angular/core';
import { Group, User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-my-score',
  templateUrl: './my-score.component.html',
  styleUrls: ['./my-score.component.css']
})
export class MyScoreComponent implements OnInit {

  @Input() group: Group;
  @Input() user: User;

  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.user);
  }

}
