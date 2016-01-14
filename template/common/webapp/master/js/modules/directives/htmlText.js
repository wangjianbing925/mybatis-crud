App.directive('htmlText', ['RouteHelpers', 'Notify', function (helper, Notify) {
    return {
        restrict: 'EA',
        templateUrl: helper.basepath('public/html-text.html'),
        replace: true,
        scope: true,
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            var textBody = element.find('.body')
            scope.hideInsertInput = attrs.type == 2;
            ngModel.$render = function () {
                if (!ngModel.$isEmpty(ngModel.$viewValue)) {
                    textBody.html(ngModel.$viewValue)
                }
            }
            var fileEle = element.find('input[type="file"]')
            fileEle.on('change', function () {
                var formData = new FormData()
                formData.append('imgFile', this.files[0])
                var xhr = new XMLHttpRequest();
                xhr.open('POST', uploadPath)
                xhr.onload = function () {
                    scope.$apply(function () {
                        Notify.hideLoading()
                    })
                    var result = JSON.parse(xhr.responseText)
                    if (result.statusCode == 20011011) {
                        textBody.append(angular.element('<img src="'+imgPath + result.data.fileUrl+'">'))
                        ngModel.$setViewValue(textBody.html())
                    } else {
                        Notify.alert(result.msg, {status: 'danger'})
                    }
                }
                scope.$apply(function () {
                    Notify.showLoading()
                })
                xhr.send(formData)
            })
            scope.insertInput = function () {
                textBody.append(angular.element('<input type="text">'))
                ngModel.$setViewValue(textBody.html())
            }
            scope.bodyChange = function () {
                ngModel.$setViewValue(textBody.html())
            }
        }
    }
}])
