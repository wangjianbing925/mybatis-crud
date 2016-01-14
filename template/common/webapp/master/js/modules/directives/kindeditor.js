App.directive('kindeditor', [function () {
    return {
        restrict: 'EA',
        template: '<textarea class="form-control" rows="5"></textarea>',
        replace: true,
        require: '?ngModel',
        link: function ($scope, element, attrs, ngModel) {
            element.attr('id', attrs.id)
            var options = {
                uploadJson: uploadPath,
                minHeight: 250,
                target: true
            };
            var kinEditor = KindEditor.create('#'+attrs.id, options);
            $scope.$emit("kinEditorCreate", kinEditor, attrs.id);
            ngModel.$render = function () {
                if (!ngModel.$isEmpty(ngModel.$viewValue)) {
                    kinEditor.html(ngModel.$viewValue)
                }
            }
        }
    }
}])