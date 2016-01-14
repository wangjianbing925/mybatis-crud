App.controller('BgUserAddController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'BgUser', 'BgRole', function ($scope, $state, $modal, Notify, helper, BgUser, BgRole) {
    $scope.pageTitle = '新增';
    BgRole.all().then(function (data) {
        var roles = []
        angular.forEach(data.bgRoles, function (role) {
            if(role.id != 1){
                roles.push(role)
            }
        })
        $scope.bgRoles = roles;
    })
    $scope.submitted = false;
    $scope.validateInput = function (name, type) {
        var input = $scope.formValidate[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };
    $scope.submitForm = function () {
        $scope.submitted = true;
        if ($scope.formValidate.$valid) {
            BgUser.save($scope.model).then(function () {
                Notify.alert('添加成功', {status: 'success'});
                $state.go('app.bgUser')
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }

}])