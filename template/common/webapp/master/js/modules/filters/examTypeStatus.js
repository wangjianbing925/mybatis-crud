App.filter('examTypeStatus', function () {
    return function (status) {
        switch(parseInt(status)){
            case 0:
                return '正常'
            case 1:
                return '冻结'
        }
    }
})