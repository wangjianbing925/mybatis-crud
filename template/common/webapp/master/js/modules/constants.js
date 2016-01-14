/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
    .constant('APP_COLORS', {
        'primary': '#5d9cec',
        'success': '#27c24c',
        'info': '#23b7e5',
        'warning': '#ff902b',
        'danger': '#f05050',
        'inverse': '#131e26',
        'green': '#37bc9b',
        'pink': '#f532e5',
        'purple': '#7266ba',
        'dark': '#3a3f51',
        'yellow': '#fad732',
        'gray-darker': '#232735',
        'gray-dark': '#3a3f51',
        'gray': '#dde6e9',
        'gray-light': '#e4eaec',
        'gray-lighter': '#edf1f2'
    })
    .constant('APP_MEDIAQUERY', {
        'desktopLG': 1200,
        'desktop': 992,
        'tablet': 768,
        'mobile': 480
    })
    .constant('APP_REQUIRES', {
        // jQuery based and standalone scripts
        scripts: {
            'whirl': ['vendor/whirl/dist/whirl.css'],
            'classyloader': ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
            'animo': ['vendor/animo.js/animo.js'],
            'fastclick': ['vendor/fastclick/lib/fastclick.js'],
            'modernizr': ['vendor/modernizr/modernizr.js'],
            'animate': ['vendor/animate.css/animate.min.css'],
            'icons': ['vendor/fontawesome/css/font-awesome.min.css',
                '//at.alicdn.com/t/font_1446022361_252144.css'],
            'sparklines': ['app/vendor/sparklines/jquery.sparkline.min.js'],
            'wysiwyg': ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
            'slimscroll': ['vendor/slimScroll/jquery.slimscroll.min.js'],
            'screenfull': ['vendor/screenfull/dist/screenfull.js'],
            'moment': ['vendor/moment/min/moment-with-locales.min.js'],
            'inputmask': ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],
            'taginput': ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
            'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
            'parsley': ['vendor/parsleyjs/dist/parsley.min.js'],
            'loaders.css': ['vendor/loaders.css/loaders.css'],
            'spinkit': ['vendor/spinkit/css/spinkit.css']
        },
        // Angular based script (use the right module name)
        modules: [
            {
                name: 'localytics.directives', files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                'vendor/chosen_v1.2.0/chosen.min.css',
                'vendor/angular-chosen-localytics/chosen.js']
            },
            {
                name: 'ngDialog', files: ['vendor/ngDialog/js/ngDialog.min.js',
                'vendor/ngDialog/css/ngDialog.min.css',
                'vendor/ngDialog/css/ngDialog-theme-default.min.css']
            },
            {
                name: 'ngImgCrop', files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']
            },{
                name: 'angular-carousel', files: ['vendor/angular-carousel/dist/angular-carousel.css',
                'vendor/angular-carousel/dist/angular-carousel.js']
            },
            {
                name: 'textAngular', files: ['vendor/textAngular/dist/textAngular.css',
                'vendor/textAngular/dist/textAngular-rangy.min.js',
                'vendor/textAngular/dist/textAngular-sanitize.js',
                'vendor/textAngular/src/globals.js',
                'vendor/textAngular/src/factories.js',
                'vendor/textAngular/src/DOM.js',
                'vendor/textAngular/src/validators.js',
                'vendor/textAngular/src/taBind.js',
                'vendor/textAngular/src/main.js',
                'vendor/textAngular/dist/textAngularSetup.js'
            ], serie: true
            },
            {
                name: 'oitozero.ngSweetAlert', files: ['vendor/sweetalert/dist/sweetalert.css',
                'vendor/sweetalert/dist/sweetalert.min.js',
                'vendor/angular-sweetalert/SweetAlert.js']
            },
            {
                name: 'datetimepicker',
                files: [
                    'vendor/smalot-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css',
                    'vendor/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.js',
                    'vendor/smalot-bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js',
                ],
                serie: true
            },
            {
                name: 'echarts',
                files: ['http://echarts.baidu.com/build/dist/echarts.js']
            }
        ]
    })
;