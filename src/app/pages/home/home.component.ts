import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides = [
<<<<<<< HEAD
    { img: "assets/img/home_bg_01.png", title: 'Phone Time Family Time', description: 'Turn time-away-from-phone to quality-time-with-your-loved-ones.' },
    { img: "assets/img/home_bg_02.png", title: 'Put your phone down. See the world #NoFilter.', description: 'Start up a card game. Dig into some banter.Enjoy some unplugged family moments.' },
    { img: "assets/img/home_bg_03.png", title: 'Winners get prizes.Losers get warm hugs.', description: 'Keep phones aside. Spend time with family. Stand a chance to win goodies.Simple.' },
=======
    { img: "assets/img/home_bg_1.png", title: 'Get off the Phone to get closer', description: 'Users register on the microsite through social login. Send request to their partner through SMS/email. All group members need to accept the request to pair phone numbers.' },
    { img: "assets/img/home_bg_2.png", title: 'Measures your time of togetherness', description: 'Users register on the microsite through social login. Send request to their partner through SMS/email. All group members need to accept the request to pair phone numbers.' },
    { img: "assets/img/home_bg_3.png", title: 'Get a chance to win exiting prizes', description: 'Users register on the microsite through social login. Send request to their partner through SMS/email. All group members need to accept the request to pair phone numbers.' },
>>>>>>> aa4ad757ed99ebad9fba528c74cc2202a8928d90
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
