var checkTime = function()
{
    var currentHour = "12PM";// moment().format("hA");
    // currentHour= parseInt(currentHour);
    $("li").each(function() 
    {
        var list = $(this).find(".hour").text().trim();
        var listTime = moment(list,"hA");

        currentHour = moment(currentHour,"hA");
        console.log(listTime);
        console.log(currentHour);
        if (listTime.isBefore(currentHour))
        {
            $(this).find(".description").addClass("past");
            console.log("Before");
        }else 
        if (listTime.isAfter(currentHour))
        {
            $(this).find(".description").addClass("future");
            console.log("After");
        } else 
        if (listTime.isSame(currentHour))
        {
            $(this).find(".description").addClass("present");
            console.log("same");
        }
        
    });

    //$("ul").children().each( console.log($(this)));

    // if($(".hour").text().trim() === currentHour)
    // {
    //     $(".hour").text("RAED");
    // };
}

var today = moment().format("dddd, MMMM Do");
$("#currentDay").text(today);
checkTime();

setInterval(checkTime,(60*1000));