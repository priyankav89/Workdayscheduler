var eventsData = {};
//displays today's date 
var today = dayjs();
$('#currentDay').text(today.format('MMM D, YYYY'));

//get current time and display on the screen
var currentTime = moment();
$('#currentTime').text(currentTime.format('LTS'));

//set colors according to time(past,present,future)
function setHourColors() {
    var currentT=moment().hours();
    $('.time-block').each(function () {
        var now = parseInt($(this).attr("id").split("-")[1]);
        if ( now<currentT) {
            $(this).addClass('past');
            $(this).removeClass('present');
            $(this).removeClass('future');
        }
        else if (now === currentT)  {
            $(this).addClass('present');
            $(this).removeClass('past');
            $(this).removeClass('future');
        }
        else {

            $(this).addClass('future');
           $(this).removeClass('past');
            $(this).removeClass('present');

        }
    });

}
var timeBlockEl = document.querySelector('.container');
// generate events function
function generateEvents(events) {
    var eventKeys = Object.keys(events);
    for (var i = 0; i < eventKeys.length; i++) {
        var eventKey = eventKeys[i];
        var timeBlockEl = $('#hour-'+ (i+9)).children("textarea").text(eventsData[eventKey]);
    }
};

//load existing data from local storage
function loadStoredData() {
    eventsData = JSON.parse(localStorage.getItem("calendarEvents"));
  if (!eventsData){
        eventsData = {
            hour9: "",
            hour10: "",
            hour11: "",
            hour12: "",
            hour13: "",
            hour14: "",
            hour15: "",
            hour16: "",
            hour17: ""
        };
    }
    generateEvents(eventsData);
};



//to save the agenda/task save button is clicked
function handleSaveClick(event) {
    //grab data from html
    var hourBlock = $(event.target).parent();
    var value = hourBlock.children("textarea").val();
    var hour = hourBlock.attr('id').split("-")[1];
    //modify our data object
    eventsData["hour" + hour] = value;
    //store in local storage
    localStorage.setItem("calendarEvents", JSON.stringify(eventsData));
};

$(function () {
    setHourColors();
    loadStoredData();
});
//when button is clicked activate handleSaveClick function to save the agenda and store in local storage 
$('.saveBtn').on('click', handleSaveClick);