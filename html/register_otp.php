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
            	<div class="col-10 offset-1 text-center">
            		<h3 class="theme_blue">Welcome!</h3>
              		<p>Register your self as a admin for the game.</p>	
            	</div>
              	

              	<div class="col-10 offset-1">
              		<form action="" class="row regist_form">
              			<div class="form-group col-12">
              				<input type="text" class="form-control" placeholder="Type your OTP Number">
              			</div>
              			<div class="form-group col-12">
              				<div class="row">
              					<div class="col-6 padd_r0 text-left">
              						<button class="verify_btn">
		              					Submit OTP  <i class="fa fa-caret-right"></i>
		              				</button>
	              				</div>
	              				<div class="col-6 text-right">
              						<a href="#" class="reset_btn pull-right">
              							Resend OTP
              						</a>
	              				</div>
								<p>&nbsp;</p>
	              				<div class="col-12 text-center">
	              					<p>&nbsp;</p>
	              				</div>
								<p>&nbsp;</p>
								<p>&nbsp;</p>
	              				<div class="col-12 text-center">
	              					<a href="#" class="terms_link">Terms of service are the legal agreements between a service 
provider and a person who wants to use that service.</a>
	              				</div>
              				</div>
              				
              				
              			</div>
              		</form>
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