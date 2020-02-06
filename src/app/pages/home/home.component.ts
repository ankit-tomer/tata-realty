import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides = [
    { img: "assets/img/home_bg_01.png", title: 'Phone Time or Family Time.', description: 'That moment when –‘time-away-from-phone’turns to‘quality-time-with-loved-ones' },
    { img: "assets/img/home_bg_02.png", title: 'Step up your game!It\'s that simple.Literally.', description: 'Phone chodo Dil jodo step by step' },
    { img: "assets/img/home_bg_03.png", title: 'Put your phone down. Connect with loved ones.', description: 'Start up a card game. Dig into a banter. Enjoy some unplugged moments.' },
  ];
  slideConfig = {
    dots: false,
    infinite: true,
    arrows: false,
    // speed: 2000,
    // fade: true,
    autoplay: true
    //autoplaySpeed: 2000,  
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

  onGetStarted() {
    this.router.navigate(['/sign-up']);
  }

}
