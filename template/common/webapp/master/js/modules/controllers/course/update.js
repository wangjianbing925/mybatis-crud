App.controller('CourseUpdateController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'Course', function ($scope, $state, $modal, Notify, helper, Course) {
    $scope.pageTitle = '添加';
    $scope.submitted = false;
    Course.get($state.params.id).then(function (data) {
        $scope.model = data;
    })
    $scope.validateInput = function (name, type) {
        var input = $scope.formValidate[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };
    $scope.submitForm = function () {
        $scope.submitted = true;
        if ($scope.formValidate.$valid) {
            Course.save($scope.model).then(function () {
                Notify.alert('修改成功', {status: 'success'});
                $state.go('app.course')
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }

    $scope.$on('imgUpload', function (event, file) {
        $scope.$apply(function () {
            $scope.model.icon = file;
        })
    })
}])
