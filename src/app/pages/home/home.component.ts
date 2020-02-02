import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides = [
    { img: "/tata-realty/assets/img/home_bg_1.png", title: 'Get off the Phone to get closer', description: 'Users register on the microsite through social login. Send request to their partner through SMS/email. All group members need to accept the request to pair phone numbers.' },
    { img: "/tata-realty/assets/img/home_bg_2.png", title: 'Measures your time of togetherness', description: 'Users register on the microsite through social login. Send request to their partner through SMS/email. All group members need to accept the request to pair phone numbers.' },
    { img: "/tata-realty/assets/img/home_bg_3.png", title: 'Get a chance to win exiting prizes', description: 'Users register on the microsite through social login. Send request to their partner through SMS/email. All group members need to accept the request to pair phone numbers.' },
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
