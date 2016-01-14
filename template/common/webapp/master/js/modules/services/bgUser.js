App.service('BgUser', ['Result', '$http', function (Result, $http) {

    var batchDelete = function(ids){
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/bgUser/delete',
            data: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }

    var get = function (id) {
        var promise = $http.get(dataUrl + '/bg/bgUser/detail/' + id)
        return Result(promise)
    }

    var save = function (model) {
        var promise = $http.post(dataUrl + '/bg/bgUser/save', model)
        return Result(promise)
    }

    var updatePwd = function (model) {
        var promise = $http.post(dataUrl + '/bg/bgUser/modifyPassword', model)
        return Result(promise)
    }

    var resetPwd = function (userId) {
        var promise = $http.post(dataUrl + '/bg/bgUser/password/reset/'+userId)
        return Result(promise)
    }

    return {
        get: get,
        save: save,
        updatePwd: updatePwd,
        resetPwd: resetPwd,
        batchDelete: batchDelete
    }
}]);