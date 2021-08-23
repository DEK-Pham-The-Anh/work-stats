$(document).ready(function () {

    function getTimeData(times) {
        var moneyPerHour = parseFloat($('#moneyPerHour').val());
        var hoursPerDay = parseFloat($('#hoursPerDay').val());
        var minutesPerDay = hoursPerDay * 60;
        var timesLength = times.length;
        var totalMinutes = 0;

        for (var i = 0; i < timesLength; i++) {
            var time = times[i];

            if (time.indexOf(':') > -1) {
                var timeArr = time.split(':');
                var hours = parseInt(timeArr[0]);
                var minutes = parseInt(timeArr[1]);

                totalMinutes += hours * 60 + minutes;
            } else {
                return 'Invalid timesheet';
            }
        }

        var totalHours = totalMinutes / 60;
        var totalMinutesPredicted = timesLength * minutesPerDay;
        var diffMinutes = totalMinutes - totalMinutesPredicted;

        return {
            'timesCount': timesLength,
            'totalHoursPredict': Number.parseFloat(totalMinutesPredicted / 60).toFixed(2),
            'totalHours': Number.parseFloat(totalHours).toFixed(2),
            'totalMinutes': totalMinutes,
            'totalHoursMinutes': parseInt(totalHours) + ':' + (totalMinutes % 60),
            'moneyTotal': totalHours * moneyPerHour,
            'moneyPredict': timesLength * hoursPerDay * moneyPerHour,
            'diff': (diffMinutes < 0 ? '- ' : '+ ') + Math.abs(parseInt(diffMinutes / 60)) + ':' + Math.abs(diffMinutes % 60),
            'avgHours': parseFloat(totalHours / timesLength).toFixed(2),
            'avgMinutes': parseFloat(totalMinutes / timesLength).toFixed(2),
            'avgHoursMinutes': parseInt(totalHours / timesLength) + ':' + parseFloat((totalMinutes / timesLength) % 60).toFixed(2)
        }
    }

    if (localStorage.getItem("DEK_CLOCK_CALC_HOURS_PER_DAY")) {
        $('#hoursPerDay').val(localStorage.getItem("DEK_CLOCK_CALC_HOURS_PER_DAY"));
    }

    if (localStorage.getItem("DEK_CLOCK_CALC_TIMESHEET")) {
        $('#timesheet').val(localStorage.getItem("DEK_CLOCK_CALC_TIMESHEET"));
    }

    $('#calculate').on('click', function () {
        if ($('#hoursPerDay').val() != '' && $('#moneyPerHour').val() != '' && $('#hoursPerDay').val() != '') {
            $('#app-form [readonly]').val('');

            var times = $('#timesheet').val().split("\n");

            localStorage.setItem("DEK_CLOCK_CALC_HOURS_PER_DAY", $('#hoursPerDay').val());
            localStorage.setItem("DEK_CLOCK_CALC_TIMESHEET", $('#timesheet').val());

            var data = getTimeData(times);

            for (property in data) {
                $('input#' + property).val(data[property]);
            }
        }
    });

});