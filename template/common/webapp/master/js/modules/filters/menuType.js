App.filter('menuType', function () {
    return function (type) {
        if(type == 'item'){
            return '菜单'
        }else{
            return '目录'
        }
    }
})