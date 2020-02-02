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
      <title>Phone Chodo | Home</title>
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
   	
      <div class="wrapper regi_bg">
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
         <div class="container">
         	<div class="logo_main text-center">
              <a href="#">
                <img src="img/main_logo.png" class="img-fluid" alt="">
              </a>  
           </div>
           
            <div class="main row">
                <div class="family_patch regi_fami_patch col-10 offset-1">
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

                 <div class="blue_texture start_ablue col-12">
                    <img src="img/blue-bg.png" class="overlay" alt="">
                    <div class="inner_cov">
                       <h3 class="intro_txt">Aneesh lifted his phone. Your current score. </h3>
                <div class="timer_patch">
                  <div class="time_block">
                    <p>HR.</p>
                    <h1>
                      02:
                    </h1>
                  </div>
                  <div class="time_block">
                    <p>MIN.</p>
                    <h1>
                      43:
                    </h1>
                  </div>
                  <div class="time_block">
                    <p>SEC.</p>
                    <h1>
                      43
                    </h1>
                  </div>

                  <div class="timer_txt">
                    <h3>OF TOGETHERNES</h3>
                  </div> 
                </div>
                
                <div class="col-12 text-center">
                  <button class="get_start">
                      Start Again &nbsp; <i class="fa fa-caret-right"></i>
                  </button>  
                </div>

                <p>&nbsp;</p>
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