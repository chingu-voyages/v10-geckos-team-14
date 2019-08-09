var selectedFixer
$(".card").on("click", function() {
    $("#" + selectedFixer).removeClass("pressed")
    selectedFixer = $(this).attr("id")
    $("#" + selectedFixer).addClass("pressed")
    $("." + selectedFixer).modal('show')
    $('#fixerInput').attr('value', selectedFixer)
})
$('#booking-submit-btn').on('click', function(){
    if($('#fixerInput').attr('value') === 'no-fixer'){
        $('#NoFixerModalCenter').modal('show')
    }
}) 
$('.fixer-btn').on('click',function(){
    $('#inputAddress1').focus()
})  
var selectedService
$('.service-img').on('click', function(){
    $(this).addClass('pressed-Service')
    setTimeout(() => {
        $(this).removeClass('pressed-Service')
    }, 200)
    selectedService = $(this).attr("name")
    $('#'+ selectedService).submit()
    selectedService = undefined
})
var valueStart, valueStop, hourStart, hourEnd, minuteStart, minuteEnd, diffForFee
$('#inputStartTime').on("input", function(){
    valueStart = $(this).val()
   // console.log(valueStart)
    hourStart = new Date("01/01/2007 " + valueStart).getHours();
    minuteStart = new Date ("01/01/2007 " + valueStart).getMinutes();
    timeDifferenceCalc ()
})
$('#inputStopTime').on("input", function(){
    valueStop = $(this).val()
    hourEnd = new Date("01/01/2007 " + valueStop).getHours()
    minuteEnd = new Date ("01/01/2007 " + valueStop).getMinutes();
    timeDifferenceCalc ()  
})

function timeDifferenceCalc (){
    var hourDiff = hourEnd-hourStart
    var minuteDiff = minuteEnd - minuteStart;
    //console.log('minute-diff'+minuteDiff)
    if (minuteDiff < 0) {
        hourDiff = hourDiff - 1
        minuteDiff = - (minuteDiff)
    }
    if (minuteDiff !==0){
        diffForFee = hourDiff + 1
    }else{
        diffForFee = hourDiff
    }
    //console.log(hourDiff+' Hrs'+ minuteDiff+' mins.');
    var timeDiff = hourDiff+' Hrs '+ minuteDiff+' mins'
    $('#inputHours').attr('value', diffForFee)
    if(timeDiff === 'NaN Hrs NaN mins'){
        $('.timeDiff').addClass('hidden')
    } else{
        $('.timeDiff').text(timeDiff)
        $('.timeDiff').show() 
    }
}
$('.input-check').on('input', function(){
    $('.error-msg').hide()
})
