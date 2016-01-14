App.controller('BgRoleUpdateController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'BgRole', 'Menu', function ($scope, $state, $modal, Notify, helper, BgRole, Menu) {
    $scope.pageTitle = '修改';
    $scope.submitted = false;
    BgRole.get($state.params.id).then(function (menu) {
        $scope.model = menu.bgRole;
        $scope.bgMenus = menu.bgMenus;
    })
    Menu.getTop().then(function (datas) {
        $scope.menus = datas.menus;
        angular.forEach($scope.menus, function (menu) {
            angular.forEach($scope.bgMenus, function (bgMenu) {
                if(menu.id == bgMenu.bgMenuId){
                    menu.isChecked = true;
                    return
                }
            })
            if(menu.subMenus){
                angular.forEach(menu.subMenus, function (subMenu) {
                    angular.forEach($scope.bgMenus, function (bgMenu) {
                        if(subMenu.id == bgMenu.bgMenuId){
                            subMenu.isChecked = true;
                            return
                        }
                    })
                })
            }
        })
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
                BgRole.saveMenu($scope.model.id, menuIds).then(function () {
                    Notify.alert('修改成功', {status: 'success'});
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