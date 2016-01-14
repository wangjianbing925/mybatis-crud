App.controller('ChapterAddController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'Chapter', 'Course', function ($scope, $state, $modal, Notify, helper, Chapter, Course) {
    $scope.pageTitle = '新增';
    $scope.model = {
        isDel: 0,
        questionNumber: 0,
        order: 1,
        parentId: -1,
        level: 0
    }
    Course.all().then(function (data) {
        $scope.courses = data;
    })
    $scope.submitted = false;
    $scope.validateInput = function (name, type) {
        var input = $scope.formValidate[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };
    $scope.submitForm = function () {
        $scope.submitted = true;
        if ($scope.formValidate.$valid) {
            Chapter.save($scope.model).then(function () {
                Notify.alert('添加成功', {status: 'success'});
                $state.go('app.chapter')
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }

}])