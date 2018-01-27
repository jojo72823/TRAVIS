<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <link rel="shortcut icon" type="image/x-icon" href="https://production-assets.codepen.io/assets/favicon/favicon-8ea04875e70c4b0bb41da869e81236e54394d63638a1ef12fa558a4a835f1164.ico">
        <link rel="mask-icon" type="" href="https://production-assets.codepen.io/assets/favicon/logo-pin-f2d2b6d2c61838f7e76325261b7195c27224080bc099486ddd6dccb469b8e8e6.svg" color="#111">
        <title>TRAVIS - login</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet prefetch" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.css">

        <style class="cp-pen-styles">html, body, .container {
                width: 100%;
                height: 100%;
            }

            .container,
            /*            .overlay_logo:before,*/
            .overlay:before {
                background: url("images/fond.jpg") no-repeat fixed 0 0/cover;
            }
            .overlay_logo:before {
                background-color: rgba(255,255,255,0.2);
                /*background: url("images/fond.jpg") no-repeat fixed 0 0/cover;*/
            }

            .container {
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
            }

            .overlay {
                max-height: 50vh;
                z-index: 0;
            }

            .overlay:before {
                content: '';
                -webkit-filter: blur(00px);
                filter: blur(10px);
                height: 50vh;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                z-index: -1;
            }
            .overlay_logo {
                max-height: 50vh;
                z-index: 0;
                background-color: white
            }

            .overlay_logo:before {
                content: '';
                -webkit-filter: blur(100px);
                filter: blur(100px);
                height: 50vh;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                z-index: -1;
            }
        </style>


    </head>
    <body class="part_body" >
        <div class="container">
           
            <!--            <div class="overlay">
                            <h1>A blurred overlay</h1>
                            <p>... mask or whatever<br>that is responsive and could be cross-browser compatible back to IE9</p>
                        </div>-->
            <div class="row " >
                <!--Absolute-Center-->
                <div class=" is-Responsive">

                    <div class="col-lg-6 part_logo overlay_logo" >
                        <img class="center" src="images/travis.png"/>
                    </div>

                    <div class="col-lg-6 part_login overlay">
                        <form action="php/login.php" class="center" id="formulaireLogin" method="POST">
                            <div class="form-group text-center text_title">LOGIN</div>
                            <div class="form-group input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input name="login" required="" class="form-control" type="text" name='Username' placeholder="username"/>          
                            </div>
                            <div class="form-group input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <input name="password" class="form-control" type="password" name='password' placeholder="password"/>     
                            </div>
                            <div class="form-group">
                                <button  type="submit" class="btn btn-def btn-block">Login</button>

                            </div>

                        </form>       
                    </div>
                </div>    
            </div>
        </div>
        <script src="//production-assets.codepen.io/assets/editor/live/check-c263eb37bf3a3d49b8311c096168b478f5750c61a1166ea2cc660498870d671f.js"></script>
    </body>
</html>
