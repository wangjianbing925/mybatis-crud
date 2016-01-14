App.controller('ExamTypeAddController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'ExamType', 'Province', function ($scope, $state, $modal, Notify, helper, ExamType, Province) {
    $scope.pageTitle = '新增';
    $scope.model = {
        status: 0,
        isDel: 0
    }
    Province.all().then(function (result) {
        $scope.provinces = result;
    })
    $scope.submitted = false;
    $scope.validateInput = function (name, type) {
        var input = $scope.formValidate[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };
    $scope.submitForm = function () {
        $scope.submitted = true;
        if ($scope.formValidate.$valid) {
            ExamType.save($scope.model).then(function () {
                Notify.alert('添加成功', {status: 'success'});
                $state.go('app.examType')
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }

}])