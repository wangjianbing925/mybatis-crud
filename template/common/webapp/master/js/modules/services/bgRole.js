App.service('BgRole', ['Result', '$http', function (Result, $http) {

    var batchDelete = function(ids){
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/bgRole/delete',
            data: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }

    var get = function (id) {
        var promise = $http.get(dataUrl + '/bg/bgRole/detail/' + id)
        return Result(promise)
    }

    var save = function (model) {
        var promise = $http.post(dataUrl + '/bg/bgRole/save', model)
        return Result(promise)
    }
    var saveMenu = function (roleId, model) {
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/bgRole/saveMenu/'+roleId,
            data: JSON.stringify(model),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }
    var all = function () {
        var promise = $http.get(dataUrl + '/bg/bgRole/all')
        return Result(promise)
    }
    return {
        get: get,
        save: save,
        all: all,
        saveMenu: saveMenu,
        batchDelete: batchDelete
    }
}]);