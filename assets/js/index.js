// Execute code after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    var currentHour = dayjs();

    $("#currentDay").text(dayjs().format("dddd[,] MMMM DD"));

    var container = $(".container")

    var timeTable = JSON.parse(localStorage.getItem('timeTable')) || [];

    var schedule = [
        9, 10, 11, 12, 13, 14, 15, 16, 17
    ];

    for (var i = 0; i < schedule.length; i++){
        var time = currentHour.hour(schedule[i]).minute(0);
        
        var timeBlock = $('<div>');
        timeBlock.addClass('row time-block');

        var hourBlock = $('<div>');
        hourBlock.addClass('hour col-2 d-flex justify-content-center align-items-center');
        hourBlock.text(time.format('h A'));

        var textArea = $('<textarea>');
        textArea.addClass('textarea col-8');

        var saveBtn = $('<button>');
        saveBtn.addClass('col-2 saveBtn');

        var saveIcon = $('<i>');
        saveIcon.addClass('fas fa-save');
        saveBtn.append(saveIcon);

        container.append(timeBlock);
        timeBlock.append(hourBlock);
        timeBlock.append(textArea);
        timeBlock.append(saveBtn);

        var differenceInTime = currentHour.diff(time, "minutes");
        if(differenceInTime < 0) {
            textArea.addClass('past');
        } else if (differenceInTime > 60) {
            textArea.addClass('future');
            
        } else if (differenceInTime <= 60 && differenceInTime >= 0) {
            textArea.addClass('present');
        }

    }

});