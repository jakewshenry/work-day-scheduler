// Execute code after DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Get the current hour using the dayjs library
    var currentHour = dayjs();

    // Set the current day in the format "dddd, MMMM DD" and display it
    $("#currentDay").text(dayjs().format("dddd[,] MMMM DD"));

    // Get the container element with class "container"
    var container = $(".container")

    // Array to store the schedule hours
    var schedule = [
        9, 10, 11, 12, 13, 14, 15, 16, 17
    ];

    // Loop through each schedule hour
    for (var i = 0; i < schedule.length; i++) {
        // Create a time object for the current schedule hour
        var time = currentHour.hour(schedule[i]).minute(0);

        // Create a time block element
        var timeBlock = $('<div>');
        timeBlock.addClass('row time-block');

        // Create an hour block element and display the formatted hour
        var hourBlock = $('<div>');
        hourBlock.addClass('hour col-2 d-flex justify-content-center align-items-center');
        hourBlock.text(time.format('h A'));

        // Create a textarea element
        var textArea = $('<textarea>');
        textArea.addClass('textarea col-8');
        textArea.attr('id', 'textArea' + i);

        // Create a save button element
        var saveBtn = $('<button>');
        saveBtn.addClass('col-2 saveBtn');

        // Create an attribute and assign the current index 'i'
        saveBtn.attr('data-id', i);

        // Create a save icon element
        var saveIcon = $('<i>');
        saveIcon.addClass('fas fa-save');
        saveBtn.append(saveIcon);

        // Append elements to the container
        container.append(timeBlock);
        timeBlock.append(hourBlock);
        timeBlock.append(textArea);
        timeBlock.append(saveBtn);

        // Calculate the difference in time between the current hour and the schedule hour
        var differenceInTime = currentHour.diff(time, "minutes");

        // Add appropriate class to the textarea based on the difference in time
        if (differenceInTime < 0) {
            textArea.addClass('future');
        } else if (differenceInTime > 60) {
            textArea.addClass('past');
        } else if (differenceInTime <= 60 && differenceInTime >= 0) {
            textArea.addClass('present');
        }

        // Get data from local storage using the index as a key
        var text = JSON.parse(localStorage.getItem(`scheduleData${i}`)) || '';

        // Apply value to the textarea
        textArea.val(text);
    }

    // Event listener for the save button click
    container.on('click', '.saveBtn', function () {

        // Identify which specific button is being pressed with 'this', and .data gets the attribute of data-id
        var orderID = $(this).data('id');

        // Get the textarea element with the same order ID
        var textArea = $(`#textArea${orderID}`);

        // Save the textarea data to local storage and convert the value to a string
        localStorage.setItem(`scheduleData${orderID}`, JSON.stringify(textArea.val()));

    });
});
