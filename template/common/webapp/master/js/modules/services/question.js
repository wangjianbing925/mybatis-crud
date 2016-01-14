App.service('Question', ['Result', '$http', function (Result, $http) {

    var batchDelete = function(ids){
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/question/delete',
            data: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }

    var get = function (id) {
        var promise = $http.get(dataUrl + '/bg/question/detail/' + id)
        return Result(promise)
    }

    var save = function (model) {
        var promise = $http.post(dataUrl + '/bg/question/save', model)
        return Result(promise)
    }
    var getByCourse = function (courseId) {
        var promise = $http.get(dataUrl + '/bg/question/getByCourse/'+courseId)
        return Result(promise)
    }
    var getByChapter = function (chapterId) {
        var promise = $http.get(dataUrl + '/bg/question/getByChapter/'+chapterId)
        return Result(promise)
    }
    var allType = [
        {id:1, name: '单选题'},
        {id:2, name: '多选题'},
        {id:3, name: '判断题'},
        {id:4, name: '填空题'},
        {id:5, name: '简答题'},
        {id:6, name: '材料分析'}
    ]
    return {
        get: get,
        save: save,
        getByCourse: getByCourse,
        getByChapter: getByChapter,
        batchDelete: batchDelete,
        allType: allType
    }
}]);