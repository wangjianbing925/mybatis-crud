App.service('Menu', ['Result', '$http', function (Result, $http) {

    var batchDelete = function(models){
        var promise = $http({
            method: 'POST',
            url: dataUrl + '/bg/bgMenu/delete',
            data: JSON.stringify(models),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        return Result(promise)
    }

    var getTop = function (id) {
        var promise = $http.get(dataUrl + '/bg/bgMenu/role/top/menu')
        return Result(promise)
    }

    var getSub = function (id) {
        var promise = $http.get(dataUrl + '/bg/bgMenu/role/sub/menu/'+id)
        return Result(promise)
    }

    var save = function (model) {
        var promise = $http.post(dataUrl + '/bg/bgMenu/save', model)
        return Result(promise)
    }


    return {
        getTop: getTop,
        getSub: getSub,
        save: save,
        batchDelete: batchDelete
    }
}]);