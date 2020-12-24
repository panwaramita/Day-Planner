/*function after the page load */
$(document).ready(function () {
  /**/
  var currentDay = moment().format('dddd MMMM Do');
  $("#currentDay").text(currentDay);

  $(".saveBtn").click(function () {
    var text = $(this).siblings(".schedule").val();
    var parent = $(this).parent().attr("id");
    localStorage.setItem(parent, text);
    alert("The day activity is saved");
  });
  if (localStorage.length > 0) {
    $(".time-block").each(function () {
      var id = $(this).attr("id");
      var text = localStorage.getItem(id);
      if (text != null) {
        $(this).children("textArea").val(text);
        console.log("localstoragevalue", text);
      }
    });
  }
  $(".time-block").each(function () {
    console.log("time", moment().hours());
    console.log($(this).attr("id"));
    if ($(this).attr("id") > moment().hours()) {

      $(this).children("textArea").addClass("future");
    }
    else if ($(this).attr("id") < moment().hours()) {
      var child = $(this).children("textArea");
      console.log("child", child);
      $(this).children("textArea").attr("readonly", "readonly");
      $(this).children("textArea").addClass("past");
    }
    else if ($(this).attr("id") == moment().hours()) {
      //alert("hi");
      $(this).children("textArea").addClass("present");
    }
  });
});