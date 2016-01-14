App.directive('bgImage', function () {
    function getImageUrl(url, width, height){
        if (!url || url == 'null') {
            return contextPath + '/resources/app/img/default.png';
        }
        if(url.indexOf('http://') == 0){
            return url;
        }
        return url;
    }
    return {
        restrict: 'EA',
        template: '<div class="image"><img></div>',
        replace: true,
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            console.info(element[0].clientWidth)
            var rate = 1;
            if(attrs.height && attrs.width){
                rate = attrs.height/attrs.width;
            }
            element.css('height', rate*element.width())
            ngModel.$render = function () {
                if (!ngModel.$isEmpty(ngModel.$viewValue)) {
                    element.css('backgroundImage', 'url(' + getImageUrl(ngModel.$viewValue, attrs.width, attrs.height) + ')')
                    element.find('img').attr('src', getImageUrl(ngModel.$viewValue, attrs.width, attrs.height))
                }
            }
            element.find('img').on('error', function () {
                element.css('backgroundImage', 'url('+contextPath + '/resources/app/img/default.png)')
            })
        }
    }
})
