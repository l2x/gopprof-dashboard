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
    <title>My AngularJS App</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="app.build.css">
</head>

<body>
    <md-toolbar class="md-whiteframe-glow-z1 header">
        <div class="md-toolbar-tools">
            <md-sidenav class="md-sidenav-left" md-is-locked-open="true">

            </md-sidenav>
            <ul layout="row" layout-align="start center" class="menu">
                <li><a href="#!/view1">stats</a></li>
                <li><a href="#!/view2">pprof</a></li>
                <li><a href="#!/view3">setting</a></li>
            </ul>
            <span flex></span>
            <md-button class="md-icon-button" aria-label="More">
                <md-icon md-svg-icon="img/icons/more_vert.svg"></md-icon>
            </md-button>
        </div>
    </md-toolbar>

    <md-content layout="row" class="md-padding pt0">
        <div flex style="position:relative">
            <div class="nodes-toolbar" layout="row" layout-align="start center">
                <md-input-container md-no-float class="md-block">
                    <input placeholder="Filter">
                </md-input-container>
                <span> | <span>
                <a href="javascript:void(0)" >全选</a>
            </div>
            <md-tabs md-border-bottom md-autoselect md-dynamic-height class="md-tabs-ms">
                <md-tab label="nodes">
                    <md-list class="clearfix">
                        <md-list-item class="md-list-item-h30 nodes-item">
                            <md-checkbox class="md-primary md-checkbox-ms"></md-checkbox>
                            <p>127.0.0.1</p>
                        </md-list-item>
                        <md-list-item class="md-list-item-h30 nodes-item">
                            <md-checkbox class="md-primary md-checkbox-ms"></md-checkbox>
                            <p>192.168.101.100:8080</p>
                        </md-list-item>
                        <md-list-item class="md-list-item-h30 nodes-item">
                            <md-checkbox class="md-primary md-checkbox-ms"></md-checkbox>
                            <p>192.168.101.100:8080</p>
                        </md-list-item>

                    </md-list>
                </md-tab>
                <md-tab label="tags">
                    <div class="">
                        <ul>
                            <li>127.0.0.1</li>
                            <li>127.0.0.2</li>
                        </ul>
                    </div>
                </md-tab>
            </md-tabs>
        </div>

        <div flex="20" class="ml20">
            <md-list class="options-list">
                <md-subheader class="md-no-sticky">options</md-subheader>
                <md-list-item class="md-list-item-h30">
                    <p>goroutines</p>
                    <md-checkbox class="md-secondary md-primary"></md-checkbox>
                </md-list-item>
                <md-list-item class="md-list-item-h30">
                    <md-checkbox class="md-secondary md-primary"></md-checkbox>
                    <p>heap</p>

                </md-list-item>
                <md-list-item class="md-list-item-h30">
                    <p>block</p>
                    <md-checkbox class="md-secondary md-primary"></md-checkbox>
                </md-list-item>
            </md-list>
        </div>
    </md-content>

    <div ng-view class="content"></div>

    <!--
    <div class="footer">
        <div>Angular seed app: v<span app-version></span></div>
        </div>
        -->
        <script src="app.build.js"></script>
</body>

</html>
