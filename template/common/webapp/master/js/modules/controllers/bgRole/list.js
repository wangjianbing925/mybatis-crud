App.controller('BgRoleController', ['$scope', '$state', '$modal', 'SweetAlert', 'colors', 'Notify', 'BgRole', function ($scope, $state, $modal, SweetAlert, colors, Notify, BgRole) {
    var buttons = [{
        class: 'btn-info',
        title: '新增',
        action: function () {
            $state.go('app.bgRole-add')
        }
    }, {
        class: 'btn-success',
        title: '修改',
        action: function () {
            var datas = $scope.getSelected();
            if (datas.length == 0 || datas.length > 1) {
                Notify.alert('请选择一条纪录进行操作', {status: 'warning'});
                return
            }
            $state.go('app.bgRole-update', {id: datas[0].id})
        }
    }, {
        class: 'btn-danger',
        title: '删除',
        action: function () {
            var datas = $scope.getSelected();
            if (datas.length == 0) {
                Notify.alert('请选择至少一条纪录进行操作', {status: 'warning'});
                return
            }
            var ids = [];
            for (var i = 0, j = datas.length; i < j; i++) {
                ids.push(datas[i].id)
            }
            $scope.ids = ids;
            SweetAlert.swal({
                title: '',
                text: '确定要删除所选择的角色吗?',
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: colors.byName('danger'),
                confirmButtonText: "是的,确定删除",
                cancelButtonText: "不",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    $scope.batchDelete()
                }
            });
        }
    }]
    $scope.gridOptions = {
        isCanSelect: true,
        columnDefs: [
            {displayName: '角色名称', name: 'name', width: 250},
            {displayName: '角色描述', name: 'description', width: 250}
        ],
        url: dataUrl + '/bg/bgRole/list',
        buttons: buttons
    };

    $scope.batchDelete = function () {
        var promise = BgRole.batchDelete($scope.ids)
        promise.then(function () {
            Notify.alert('删除成功', {status: 'success'});
            $scope.refresh()
        })
    }
}])
