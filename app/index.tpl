<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" ng-app="myApp" class="no-js">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>gopprof dashboard</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="global.css">
</head>

<body>
    <!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->
    <div class=" navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="javascript:void(0)"></a>
            </div>
            <div class="navbar-collapse collapse navbar-responsive-collapse">
                <ul class="nav navbar-nav">
                    <li active-link="active"><a href="#/pprof">Profiling</a></li>
                    <li active-link="active"><a href="#/stats">Stats</a></li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown"  active-link="active" data-prefix="#/setting">
                        <a href="javascript:void(0);" data-target="#" class="dropdown-toggle" data-toggle="dropdown">Setting
                          <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href="#/setting">Profile&Stats</a></li>
                            <li><a href="#/setting/goroot">Goroot</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    </div>

    <div class="content container-fluid" ng-view></div>

    <script src="global.js"></script>
    <script src="app.js"></script>
</body>

</html>
