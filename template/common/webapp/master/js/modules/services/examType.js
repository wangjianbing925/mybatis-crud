App.service('ExamType', ['Result', '$http', function (Result, $http) {

    var batchDelete = function(ids){
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/examType/delete',
            data: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }

    var get = function (id) {
        var promise = $http.get(dataUrl + '/bg/examType/detail/' + id)
        return Result(promise)
    }

    var save = function (model) {
        var promise = $http.post(dataUrl + '/bg/examType/save', model)
        return Result(promise)
    }
    var all = function () {
        var promise = $http.get(dataUrl + '/bg/examType/all')
        return Result(promise)
    }
    return {
        get: get,
        save: save,
        all: all,
        batchDelete: batchDelete
    }
}]);