App.controller('ExamTypeUpdateController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'ExamType', 'Province', function ($scope, $state, $modal, Notify, helper, ExamType, Province) {
    $scope.pageTitle = '修改';

    ExamType.get($state.params.id).then(function (result) {
        $scope.model = result;
    })
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
                Notify.alert('修改成功', {status: 'success'});
                $state.go('app.examType')
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }

}])