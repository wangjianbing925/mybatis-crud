App.directive('tableGrid', ['$http', 'RouteHelpers', '$compile', 'Result', function ($http, helper, $compile, Result) {
    function init(scope) {
        if (scope.gridOptions && scope.gridOptions.isCanSelect) {
            var column = {
                displayName: '选择',
                enableSorting: false,
                name: 'isChecked',
                width: 60,
                align: 'center',
                headCellTemplate: '<div class="checkbox c-checkbox" ng-click="selectAll($event)"><label><input type="checkbox" ng-checked="isCheckedAll" ><span class="fa fa-check"></span></label></div>',
                cellTemplate: '<div class="checkbox c-checkbox"><label><input type="checkbox" ng-checked="COL_FIELD" ><span class="fa fa-check"></span></label></div>'
            }
            scope.gridOptions.columnDefs && scope.gridOptions.columnDefs.splice(0, 0, column)
        }
        var totalWidth = 0;
        if (scope.gridOptions && scope.gridOptions.columnDefs) {
            for (var i = 0, j = scope.gridOptions.columnDefs.length; i < j; i++) {
                if (scope.gridOptions.columnDefs[i].width) {
                    totalWidth += scope.gridOptions.columnDefs[i].width;
                } else {
                    scope.gridOptions.columnDefs[i].width = 100;
                    totalWidth += 100;
                }
                scope.gridOptions.columnDefs[i].width = scope.gridOptions.columnDefs[i].width + 'px';
            }
        }
        scope.totalWidth = 'width:' + totalWidth + 'px;';
        initHeader(scope)
        initBody(scope)
        initFooter(scope)
        scope.pageChanged()
    }

    function initHeader(scope) {
        scope.sortClass = function (column) {
            if (column.sortBy == 'ASC') {
                return 'custom-iconshengxu'
            } else if (column.sortBy == 'DESC') {
                return 'custom-iconjiangxu'
            } else {
                return 'custom-paixu'
            }
        }
        scope.buttonClick = function (index) {
            var action = scope.gridOptions.buttons[index]['action'];
            if (action) {
                action()
            }
        }
        scope.sort = function (column, $event) {
            if (!column.sort) {
                return
            }
            angular.forEach(scope.gridOptions.columnDefs, function (columnDef) {
                if (columnDef.name != column.name) {
                    columnDef.sortBy = '';
                }
            })
            if (column.sortBy == 'DESC') {
                column.sortBy = 'ASC'
            } else {
                column.sortBy = 'DESC'
            }
            scope.gridOptions.sortBy = column.sortBy;
            scope.gridOptions.sortName = column.sortName;
            scope.bigCurrentPage = 1;
            scope.pageChanged()
        }
        scope.pressKey = function (event) {
            if (event.charCode == 13) {
                scope.query()
            }
        }
    }

    function initBody(scope) {
        scope.getSelected = function () {
            var selected = []
            for (var i = 0, j = scope.RowDatas.length; i < j; i++) {
                if (scope.RowDatas[i].isChecked) {
                    selected.push(scope.gridOptions.datas[i])
                }
            }
            return selected;
        }
        scope.getAllData = function () {
            return scope.gridOptions.datas;
        }
        scope.selectAll = function (event) {
            event.preventDefault()
            scope.isCheckedAll = !scope.isCheckedAll;
            angular.forEach(scope.RowDatas, function (row) {
                row.isChecked = scope.isCheckedAll;
                row.class = scope.isCheckedAll ? 'success' : '';
            })
        }
        scope.clickRow = function (data, event) {
            var $elm = angular.element(event.currentTarget)
            $elm.toggleClass('success')
            data.isChecked = $elm.hasClass('success');
            scope.isCheckedAll = scope.getSelected().length == scope.gridOptions.datas.length;
        }
        scope.query = function () {
            scope.pageSizeOpen = false;
            scope.bigCurrentPage = 1;
            scope.pageChanged()
        }
    }

    function initFooter(scope) {
        scope.maxSize = 5;
        scope.bigTotalItems = 1;
        scope.bigCurrentPage = scope.gridOptions.bigCurrentPage || 1;
        scope.bigPageSize = scope.gridOptions.bigPageSize || 10;
        scope.pageSizeOptions = [
            {
                key: 5,
                value: 5
            },
            {
                key: 10,
                value: 10
            },
            {
                key: 25,
                value: 25
            },
            {
                key: 50,
                value: 50
            }
        ]
        scope.chnageSize = function (size) {
            scope.pageSizeOpen = false;
            scope.bigPageSize = size;
            scope.bigCurrentPage = 1;
            scope.pageChanged()
        }
        scope.refresh = function () {
            scope.pageSizeOpen = false;
            scope.bigCurrentPage = 1;
            angular.forEach(scope.RowDatas, function (row) {
                row.class = '';
                row.isChecked = false;
            })
            angular.element('tr.success').removeClass('success')
            scope.isCheckedAll = false;
            scope.pageChanged()
        }
        function getSearchParams(searchParams, values, parent) {
            parent = (parent ? parent + '.' : '')
            angular.forEach(values, function (param, key) {
                if (angular.isObject(param) || angular.isArray(param)) {
                    getSearchParams(searchParams, param, parent + key)
                } else {
                    searchParams[parent + key] = param;
                }
            })
        }

        scope.pageChanged = function () {
            if (!scope.gridOptions || !scope.gridOptions.url) {
                return
            }
            if (!scope.params) {
                scope.params = {}
            }
            scope.params.pageSize = scope.bigPageSize;
            scope.params.pageFrom = scope.bigCurrentPage;
            scope.params.sortName = scope.gridOptions.sortName;
            scope.params.sortBy = scope.gridOptions.sortBy || 'desc';
            var url = scope.gridOptions.url;
            var searchParams = {}
            getSearchParams(searchParams, scope.params)
            angular.forEach(searchParams, function (param, key) {
                if (!param) {
                    return
                }
                if (url.indexOf('?') == -1) {
                    url += '?' + key + '=' + param;
                } else {
                    url += '&' + key + '=' + param;
                }
            })
            Result($http.get(url)).then(function (data) {
                scope.gridOptions.datas = data.queryData.dataList;
                scope.bigTotalItems = data.queryData.totalCount;
            })
        };
        //scope.pageChanged()
    }

    return {
        restrict: 'EA',
        scope: true,
        replace: true,
        templateUrl: helper.basepath('public/table-grid.html'),
        transclude: true,
        link: function (scope, $elm, $attr) {
            init(scope)
            scope.$parent.refresh = scope.refresh;
            scope.$parent.getSelected = scope.getSelected;
            scope.$parent.getAllData = scope.getAllData;
        }
    }
}])


App.directive('tableGridHeadColumn', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: true,
        replace: false,
        transclude: true,
        link: function (scope, $elm, $attr) {
            if (scope.column.sort) {
                $elm.addClass('sort')
            }
            var headCellTemplate = scope.column.headCellTemplate;
            if (!headCellTemplate) {
                headCellTemplate = '<div>{{column.displayName}}</div>'
            }
            if (scope.column.sort) {
                headCellTemplate += '<i ng-class="sortClass(column)" class="custom"></i>';
            }
            headCellTemplate = headCellTemplate.replace(/COL_FIELD/g, scope.column.displayName)
            var cellElement = angular.element(headCellTemplate);
            $elm.append(cellElement);
            $compile(cellElement)(scope);
        }
    };
}])

App.directive('tableGridRow', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: true,
        replace: false,
        template: '<td table-grid-column ng-repeat="column in gridOptions.columnDefs track by $index"  align="{{column.align || \'left\'}}"  width="{{column.width}}"  style="max-width:{{column.width}};width:{{column.width}};"></td>',
        transclude: true,
        link: function (scope, $elm, $attr) {
            var colWatchDereg = scope.$watch('data', function () {
                if (!scope.$parent.$parent.RowDatas) {
                    scope.$parent.$parent.RowDatas = []
                }
                scope.ROW = {
                    element: $elm,
                    data: scope.data,
                    index: $attr.index,
                    class: ''
                }
                scope.$parent.$parent.RowDatas.splice($attr.index, 1, scope.ROW)
            });
            var deregisterFunction = function () {
                colWatchDereg();
            };
            scope.$on('$destroy', deregisterFunction);
            $elm.on('$destroy', deregisterFunction);
        }
    };
}])

App.directive('tableGridColumn', ['$compile', function ($compile) {
    return {
        restrict: 'EA',
        scope: true,
        replace: false,
        transclude: true,
        link: function (scope, $elm, $attr) {
            if (scope.column.name == 'isChecked') {
                $elm.on('click', function (event) {
                    event.preventDefault()
                })
            }
            scope.COL = scope.column;
            if (!scope.column.cellTemplate) {
                scope.column.cellTemplate = '<div>{{COL_FIELD}}</div>'
            }
            var cellTemplate;
            if (scope.column.name == 'isChecked') {
                var index = $elm.parent().attr('index')
                cellTemplate = scope.column.cellTemplate.replace(/COL_FIELD/g, 'RowDatas[' + index + '].' + scope.column.name + '')
            } else {
                cellTemplate = scope.column.cellTemplate.replace(/COL_FIELD/g, 'data.' + scope.column.name + '')
            }
            var cellElement = angular.element(cellTemplate);
            $elm.append(cellElement);
            $compile(cellElement)(scope);
        }
    };
}])

App.directive('tableGridSearch', ['$compile', function ($compile) {
    function getSearchTemplate(search) {
        if (search.type == 'input') {
            return '<input ng-model="params.' + search.key + '" type="' + (search.dataType || 'text') + '" class="form-control mr" placeholder="' + search.title + '"/>'
        } else if (search.type == 'select') {
            var html = []
            html.push('<select ng-change="query()"   ng-model="params.' + search.key + '" class="form-control mr">')
            for (var i = 0, j = search.options.length; i < j; i++) {
                html.push('<option value="' + search.options[i].value + '">' + search.options[i].title + '</option>')
            }
            html.push('</select>')
            return html.join('')
        } else if (search.type == 'datetime') {
            var html = []
            html.push('<datetime class="mr" title="' + search.title + '" format="yyyy-mm-dd hh:ii" min-view="0" ng-model="params.' + search.key + '"></datetime>')
            return html.join('')
        } else if (search.type == 'date') {
            var html = []
            html.push('<datetime class="mr" title="' + search.title + '" format="yyyy-mm-dd" min-view="3" ng-model="params.' + search.key + '"></datetime>')
            return html.join('')
        }
    }

    return {
        restrict: 'EA',
        scope: true,
        replace: false,
        transclude: true,
        link: function (scope, $elm, $attr) {
            var element = angular.element(getSearchTemplate(scope.search))
            $elm.append(element);
            $compile(element)(scope);
        }
    };
}])