App.controller('ExamTypeController', ['$scope', '$state', '$modal', 'SweetAlert', 'colors', 'Notify', 'ExamType', function ($scope, $state, $modal, SweetAlert, colors, Notify, ExamType) {
    var buttons = [{
        class: 'btn-info',
        title: '新增',
        action: function () {
            $state.go('app.examType-add')
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
            $state.go('app.examType-update', {id: datas[0].id})
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
                ids.push(datas[i])
            }
            $scope.ids = ids;
            SweetAlert.swal({
                title: '',
                text: '确定要删除所选择的考试类型吗?',
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
            {displayName: '类型名称', name: 'name', width: 150},
            {displayName: '所属省份', name: 'province.name', width: 150},
            {
                displayName: '状态', name: 'status', width: 150,
                cellTemplate: '<span>{{COL_FIELD | examTypeStatus}}</span>'
            },
            {displayName: '排序', name: 'sort', width: 150}
        ],
        url: dataUrl + '/bg/examType/list',
        buttons: buttons
    };

    $scope.batchDelete = function () {
        var promise = ExamType.batchDelete($scope.ids)
        promise.then(function () {
            Notify.alert('删除成功', {status: 'success'});
            $scope.refresh()
        })
    }
}])
