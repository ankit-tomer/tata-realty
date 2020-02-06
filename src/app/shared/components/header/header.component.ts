import { Component, OnInit, Input } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() centerLogo: boolean;

  showMenuIcon: boolean = true;
  showCloseIcon: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  openMenu() {
    jQuery('.menu_cover').addClass('active');
    this.showMenuIcon = false;
    this.showCloseIcon = true;
    // jQuery('.menu_icon .burger_ico').hide(function(){
      
    //   //console.log('demo');
    // });
  }

  closeMenu(){
    jQuery('.menu_cover').removeClass('active');
    this.showMenuIcon = true;
    this.showCloseIcon = false;
  }

}
