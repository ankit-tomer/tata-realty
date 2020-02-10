import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { Group, User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {

  group: Group;
  user: User;

  showDaily: boolean = true;
  showGrand: boolean = false;

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

  openDaily() {
    jQuery('#Grand_tab').removeClass('active');
    jQuery('#Daily_tab').addClass('active');
    jQuery('.gra_opt').removeClass('active');
    jQuery('.dai_opt').addClass('active');
    this.showDaily = false;
    this.showGrand = true;
    // jQuery('.menu_icon .burger_ico').hide(function(){
      
    //   //console.log('demo');
    // });
  }

  openGrand(){
    jQuery('#Daily_tab').removeClass('active');
    jQuery('#Grand_tab').addClass('active');
    jQuery('.dai_opt').removeClass('active');
    jQuery('.gra_opt').addClass('active');
    this.showDaily = true;
    this.showGrand = false;
  }

}
