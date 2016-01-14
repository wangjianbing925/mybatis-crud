<%@ page language="java" pageEncoding="UTF-8" %>
<%@include file="/common/common.jsp" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>教师考试宝管理系统</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href="${ctx}/vendor/fontawesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="${ctx}/build/css/bootstrap.css" rel="stylesheet">
    <link href="${ctx}/build/css/app.css" rel="stylesheet">
    <script src="${ctx}/build/js/base.js"></script>
    <style>
        html {
            height: 100%;
        }

        body {
            background: url(./static/bg.jpg) center no-repeat;
            background-size: cover;
        }
        .modal {
            display: none;
            background-color: #ddd;
            background-color: rgba(0,0,0,.3);
        }
        .login-form {
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            padding: 25px;
            min-width: 300px;
            width: 420px;
            background: #fff;
            text-align: center;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            -ms-border-radius: 15px;
            -o-border-radius: 15px;
            border-radius: 15px;
            -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
            -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        .login-form legend {
            padding-bottom: 10px;
        }

        .login-form .fa {
            right: inherit;
            top: 0;
        }

        .has-feedback .form-control {
            padding-right: 0;
            padding-left: 43.75px;
        }

        .has-feedback .text-danger {
            display: block;
            text-align: left;
        }

        @media (max-width: 768px) {
            .login-form {
                width: 40%;
            }
        }
        .modal-dialog {
            width: 600px!important;
        }
    </style>
</head>
<body ng-app="dadaSportsApp" ng-show="complate" ng-controller="LoginController" ng-keypress="keyPress($event)">
<form id="loginForm" class="form login-form mb-lg" action="${ctx }/user/login" method="post"
      id="loginForm">
    <legend>登陆</legend>
    <div class="form-group has-feedback">
        <input id="loginName" type="text" name="loginName" placeholder="输入用户名"
               autocomplete="off" ng-model="account.loginName" class="form-control">
        <span class="fa fa-user form-control-feedback text-muted"></span>
                <span ng-show="usernameError"
                      class="text-danger ng-hide">请输入用户名</span>
    </div>
    <div class="form-group has-feedback">
        <input id="password" type="password" name="password" placeholder="输入密码"
               ng-model="account.password" class="form-control">
        <span class="fa fa-lock form-control-feedback text-muted"></span>
        <span ng-show="passwordError" class="text-danger ng-hide">请输入密码</span>
    </div>
    <div class="clearfix">
        <div class="checkbox c-checkbox pull-left mt0">
            <label>
                <input type="checkbox" value="" name="remember" ng-model="account.remember">
                <span class="fa fa-check"></span>记住用户名和密码</label>
        </div>
    </div>
    <div class="text-danger mb-lg" ng-show="loginFilure">{{loginFilureInfo}}</div>
    <button type="button" ng-click="login()" class="btn btn-block btn-success bg-lg mt-lg">登陆</button>

</form>
<div class="modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="exampleModalLabel">温馨提示</h4>
            </div>
            <div class="modal-body">
                为了更好的体验，推荐使用Chrome浏览器对进行操作
            </div>
            <div class="modal-footer">
                <a href="http://dlsw.baidu.com/sw-search-sp/soft/9d/14744/ChromeStandalone_V45.0.2454.101_Setup.1443151805.exe" class="btn btn-success">下载Chrome浏览器</a>
            </div>
        </div>
    </div>
</div>
<script>
    var isIE = function(ver){
        var b = document.createElement('b')
        b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
        return b.getElementsByTagName('i').length === 1
    }
    if (isIE(9) || isIE(8) || isIE(7) || isIE(6)) {
        var modal = document.querySelector('.modal');
        modal.classList.add('in');
        modal.classList.add('fade');
        modal.style.display = 'block';
        document.getElementById('loginForm').style.display = 'none';
    }
    var dadaSportsApp = angular.module('dadaSportsApp', []);
    dadaSportsApp.controller('LoginController', ['$scope', function ($scope) {
        $scope.account = {};
        $scope.complate = true;
        $scope.loginFilure = false;
        if (localStorage.getItem('loginName')) {
            $scope.account.loginName = localStorage.getItem('loginName');
        }
        if (localStorage.getItem('password')) {
            $scope.account.password = localStorage.getItem('password');
        }
        $scope.keyPress = function (event) {
            if(event.charCode == 13){
                $scope.login()
            }
        }
        $scope.login = function () {
            if (!$scope.account.loginName) {
                $scope.usernameError = true;
                return
            }
            if (!$scope.account.password) {
                $scope.passwordError = true;
                return
            }
            if ($scope.account.remember) {
                localStorage.setItem('loginName', $scope.account.loginName)
                localStorage.setItem('password', $scope.account.password)
            }
            $.post('${ctx}/bg/login/in', $scope.account).then(function (result) {
                if(result.statusCode == 20011011){
                    location.href = '${ctx}/index.jsp'
                }else{
                    $scope.$apply(function () {
                        $scope.loginFilure = true;
                        $scope.loginFilureInfo = result.msg;
                    })
                }
            })
        }
    }]);
</script>
</body>
</html>