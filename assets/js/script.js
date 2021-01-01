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
    else
    {
        $("li").each(function() 
        {
            var index = "time"+ $(this).find(".hour").text().trim();
            $(this).find(".description").val(tasks[index]);
        });
    }
    checkTime();
}


var checkTime = function()
{
    var currentHour = moment().format("hA");
    $("li").each(function() 
    {
        var list = $(this).find(".hour").text().trim();
        var listTime = moment(list,"hA");
        currentHour = moment(currentHour,"hA");
 
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

$(".saveBtn").on("click", function()
{
    var index = "time"+ $(this).closest(".row").find(".hour").text().trim();
    tasks[index] = $(this).closest(".row").find(".description").val();
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);
loadTasks();
setInterval(checkTime,(60*1000));