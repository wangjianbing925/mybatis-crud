App.directive('upload', ['RouteHelpers', 'Notify', function (helper, Notify) {
    return {
        restrict: 'EA',
        template: '<div class="upload-img"><input type="file"> <img ng-src="{{uploadImgPath}}"></div>',
        replace: true,
        link: function ($scope, element, attrs) {
            $scope.uploadImgPath = contextPath + '/static/addImage.png';
            var fileEle = element.find('input[type="file"]')
            fileEle.on('change', function () {
                if(attrs.type == 'img'){
                    var formData = new FormData()
                    formData.append('imgFile', this.files[0])
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', uploadPath)
                    xhr.onload = function () {
                        $scope.$apply(function () {
                            Notify.hideLoading()
                        })
                        var result = JSON.parse(xhr.responseText)
                        if(result.statusCode == 20011011){
                            $scope.$emit('imgUpload', result.data.fileUrl, attrs.id)
                        }else{
                            Notify.alert(result.msg, {status: 'danger'})
                        }
                    }
                    $scope.$apply(function () {
                        Notify.showLoading()
                    })
                    xhr.send(formData)
                }else{
                    $scope.$emit('fileChange', this.files[0], attrs.id)
                }
            })
        }
    }
}])