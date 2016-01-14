App.service('Result', ['$q', 'Notify', function ($q, Notify) {
    return function (httpPromise) {
        Notify.showLoading()
        var deferred = $q.defer()
        httpPromise.success(function (data, status, headers, config) {
            if(angular.isString(data) && data.indexOf('login-form') != -1){
                location.href = contextPath + '/bg/login/out';
            }
            if(data.statusCode == 20011011){
                deferred.resolve(data.data)
            }else{
                Notify.alert(data.msg, {status: 'danger'})
                deferred.reject(data)
            }
        }).error(function (data, status, headers, config) {
            //location.href = contextPath + '/bg/login/out';
        }).finally(function () {
            Notify.hideLoading()
        })
        return deferred.promise;
    }
}])