var tasks = {};

//load saved tasks 
var loadTasks = function()
{
    tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
    if (!tasks) 
    {
        tasks =
        {
            time6AM: "",
            time7AM: "",
            time8AM: "",
            time9AM: "",
            time10AM: "",
            time11AM: "",
            time12PM: "",
            time1PM: "",
            time2PM: "",
            time3PM: "",
            time4PM: "",
            time5PM: "",
            time6PM: "",
            time7PM: "",
            time8PM: "",
            time9PM: "",
            time10PM: "",
            time11PM: "",
            time12PM: "",
            time1AM: "",
            time2AM: "",
            time3AM: ""
        };
    }

    //load task to time blocks
    $("li").each(function() 
    {
        var index = "time"+ $(this).find(".hour").text().trim();
        $(this).find(".description").val(tasks[index]);
    });
}

// check current time
// if end of the day clear tasks
// color tasks depend on the current time 
var checkTime = function()
{
    var currentHour = moment().format("hA");
    currentHour = moment(currentHour,"hA"); //current hour

    var endDay = moment("11:59PM","h:mA"); //variable for last minute of the day
    var currentHourMinute = moment().format("h:mA"); //current hour & minute 
    
    //check if end of the day clear tasks
    if(moment(currentHourMinute,"h:mA").isSame(endDay))
    {
        localStorage.clear();
        loadTasks();
    }

    // color the time block depend on current time
    $("li").each(function() 
    {
        var list = $(this).find(".hour").text().trim();
        var listTime = moment(list,"hA");

 
        if (listTime.isBefore(currentHour)) // if time in the past
        {
            $(this).find(".description").addClass("past");
        }else 
        if (listTime.isAfter(currentHour)) //if time in the future
        {
            $(this).find(".description").addClass("future");
        } else 
        if (listTime.isSame(currentHour)) //if current time
        {
            $(this).find(".description").addClass("present");
        }
    });
}

// focas on text when click on time block
$(".time-block").on("click",function()
{
    $(this).find(".description").trigger("focus");
});

// change text color when task changed and not saved
$(".description").on("input",function()
{
    $(this).removeClass("blackText");
    $(this).addClass("blueText");
});

// save the task and change the saved task color to black
$(".saveBtn").on("click", function()
{
    $(this).closest(".row").find(".description").removeClass("blueText");
    $(this).closest(".row").find(".description").addClass("blackText");
    var index = "time"+ $(this).closest(".row").find(".hour").text().trim();
    tasks[index] = $(this).closest(".row").find(".description").val();
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

var today = moment().format("dddd, MMMM Do"); // get today date
$("#currentDay").text(today);  // show todays date
loadTasks(); //load tasks
checkTime(); //check the time
setInterval(checkTime,(60*1000)); //check time every minute