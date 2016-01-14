App.service('DateUtil', [function () {
    var currentMonthDate = function () {
        var date = new Date()
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        return {
            startTime: date.getFullYear() + '-' + month + '-' + '01',
            endTime: date.getFullYear() + '-' + month + '-' + '31'
        }
    }
    var currentDayDate = function () {
        var date = new Date()
        var month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return {
            startTime: date.getFullYear() + '-' + month + '-' + day + ' 00:00:00',
            endTime: date.getFullYear() + '-' + month + '-' + day + ' 23:59:59'
        }
    }

    var beginDayTime = function () {
        var date = new Date()
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date = dateAdd("d ", -7, date);
        return date.getTime();
    }

    var endDayTime = function () {
        var date = new Date()
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)
        return date.getTime();
    }

    function dateAdd(interval, number, date) {
        switch (interval) {
            case "y ": {
                date.setFullYear(date.getFullYear() + number);
                return date;
                break;
            }
            case "q ": {
                date.setMonth(date.getMonth() + number * 3);
                return date;
                break;
            }
            case "m ": {
                date.setMonth(date.getMonth() + number);
                return date;
                break;
            }
            case "w ": {
                date.setDate(date.getDate() + number * 7);
                return date;
                break;
            }
            case "d ": {
                date.setDate(date.getDate() + number);
                return date;
                break;
            }
            case "h ": {
                date.setHours(date.getHours() + number);
                return date;
                break;
            }
            case "m ": {
                date.setMinutes(date.getMinutes() + number);
                return date;
                break;
            }
            case "s ": {
                date.setSeconds(date.getSeconds() + number);
                return date;
                break;
            }
            default: {
                date.setDate(d.getDate() + number);
                return date;
                break;
            }
        }
    }

    return {
        currentMonthDate: currentMonthDate,
        currentDayDate: currentDayDate,
        beginDayTime: beginDayTime,
        endDayTime: endDayTime,
        dateAdd: dateAdd
    }
}])
