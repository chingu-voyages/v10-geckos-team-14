var selectedFixer
$(".card").on("click", function() {
    $("#" + selectedFixer).removeClass("pressed")
    selectedFixer = $(this).attr("id")
    $("#" + selectedFixer).addClass("pressed")
})
