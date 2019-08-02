var selectedFixer
$(".card").on("click", function() {
    $("#" + selectedFixer).removeClass("pressed")
    selectedFixer = $(this).attr("id")
    $("#" + selectedFixer).addClass("pressed")
    $('#fixerInput').attr('value', selectedFixer)
   // $('#selectFixerForm').submit()
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
// let selectedFixer
// $('.card').on('click', function(){

// })

