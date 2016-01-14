App.controller('UserPasswordController', ['$scope', '$state', '$modal', 'RouteHelpers', 'Notify', 'BgUser', function ($scope, $state, $modal, helper, Notify, BgUser) {
    $scope.model = {}
    $scope.submitted = false;
    $scope.validateInput = function (name, type) {
        var input = $scope.formValidate[name];
        var flag = (input.$dirty || $scope.submitted) && input.$error[type];
        if (flag) {
        }
        return flag;
    };
    $scope.submitForm = function () {
        $scope.submitted = true;
        if ($scope.formValidate.$valid) {
            BgUser.updatePwd($scope.model).then(function () {
                Notify.alert('密码修改成功', {status: 'success'});
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }
}])