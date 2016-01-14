App.controller('BgUserController', ['$scope', '$state', '$modal', 'SweetAlert', 'colors', 'Notify', 'BgUser', function ($scope, $state, $modal, SweetAlert, colors, Notify, BgUser) {
    var buttons = [{
        class: 'btn-info',
        title: '新增',
        action: function () {
            $state.go('app.bgUser-add')
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
            $state.go('app.bgUser-update', {id: datas[0].id})
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
                text: '确定要删除所选择的用户吗?',
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
    }, {
        class: 'btn-green',
        title: '重置密码',
        action: function () {
            var datas = $scope.getSelected();
            if (datas.length == 0 || datas.length > 1) {
                Notify.alert('请选择一条纪录进行操作', {status: 'warning'});
                return
            }
            SweetAlert.swal({
                title: '',
                text: '确定要重置所选择用户的密码吗?',
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: colors.byName('danger'),
                confirmButtonText: "是的,确定",
                cancelButtonText: "不",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    BgUser.resetPwd(datas[0].id).then(function () {
                        Notify.alert('重置成功', {status: 'success'});
                    })
                }
            });
        }
    }]
    $scope.gridOptions = {
        isCanSelect: true,
        columnDefs: [
            {displayName: '用户名', name: 'loginName', width: 150},
            {displayName: '所属角色', name: 'bgRole.name', width: 150},
            {displayName: '所属分会', name: 'dept.name', width: 150},
            {displayName: '手机号码', name: 'mobilePhone', width: 150},
            {displayName: '备注', name: 'remark', width: 150},
            {
                displayName: '创建时间', name: 'createTime', width: 150,
                cellTemplate: '<span>{{COL_FIELD | date: "yyyy-MM-dd HH:mm:ss"}}</span>'
            }
        ],
        url: dataUrl + '/bg/bgUser/list',
        buttons: buttons
    };

    $scope.batchDelete = function () {
        var promise = BgUser.batchDelete($scope.ids)
        promise.then(function () {
            Notify.alert('删除成功', {status: 'success'});
            $scope.refresh()
        })
    }
}])
