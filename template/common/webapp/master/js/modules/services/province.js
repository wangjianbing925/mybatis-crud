App.service('Province', ['Result', '$http', function (Result, $http) {

    var batchDelete = function(ids){
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/province/delete',
            data: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }

    var get = function (id) {
        var promise = $http.get(dataUrl + '/bg/province/detail/' + id)
        return Result(promise)
    }

    var save = function (model) {
        var promise = $http.post(dataUrl + '/bg/province/save', model)
        return Result(promise)
    }
    var all = function () {
        var promise = $http.get(dataUrl + '/bg/province/all')
        return Result(promise)
    }
    return {
        get: get,
        save: save,
        all: all,
        batchDelete: batchDelete
    }
}]);