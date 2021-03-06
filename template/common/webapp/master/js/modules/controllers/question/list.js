App.controller('QuestionController', ['$scope', '$state', '$modal', 'SweetAlert', 'colors', 'Notify', 'Chapter', 'Course', function ($scope, $state, $modal, SweetAlert, colors, Notify, Chapter, Course) {
    var url = dataUrl + '/bg/question/list';
    if ($state.params.courseId) {
        Course.get($state.params.courseId).then(function (data) {
            $scope.courseName = data.name
        })
        url += '?courseId=' + $state.params.courseId;
    }else{
        Course.all().then(function (datas) {
            var search = {
                type: 'select',
                key: 'courseId',
                options: [{
                    value: '', title: '选择课程'
                }]
            }
            angular.forEach(datas, function (data) {
                search.options.push({
                    value: data.id,
                    title: data.name
                })
            })
            $scope.gridOptions.searchs.push(search)
        })
    }
    var buttons = [{
        class: 'btn-info',
        title: '新增',
        action: function () {
            $state.go('app.question-add')
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
            $state.go('app.question-update', {id: datas[0].id})
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
                text: '确定要删除所选择的课程章节吗?',
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
            {displayName: '课程名称', name: 'course.name', width: 120},
            {displayName: '章节名称', name: 'chapter.name', width: 100},
            {displayName: '试题类型', name: 'questionType.name', width: 100},
            {displayName: '考点', name: 'examPoint', width: 150},
            {displayName: '难度', name: 'difficulty', width: 70},
            {displayName: '被作答次数', name: 'answerNum', width: 90},
            {displayName: '平均用时(秒)', name: 'useTimeAvg', width: 100},
            {displayName: '正确率', name: 'correctRate', width: 80},
            {displayName: '易错项', name: 'errorOption', width: 150},
            {displayName: '试题来源', name: 'question.source', width: 100},
            {displayName: '题干内容', name: 'question.content', width: 150},
            {
                displayName: '更新时间', name: 'updateTime', width: 150,
                cellTemplate: '<span>{{COL_FIELD | date:"yyyy-MM-dd HH:mm:ss"}}</span>'
            }
        ],
        url: url,
        buttons: buttons,
        searchs: [{
            type: 'input',
            dataType: 'text',
            key: 'examPoint',
            title: '考点'
        }]
    }
    ;

    $scope.batchDelete = function () {
        var promise = Question.batchDelete($scope.ids)
        promise.then(function () {
            Notify.alert('删除成功', {status: 'success'});
            $scope.refresh()
        })
    }
}])
