App.service('BgMenu', ['Result', '$http', function (Result, $http) {

    var batchDelete = function(ids){
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/bgMenu/delete',
            data: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }

    var get = function (id) {
        var promise = $http.get(dataUrl + '/bg/bgMenu/detail/' + id)
        return Result(promise)
    }

    var save = function (model) {
        var promise = $http.post(dataUrl + '/bg/bgMenu/save', model)
        return Result(promise)
    }

    var getTopMenu = function (id) {
        var promise = $http.get(dataUrl + '/bg/bgMenu/top/menu')
        return Result(promise)
    }

    return {
        get: get,
        getTopMenu:getTopMenu,
        save: save,
        batchDelete: batchDelete
    }
}]);