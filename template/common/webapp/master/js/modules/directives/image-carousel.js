App.directive('imageCarousel', ['RouteHelpers', '$compile', function (helper, $compile) {
    return {
        restrict: 'EA',
        templateUrl: helper.basepath('public/image-carousel.html'),
        replace: false,
        link: function ($scope, element, attrs) {
            console.info($scope.imageDatas)
            var height = window.innerHeight - 60 - 67 - 64;
            $scope.height = height + 'px';
            element.find('.modal-body').css('height', height)
            element.find('.owl-carousel').css('height', height)
            var html = []
            angular.forEach($scope.imageDatas, function (image) {
                html.push('<div class="item" data-url="'+image+'" style="height:'+height+'px;background-image: url('+image+');"></div>')
            })
            element.find(".owl-carousel").html(html.join('')).owlCarousel({
                autoPlay: 3000,
                stopOnHover: true,
                paginationSpeed: 1000,
                goToFirstSpeed: 2000,
                singleItem: true
            });
            element.find('.item').on('click', function () {
                window.open(this.getAttribute('data-url'))
            })
            var headImageSwiper = element.find(".owl-carousel").data('owlCarousel');
            $scope.prev = function () {
                headImageSwiper.prev()
            }
            $scope.next = function () {
                headImageSwiper.next()
            }
        }
    }
}])
