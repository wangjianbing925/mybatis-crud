App.directive('image', function () {
    return {
        restrict: 'EA',
        template: '<img>',
        replace: true,
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$render = function () {
                if (!ngModel.$isEmpty(ngModel.$viewValue)) {
                    element.attr('src', ngModel.$viewValue)
                }
            }
            element.on('error', function () {
                element.attr('src', contextPath + '/bg/build/img/default.jpg')
            })
        }
    }
})
