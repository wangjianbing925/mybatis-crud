App.service('Chapter', ['Result', '$http', function (Result, $http) {

    var batchDelete = function(ids){
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/chapter/delete',
            data: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }

    var get = function (id) {
        var promise = $http.get(dataUrl + '/bg/chapter/detail/' + id)
        return Result(promise)
    }

    var save = function (model) {
        var promise = $http.post(dataUrl + '/bg/chapter/save', model)
        return Result(promise)
    }
    var getByCourse = function (courseId) {
        var promise = $http.get(dataUrl + '/bg/chapter/getByCourse/'+courseId)
        return Result(promise)
    }
    return {
        get: get,
        save: save,
        getByCourse: getByCourse,
        batchDelete: batchDelete
    }
}]);