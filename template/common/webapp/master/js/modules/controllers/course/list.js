App.controller('CourseController', ['$scope', '$state', '$modal', 'SweetAlert', 'colors', 'Notify', 'Course', function ($scope, $state, $modal, SweetAlert, colors, Notify, Course) {
    var buttons = [{
        class: 'btn-info',
        title: '新增',
        action: function () {
            $state.go('app.course-add')
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
            $state.go('app.course-update', {id: datas[0].id})
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
                text: '确定要删除所选择的课程吗?',
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
            {
                displayName: '课程图标', name: 'icon', width: 80,
                cellTemplate: '<div image width="50" height="50" ng-model="COL_FIELD"  lazy-src="{{COL_FIELD}}"></div>'
            },
            {displayName: '课程名称', name: 'name', width: 250},
            {
                displayName: '章节数量', name: 'chapterNum', width: 100,
                cellTemplate: '<div class="link" ng-click="showChapter(ROW, COL, $event)">{{COL_FIELD}}</div>'
            },
            {displayName: '题目数量', name: 'questionNum', width: 100}
        ],
        url: dataUrl + '/bg/course/list',
        buttons: buttons
    };

    $scope.batchDelete = function () {
        var promise = Course.batchDelete($scope.ids)
        promise.then(function () {
            Notify.alert('删除成功', {status: 'success'});
            $scope.refresh()
        })
    }
    $scope.showChapter = function (row, index, event) {
        $state.go('app.course-chapter', {courseId: row.data.id})
    }
}])