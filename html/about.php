<!doctype html>
<html lang="en">
   <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css" />
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
      <link rel="stylesheet" href="css/style.css">
      <title>Phone Chodo | About</title>
   </head>
   <body >
   	<div id="preloader_cov">
   		<div class="inner">
   			<div class="preloader_bar">
			  <!-- <div class="preloader_circle"></div>
			  <p>Loading</p> -->
           		<!-- <img src="img/animated-horse-gif-45.gif" class="img-fluid" alt=""> -->
			</div>		
   		</div>
   	</div>

    <div class="menu_cover">
         <ul>
            <li>
               <a href="about.php">About</a>
            </li>

            <li>
               <a href="how_to_play.php">How to play</a>
            </li>

            <li>
               <a href="rules.php">Rules and regulations</a>
            </li>

            <li>
               <a href="leader_board.php">Leaderboard</a>
            </li>

            <li>
               <a href="prizes.php">Prizes</a>
            </li>

            <li>
               <a href="winners.php">Winners</a>
            </li>

            <li>
               <a href="terms.php">Terms and Conditions</a>
            </li>
         </ul>
         <a href="#" class="close_me">
            <i class="fa fa-close"></i>
         </a>
      </div>
   	
      <div class="wrapper leader_bg">
         <header>
            <div class="container">
              <div class="logo_right">
                  <a href="index.html">
                     <img src="img/tata_realty_logo.svg" class="img-fluid" alt="">   
                  </a>
               </div>
               <div class="burger_icon menu_icon">
                  <a href="#">
                     <img src="img/menu_icon.png" class="img-fluid" alt="">   
                  </a>
               </div>    
            </div>
         </header>

          <div class="family_patch regi_fami_patch leader_fam_patch col-10 offset-1">
             <div class="inner">
               <div class="img_cov" style=" background: url(./img/male_profile.jpg) no-repeat 100% 100%; 
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;"
                >
                 
               </div>
               <p class="name"><span>Poipkar’s Family</span> <br/><span> 48:43:51</span> </p>
               <span class="numb pull-right">09<sup>th</sup></span>
             </div>
           </div>
         <div class="container">
         	
           
         
           <div class="in_out_time col-10 offset-1">
             <div class="theme_blue txt">TODAYS TIME:</div>
             <div><span>&nbsp; HR. &nbsp;&nbsp;&nbsp;&nbsp; MIN. &nbsp;&nbsp;&nbsp;&nbsp; SEC.</span><br/> 02:19:45</div>
             <div class="theme_blue txt">TOTAL TIME:</div>
             <div><span>&nbsp; HR. &nbsp;&nbsp;&nbsp;&nbsp; MIN. &nbsp;&nbsp;&nbsp;&nbsp; SEC.</span> <br/> 29:12:33</div>
           </div>
            <div class="main row blue_texture">
              <div class="container leader_board_cov">
                <h3 class="text-center title text-uppercase">About Us</h3>
                <div class="leader_scroll abut_txt">
                  <div class="col-10 offset-1">
                    <p>
                      If there’s one thing that is affecting relationships everywhere, it is the mobile phone. </p>

                    <p>The constant scrolling, pings, updates and notifications churner has found a place in our dinner tables, bedrooms, and bathrooms. To tackle this we create a special microsite that syncs the phones of all the people participating, measures their time of togetherness and tests the will of their love. </p>

                    <p>The constant scrolling, pings, updates and notifications churner has found a place in our dinner tables, bedrooms, and bathrooms. To tackle this we create a special microsite that syncs the phones of all the people participating, measures their time of togetherness and tests the will of their love. 

                    </p>
                  </div>  
                </div>
                
              </div>
                

            </div>
         </div>
      </div>
      <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"crossorigin="anonymous"></script>
      <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js"></script>	      

      <script>
         $(document).ready(function(){	

	        $(window).bind('load',function(){
	        	setTimeout(function(){
	         		$('#preloader_cov').fadeOut();	
	         	},1000);	
	        });

	         $('.menu_icon a').click(function(){
                 $('.menu_cover').addClass('active'); 
           });

           $('.menu_cover a.close_me').click(function(){
                 $('.menu_cover').removeClass('active'); 
           });  

	      }); 
      </script> 
   </body>
</html>