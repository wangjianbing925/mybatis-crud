App.directive('map', ['RouteHelpers', 'Notify', function (helper, Notify) {
    return {
        restrict: 'EA',
        template: '<div class="map-container"><div class="map-search"><input ng-keypress="keyPress($event)" ng-model="formattedAddress" type="text" class="form-control" /><i ng-click="mapSearch()" class="custom custom-chaxun"></i></div><div  id="mapContainer" class="map-body" ></div></div>',
        replace: true,
        require: '?ngModel',
        link: function ($scope, element, attrs, ngModel) {
            console.info(attrs)
            var map = new AMap.Map('mapContainer',{
                resizeEnable: true,
                zoom: 15
            });
            var geocoder, marker;
            AMap.plugin('AMap.Geocoder',function(){
                geocoder = new AMap.Geocoder();
                marker = new AMap.Marker({
                    map:map,
                    bubble:true
                })

                map.on('click',function(e){
                    $scope.lacation = e.lnglat;
                    marker.setPosition(e.lnglat);
                    geocoder.getAddress(e.lnglat,function(status,result){
                        if(status=='complete'){
                            $scope.formattedAddress = result.regeocode.formattedAddress;
                            $scope.address = result.regeocode.addressComponent.street+result.regeocode.addressComponent.streetNumber;
                            $scope.city = result.regeocode.addressComponent.city;
                            $scope.district = result.regeocode.addressComponent.district;
                        }
                    })
                })
                $scope.saveAddress = function () {
                    if ($scope.lacation) {
                        $scope.$emit("lacationChange", {mapId:attrs.mapId  ,lacation: $scope.lacation, address: $scope.address,  city:$scope.city, district: $scope.district});
                    }
                    $scope.$close()
                }
            });
            $scope.keyPress = function ($event) {
                if($event.charCode == 13){
                    $scope.mapSearch()
                }
            }
            $scope.mapSearch = function () {
                if($scope.formattedAddress){
                    geocoder.getLocation($scope.formattedAddress,function(status,result){
                        if(status=='complete'&&result.geocodes.length){
                            $scope.lacation = result.geocodes[0].location;
                            marker.setPosition(result.geocodes[0].location);
                            map.setCenter(marker.getPosition())
                            geocoder.getAddress(result.geocodes[0].location,function(status,result){
                                if(status=='complete'){
                                    $scope.address = result.regeocode.addressComponent.street+result.regeocode.addressComponent.streetNumber;
                                    $scope.city = result.regeocode.addressComponent.city;
                                    $scope.district = result.regeocode.addressComponent.district;
                                }
                                console.info($scope)
                            })
                        }else{
                            Notify.alert('获取位置失败', {status: 'warning'});
                        }
                    })
                }
            }
            ngModel.$render = function () {
                if (!ngModel.$isEmpty(ngModel.$viewValue)) {
                    $scope.formattedAddress = ngModel.$viewValue;
                    $scope.mapSearch()
                }
            }
        }
    }
}])