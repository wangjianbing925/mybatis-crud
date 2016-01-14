App.controller('BgRoleAddController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'BgRole', 'Menu', function ($scope, $state, $modal, Notify, helper, BgRole, Menu) {
    $scope.pageTitle = '添加';
    $scope.submitted = false;
    Menu.getTop().then(function (datas) {
        $scope.menus = datas.menus;
    })

    $scope.validateInput = function (name, type) {
        var input = $scope.formValidate[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };
    $scope.submitForm = function () {
        $scope.submitted = true;
        if ($scope.formValidate.$valid) {
            BgRole.save($scope.model).then(function (role) {
                var menuIds = []
                angular.forEach($scope.menus, function (menu) {
                    if(menu.isChecked){
                        menuIds.push(menu.id)
                    }
                    if(menu.subMenus){
                        angular.forEach(menu.subMenus, function (subMenu) {
                            if(subMenu.isChecked){
                                menuIds.push(subMenu.id)
                            }
                        })
                    }
                })
                BgRole.saveMenu(role.id, menuIds).then(function () {
                    Notify.alert('添加成功', {status: 'success'});
                    $state.go('app.bgRole')
                })
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }
    $scope.selectMenu = function (menu, subMenu) {
        if(subMenu.isChecked){
            menu.isChecked = true
        }
    }

}])