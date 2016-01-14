App.directive('fileUpload', ['RouteHelpers', 'Notify', function (helper, Notify) {
    return {
        restrict: 'EA',
        templateUrl: helper.basepath('public/file-upload.html'),
        replace: true,
        link: function ($scope, element, attrs) {
            var uploader = $scope.uploader;

            uploader.filters.push({
                name: 'customFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    return this.queue.length < $scope.maxFileCount;
                }
            });

            uploader.onAfterAddingFile = function(fileItem) {
                for(var i= 0, j=$scope.uploader.queue.length; i<j; i++){
                    if(!$scope.uploader.queue[i].fileData){
                        var reader = new FileReader();
                        reader.index = i;
                        reader.readAsDataURL($scope.uploader.queue[i]._file);
                        reader.onload = function () {
                            var self = this;
                            $scope.$apply(function(){
                                $scope.uploader.queue[self.index].fileData = self.result;
                            })
                        }
                    }
                }
            };
            $scope.uploadAll = function () {
                if($scope.uploader.queue.length == 0){
                    Notify.alert('请选择图片', {status: 'warning'});
                    return
                }
                var formData = new FormData();
                for(var i= 0,j=$scope.uploader.queue.length; i<j; i++){
                    formData.append('files[' + i + ']', $scope.uploader.queue[i]._file)
                }
                var xhr = new XMLHttpRequest()
                xhr.open('POST', contextPath + '/upload')
                xhr.onload = function () {
                    $scope.uploadLoadingClass = '';
                    var result = angular.fromJson(xhr.responseText)
                    if (result.state == "success") {
                        Notify.alert('上传成功', {status: 'success'});
                        //$scope.uploadSuccess(result.results.path)
                        $scope.$emit("uploadSuccess", result.results.path, $scope.imageName || '');
                        $scope.$close()
                    } else {
                        Notify.alert(result.message, {status: 'danger'});
                    }
                }
                xhr.onprogress = function(event) {
                    if (event.lengthComputable) {
                        var percentComplete = event.loaded / event.total;
                        uploader.progress = percentComplete*100;
                    }
                }
                $scope.uploadLoadingClass = 'whirl traditional'
                xhr.send(formData)
            }
        }
    }
}])