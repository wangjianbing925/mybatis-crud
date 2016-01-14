App.controller('QuestionAddController', ['$scope', '$state', '$modal', 'Notify', 'RouteHelpers', 'Question', 'Course', 'Chapter', 'Utils', function ($scope, $state, $modal, Notify, helper, Question, Course, Chapter, Utils) {
    $scope.pageTitle = '新增';
    var initModel = {
        isDel: 0,
        course: {
            id: parseInt(localStorage.getItem('courseId') || 0)
        },
        chapter: {
            id: parseInt(localStorage.getItem('chapterId') || 0)
        },
        questionType: {
            id: parseInt(localStorage.getItem('questionTypeId') || 1)
        }
    }
    $scope.chapters = [{id: "", name: "无"}]
    $scope.inputAnswers = []
    $scope.type6Questions = [{
        question: '',
        answer: ''
    }]
    $scope.model = initModel;
    $scope.questionTypes = Question.allType;
    Course.all().then(function (data) {
        $scope.courses = data;
    })
    $scope.changeCourse = function () {
        $scope.chapters = [{id: "", name: "无"}]
        localStorage.setItem('courseId', $scope.model.course.id)
        if ($scope.model.course.id) {
            Chapter.getByCourse($scope.model.course.id).then(function (datas) {
                $scope.chapters = $scope.chapters.concat(datas)
                var flag = false;
                for (var i = 0, j = $scope.chapters.length; i < j; i++) {
                    if ($scope.chapters[i].id == $scope.model.chapter.id) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    $scope.model.chapter.id = ''
                }
            })
        }
    }
    $scope.changeCourse()
    $scope.changeChapter = function () {
        localStorage.setItem('chapterId', $scope.model.chapter.id)
    }
    $scope.changeQuestionType = function () {
        for (var i = 1; i < 9; i++) {
            $scope.model['option' + i] = null;
            $scope.model['correct' + i] = null;
        }
        localStorage.setItem('questionTypeId', $scope.model.questionType.id)
    }
    $scope.$on('addInput', function (event) {
        $scope.inputAnswers.push({})
    })
    $scope.$on('changeInput', function (event, count) {
        console.info('changeInput:' + count)
        if (count == $scope.inputAnswers.length) {
            return
        }
        $scope.inputAnswers.splice(count, $scope.inputAnswers.length - count)
    })
    $scope.submitted = false;
    $scope.validateInput = function (name, type) {
        var input = $scope.formValidate[name];
        return (input.$dirty || $scope.submitted) && input.$error[type];
    };
    $scope.submitForm = function () {
        $scope.submitted = true;
        if ($scope.formValidate.$valid) {
            if (!$scope.model.contentHtml) {
                Notify.alert('请填写题目内容', {status: 'warning'});
                return
            }
            if (!$scope.model.chapter.id) {
                delete $scope.model.chapter
            }
            var questionTypeId = $scope.model.questionType.id;
            if (questionTypeId == 1 || questionTypeId == 2) {
                if (!$scope.model.option1) {
                    Notify.alert('请填写备选答案A', {status: 'warning'});
                    return
                }
                if (!$scope.model.option2) {
                    Notify.alert('请填写备选答案B', {status: 'warning'});
                    return
                }
                if (!$scope.model.option3) {
                    Notify.alert('请填写备选答案C', {status: 'warning'});
                    return
                }
                if (!$scope.model.option4) {
                    Notify.alert('请填写备选答案D', {status: 'warning'});
                    return
                }
            }
            switch (questionTypeId) {
                case 1:
                    $scope.model.optionNum = 4;
                    $scope.model.correctNum = 1;
                    if (!$scope.type1Correct1) {
                        Notify.alert('请选择正确答案', {status: 'warning'});
                        return
                    }
                    $scope.model.correct1 = $scope.type1Correct1;
                    break;
                case 2:
                    var answers = []
                    if ($scope.type2Correct1) {
                        answers.push($scope.type2Correct1)
                    }
                    if ($scope.type2Correct2) {
                        answers.push($scope.type2Correct2)
                    }
                    if ($scope.type2Correct3) {
                        answers.push($scope.type2Correct3)
                    }
                    if ($scope.type2Correct4) {
                        answers.push($scope.type2Correct4)
                    }
                    for (var i = 0, j = answers.length; i < j; i++) {
                        $scope.model['correct' + (i + 1)] = answers[i]
                    }
                    $scope.model.correctNum = answers.length;
                    if ($scope.model.correctNum == 0) {
                        Notify.alert('请选择正确答案', {status: 'warning'});
                        return
                    }
                    $scope.model.optionNum = 4;
                    break;
                case 3:
                    $scope.model.option1 = '正确';
                    $scope.model.option2 = '错误';
                    $scope.model.correctNum = 1;
                    $scope.model.optionNum = 2;
                    if (!$scope.type3Correct1) {
                        Notify.alert('请选择正确答案', {status: 'warning'});
                        return
                    }
                    $scope.model.correct1 = $scope.type3Correct1;
                    break;
                case 4:
                    if ($scope.inputAnswers.length == 0) {
                        Notify.alert('填空题至少输入一个填空', {status: 'warning'});
                        return
                    }
                    for (var i = 0, j = $scope.inputAnswers.length; i < j; i++) {
                        $scope.model['correct' + (i + 1)] = $scope.inputAnswers[i].value
                    }
                    $scope.model.correctNum = $scope.inputAnswers.length;
                    break;
                case 5:
                    if (!$scope.questionType5Correct) {
                        Notify.alert('请填写参考答案', {status: 'warning'});
                        return
                    }
                    $scope.model.correctNum = 1;
                    $scope.model.optionNum = 1;
                    $scope.model.correct1 = $scope.questionType5Correct;
                    break;
                case 6:
                    for (var i = 0, j = $scope.type6Questions.length; i < j; i++) {
                        if (!$scope.type6Questions[i].question) {
                            Notify.alert('请填写问题' + (i + 1) + '内容', {status: 'warning'});
                            return
                        }
                        $scope.model['option' + (i + 1)] = $scope.type6Questions[i].question;
                        $scope.model['correct' + (i + 1)] = $scope.type6Questions[i].answer;
                    }
                    $scope.model.optionNum = $scope.type6Questions.length;
                    $scope.model.correctNum = $scope.type6Questions.length;
                    break;
            }
            $scope.model.content = Utils.convertHtml($scope.model.contentHtml)
            Question.save($scope.model).then(function () {
                Notify.alert('添加成功', {status: 'success'});
                $state.go('app.question')
            })
        } else {
            Notify.alert('请检查所填的内容是否合法', {status: 'warning'});
            return false;
        }
    }
    $scope.addQuestion = function () {
        $scope.type6Questions.push({
            question: '',
            answer: ''
        })
    }
    $scope.deleteQuestion = function (index) {
        $scope.type6Questions.splice(index, 1)
    }
}])