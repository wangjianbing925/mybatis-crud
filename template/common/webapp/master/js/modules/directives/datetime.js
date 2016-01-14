App.directive('datetime', ['RouteHelpers', function (helper) {
    return {
        restrict: 'EA',
        templateUrl: helper.basepath('public/datetime.html'),
        replace: true,
        require: '?ngModel',
        link: function ($scope, element, attrs, ngModel) {
            element.find('.form-control').attr('placeholder', attrs.title)
            var datetimepicker = element.datetimepicker({
                language: 'zh-CN',
                format: attrs.format || 'yyyy-mm-dd hh:ii',
                todayHighlight: false,
                autoclose: attrs.autoClose || true,
                todayBtn: true,
                startDate: attrs.startDate,
                pickerPosition: attrs.position || 'bottom-left',
                weekStart: attrs.weekStart || 1,
                startView: attrs.startView || 2,
                minView: attrs.minView || 2,
                maxView: attrs.maxView || 4,
                forceParse: 0
            }).on('changeDate', function (ev) {
                ngModel.$setViewValue(ev.date.valueOf()-8*60*60*1000)
                element.find('.custom-close').show()
                $scope.chageDate && $scope.chageDate(ev.date.valueOf(), attrs.ngModel)
            })
            element.find('.custom-close').on('click', function (event) {
                event.stopPropagation()
                element.find('.form-control').val('')
                element.find('.custom-close').hide()
                ngModel.$setViewValue(null)
            })
            ngModel.$render = function () {
                if (!ngModel.$isEmpty(ngModel.$viewValue)) {
                    $scope.showClose = true;
                    datetimepicker.datetimepicker('setDate', new Date(ngModel.$viewValue));
                }
            }
        }
    }
}])