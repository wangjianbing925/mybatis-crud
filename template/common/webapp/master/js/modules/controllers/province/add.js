
App.controller('ProvinceAddController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'Province', function ($scope, $state, $modal, Notify, helper, Province) {
    $scope.pageTitle = '添加';
    $scope.submitted = false;
    $scope.model = {
        isDel: 0
    }
    $scope.validateInput = function (name, type) {
        var input = $scope.formValidate[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };
    $scope.submitForm = function () {
        $scope.submitted = true;
        if ($scope.formValidate.$valid) {
            Province.save($scope.model).then(function () {
                Notify.alert('添加成功', {status: 'success'});
                $state.go('app.province')
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }
    $scope.selectMenu = function (menu, subMenu) {
        if (subMenu.isChecked) {
            menu.isChecked = true
        }
    }

}])
