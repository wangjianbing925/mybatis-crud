/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/
App.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            } else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '.' + subName;
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        return query.length ? query.substr(0, query.length - 1) : query;
    };
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
    $httpProvider.defaults.timeout = 15000;
}])
App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
        'use strict';
        // Set the following to true to enable the HTML5 Mode
        $locationProvider.html5Mode(false);
        
        $urlRouterProvider.otherwise('/app/dashboard');
        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('fastclick', 'moment', 'datetimepicker', 'angular-carousel', 'filestyle', 'oitozero.ngSweetAlert', 'modernizr', 'icons', 'screenfull', 'animo', 'slimscroll', 'classyloader', 'whirl')
            })
            .state('app.dashboard', {
                url: '/dashboard',
                title: '首页',
                templateUrl: helper.basepath('dashboard.html'),
                resolve: helper.resolveFor('echarts')
            })
            .state('app.bgUser', {
                url: '/bgUser',
                title: '后台用户管理',
                templateUrl: helper.basepath('bgUser/list.html')
            })
            .state('app.bgUser-add', {
                url: '/bgUser/add',
                title: '后台用户添加',
                controller: 'BgUserAddController',
                templateUrl: helper.basepath('bgUser/template.html')
            })
            .state('app.bgUser-update', {
                url: '/bgUser/:id/update',
                title: '后台用户修改',
                controller: 'BgUserUpdateController',
                templateUrl: helper.basepath('bgUser/template.html')
            })
            .state('app.bgUser-password', {
                url: '/bgUser/password',
                title: '修改密码',
                templateUrl: helper.basepath('bgUser/password.html')
            })
            .state('app.bgRole', {
                url: '/bgRole',
                title: '角色管理',
                templateUrl: helper.basepath('bgRole/list.html')
            })
            .state('app.bgRole-add', {
                url: '/bgRole/add',
                title: '角色添加',
                controller: 'BgRoleAddController',
                templateUrl: helper.basepath('bgRole/template.html')
            })
            .state('app.bgRole-update', {
                url: '/bgRole/:id/update',
                title: '角色修改',
                controller: 'BgRoleUpdateController',
                templateUrl: helper.basepath('bgRole/template.html')
            })
            .state('app.province', {
                url: '/province',
                title: '省份管理',
                templateUrl: helper.basepath('province/list.html')
            })
            .state('app.province-add', {
                url: '/province/add',
                title: '添加省份',
                controller: 'ProvinceAddController',
                templateUrl: helper.basepath('province/template.html')
            })
            .state('app.province-update', {
                url: '/province/:id/update',
                title: '修改省份',
                controller: 'ProvinceUpdateController',
                templateUrl: helper.basepath('province/template.html')
            })
            .state('app.examType', {
                url: '/examType',
                title: '考试类型管理',
                templateUrl: helper.basepath('examType/list.html')
            })
            .state('app.examType-add', {
                url: '/examType/add',
                title: '添加考试类型',
                controller: 'ExamTypeAddController',
                templateUrl: helper.basepath('examType/template.html')
            })
            .state('app.examType-update', {
                url: '/examType/:id/update',
                title: '修改考试类型',
                controller: 'ExamTypeUpdateController',
                templateUrl: helper.basepath('examType/template.html')
            })
            .state('app.course', {
                url: '/course',
                title: '课程管理',
                templateUrl: helper.basepath('course/list.html')
            })
            .state('app.course-add', {
                url: '/course/add',
                title: '添加课程',
                controller: 'CourseAddController',
                templateUrl: helper.basepath('course/template.html')
            })
            .state('app.course-update', {
                url: '/course/:id/update',
                title: '修改课程',
                controller: 'CourseUpdateController',
                templateUrl: helper.basepath('course/template.html')
            })
            .state('app.course-chapter', {
                url: '/course/:courseId/chapter',
                title: '添加课程',
                controller: 'ChapterController',
                templateUrl: helper.basepath('chapter/list.html')
            })
            .state('app.chapter', {
                url: '/chapter',
                title: '章节管理',
                controller: 'ChapterController',
                templateUrl: helper.basepath('chapter/list.html')
            })
            .state('app.chapter-add', {
                url: '/chapter/add',
                title: '添加章节',
                controller: 'ChapterAddController',
                templateUrl: helper.basepath('chapter/template.html')
            })
            .state('app.chapter-update', {
                url: '/chapter/:id/update',
                title: '修改章节',
                controller: 'ChapterUpdateController',
                templateUrl: helper.basepath('chapter/template.html')
            })
            .state('app.question', {
                url: '/question',
                title: '试题管理',
                controller: 'QuestionController',
                templateUrl: helper.basepath('question/list.html')
            })
            .state('app.question-add', {
                url: '/question/add',
                title: '添加试题',
                controller: 'QuestionAddController',
                templateUrl: helper.basepath('question/template.html')
            })
            .state('app.question-update', {
                url: '/question/:id/update',
                title: '修改试题',
                controller: 'QuestionUpdateController',
                templateUrl: helper.basepath('question/template.html')
            })

    }]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        'use strict';

        // registering components after bootstrap
        App.controller = $controllerProvider.register;
        App.directive = $compileProvider.directive;
        App.filter = $filterProvider.register;
        App.factory = $provide.factory;
        App.service = $provide.service;
        App.constant = $provide.constant;
        App.value = $provide.value;

    }]).config(['$translateProvider', function ($translateProvider) {

}]).config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

}]).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';

}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}])
;
