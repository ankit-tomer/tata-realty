import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery(document).ready(function () {
      jQuery(window).bind('load', function () {
        setTimeout(function () {
          jQuery('#preloader_cov').fadeOut();
        }, 1000);
      });

      // jQuery('header a.close_me').click(function () {
      //   jQuery('.menu_cover').removeClass('active');
      //   jQuery('header a.close_me').hide(function(){
      //     jQuery('.menu_icon .burger_ico').fadeIn();
      //   });
      // });

    });
  }

}
