var tasks = {};
var loadTasks = function()
{
    tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
    if (!tasks) 
    {
        tasks =
        {
            time9AM: "",
            time10AM: "",
            time11AM: "",
            time12PM: "",
            time1PM: "",
            time2PM: "",
            time3PM: "",
            time4PM: "",
            time5PM: ""
        };
    }

    $("li").each(function() 
    {
        var index = "time"+ $(this).find(".hour").text().trim();
        $(this).find(".description").val(tasks[index]);
    });

}

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

 
        if (listTime.isBefore(currentHour))
        {
            $(this).find(".description").addClass("past");
        }else 
        if (listTime.isAfter(currentHour))
        {
            $(this).find(".description").addClass("future");
        } else 
        if (listTime.isSame(currentHour))
        {
            $(this).find(".description").addClass("present");
        }
    });
}

// $(".description").on("change", function()
// {
//     var index = "time"+ $(this).closest(".row").find(".hour").text().trim();
//     tasks[index] = $(this).val();
// });
$(".time-block").on("click",function()
{
    $(this).find(".description").trigger("focus");
    console.log("focus");
});


$(".saveBtn").on("click", function()
{
    $(this).closest(".time-block").find(".description").trigger("blur");
    console.log("blur");
    var index = "time"+ $(this).closest(".row").find(".hour").text().trim();
    tasks[index] = $(this).closest(".row").find(".description").val();
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);
loadTasks();
checkTime();
setInterval(checkTime,(60*1000));