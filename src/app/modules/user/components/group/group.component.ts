import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Group, GroupMember, User } from 'src/app/interfaces/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group;
  user: User;
  groupMembers: GroupMember[];

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private route: ActivatedRoute) { 
    this.group = new Group();
    this.user = new User();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.userService.getGroupById(params.get('id')).valueChanges().subscribe(group => {
          this.group = group;
          this.group.key = params.get('id');
          this.getMembers();
        });
      }
    });
  }

  getMembers() {
    this.userService.getMembers(this.group.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(members => {
      //console.log(users)
      this.groupMembers = members;
    });
  }

  goToDashboard() {
    this.router.navigate(['/user']);
  }

}
