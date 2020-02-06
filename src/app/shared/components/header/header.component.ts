import { Component, OnInit, Input } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() centerLogo: boolean;

  constructor() { }

  ngOnInit() {

  }

  openMenu() {
    jQuery('.menu_cover').addClass('active');
    
    // jQuery('.menu_icon .burger_ico').hide(function(){
      
    //   //console.log('demo');
    // });
  }

  closeMenu(){
    jQuery('.menu_cover').removeClass('active');
  }

}
