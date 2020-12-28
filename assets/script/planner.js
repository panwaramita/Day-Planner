/*function after the page load */
$(document).ready(function () {
  /*variable to store the current date*/
  var currentDay = moment().format('dddd, MMMM Do');
  $("#currentDay").text(currentDay);

  /*when user save the event click event handeler is called */
  $(".saveBtn").click(function () {
    var text = $(this).siblings(".schedule").val();
    var parent = $(this).parent().attr("id");
    if(text!==''){
    localStorage.setItem(parent, text);
    alert("The event is saved.");
    }
    else
    {
      alert("enter the event.");
    }
  });

  /*check if the localstoreage store any value */
  if (localStorage.length > 0) {
    $(".time-block").each(function () {
      var id = $(this).attr("id");
      var text = localStorage.getItem(id);
      /*if the localstorage is not empty based on the key value display the event */
      if (text != null) {
        $(this).children("textArea").val(text);
      }
    });
  }

  /* once the page load based on the time display the events*/
  $(".time-block").each(function () {
    /*if the current time is less then change the textarea class to future*/
    if ($(this).attr("id") > moment().hours()) {

      $(this).children("textArea").addClass("future");
    }
    /*if the current time is greater then change the textarea class to past*/
    else if ($(this).attr("id") < moment().hours()) {
      var child = $(this).children("saveBtn");
      $(this).children("textArea").attr("readonly", "readonly");
      $(this).children("button").attr("disabled", "true");
      $(this).children("button").removeClass("saveBtn");
      $(this).children("button").addClass("disabbleBtn");
      $(this).children("textArea").addClass("past");
    }
    /*if the current time is equals then change the textarea class to present*/
    else if ($(this).attr("id") == moment().hours()) {
      //alert("hi");
      $(this).children("textArea").addClass("present");
    }
  });
});