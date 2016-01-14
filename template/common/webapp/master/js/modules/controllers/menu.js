App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils', 'Notify', 'Menu',
    function ($rootScope, $scope, $state, $http, $timeout, Utils, Notify, Menu) {

        var collapseList = [];

        $rootScope.$watch('app.layout.asideHover', function (oldVal, newVal) {
            if (newVal === false && oldVal === true) {
                closeAllBut(-1);
            }
        });

        var isActive = function (item) {

            if (!item) return;

            if (!item.sref || item.sref == '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function (value, key) {
                    if (isActive(value)) foundActive = true;
                });
                return foundActive;
            } else {
                return $state.is(item.sref) || $state.includes(item.sref);
            }
        };

        $scope.gotoMenu = function (item) {
            if (item.sref) {
                $state.go(item.sref)
            }
        }
        $scope.getMenuItemPropClasses = function (item) {
            return (item.heading ? 'nav-heading' : '') +
                (isActive(item) ? ' active' : '');
        };
        Menu.getTop().then(function (datas) {
            var sideMenus = []
            angular.forEach(datas.menus, function (menu) {
                if (menu.subMenus && menu.subMenus.length > 0) {
                    var newMenu = {
                        text: menu.menuName,
                        icon: menu.icon,
                        submenu: [],
                        translate: menu.menuName
                    }
                    angular.forEach(menu.subMenus, function (subMenu) {
                        newMenu.submenu.push({
                            text: subMenu.menuName,
                            icon: subMenu.icon,
                            sref: subMenu.actionUrl,
                            translate: subMenu.menuName
                        })
                    })
                    sideMenus.push(newMenu)
                } else {
                    sideMenus.push({
                        text: menu.menuName,
                        sref: menu.actionUrl,
                        icon: menu.icon,
                        label: "label label-info",
                        translate: menu.menuName
                    })
                }
            })
            $scope.menuItems = sideMenus;
        })
        $scope.addCollapse = function ($index, item) {
            collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
        };

        $scope.isCollapse = function ($index) {
            return (collapseList[$index]);
        };

        $scope.toggleCollapse = function ($index, isParentItem) {


            // collapsed sidebar doesn't toggle drodopwn
            if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) return true;

            // make sure the item index exists
            if (angular.isDefined(collapseList[$index])) {
                if (!$scope.lastEventFromChild) {
                    collapseList[$index] = !collapseList[$index];
                    closeAllBut($index);
                }
            }
            else if (isParentItem) {
                closeAllBut(-1);
            }

            $scope.lastEventFromChild = isChild($index);

            return true;

        };

        function closeAllBut(index) {
            index += '';
            for (var i in collapseList) {
                if (index < 0 || index.indexOf(i) < 0)
                    collapseList[i] = true;
            }
        }

        function isChild($index) {
            return (typeof $index === 'string') && !($index.indexOf('-') < 0);
        }

    }]);
