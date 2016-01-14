App.controller('DashboardController', ['$scope', 'DateUtil', 'Notify',  function ($scope, DateUtil, Notify) {
    moment.lang('zh-cn');
    $scope.totalCount = 100;
    $scope.currentMonthCount = 10;
    $scope.currentDayCount = 10;
    $scope.renderUserChart = function () {
        var startTime = $scope.beginDayTime;
        var endTime = $scope.endDayTime;
        if(!startTime){
            Notify.alert('请选择开始时间', {status: 'warning'})
            return
        }
        if(!endTime){
            Notify.alert('请选择结束时间', {status: 'warning'})
            return
        }
        if(startTime > endTime){
            Notify.alert('开始时间不能大于结束时间', {status: 'warning'})
            return
        }
        renderUserChart()
    }
    require.config({
        paths: {
            echarts: 'http://echarts.baidu.com/build/dist'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/line',
            'echarts/chart/bar',
        ],
        function (ec) {
            var myChart2 = ec.init(document.querySelector('#map2'));
            var option2 = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['用户数']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'用户数',
                        type:'line',
                        data:[13, 35, 25, 50, 14, 65, 35],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            }
            myChart2.setOption(option2)
        })

}])
