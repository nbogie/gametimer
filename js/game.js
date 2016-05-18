"use strict";

$(document).ready(function(){
  $(document).foundation();

  $('#addPlayerButton').bind('click', addPlayer);
  setInterval(updateTimers, timerStepSize());
});

function timerStepSize(){
  return 500;
}

function msToTimeString(ms){
  return new Date(ms).toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC'});
}

function updateTimers(){
  var runningTimers = $('.timerRunning');
  var updateTimer = function(ix, elem){
    var timer = $(elem);
    var timeElapsed = parseInt(timer.attr("data-time-elapsed"));
    timeElapsed += timerStepSize();
    timer.attr("data-time-elapsed", timeElapsed);
    timer.html(msToTimeString(timeElapsed));
  }
  
  runningTimers.each(updateTimer);

  $('.timerNeedsRedraw').each(function(ix, elem){
    var timer = $(elem);
    var timeElapsed = parseInt(timer.attr("data-time-elapsed"));
    timer.html(msToTimeString(timeElapsed));
    timer.removeClass("timerNeedsRedraw");
  });

}

function deletePlayer(obj){
  $(obj).parent().parent().parent().remove();
}

function numPlayers(){
    return $('#playerList li').size();
}

function currentTimeMs() {
  return (new Date()).getTime();
};

function findParentTimer(elem){
  return $(elem).parent().parent().find('.playerTime');
}

function startTimer(elem){
  var timerElem = findParentTimer(elem);
  $(timerElem).addClass("timerRunning");
}
function stopTimer(elem){
  var timerElem = findParentTimer(elem);
  $(timerElem).removeClass("timerRunning");
}
function resetTimer(elem){
  var timerElem = findParentTimer(elem);
  $(timerElem).attr("data-time-elapsed", 0);
  $(timerElem).addClass("timerNeedsRedraw");
}

function addPlayer(opts){
  var c = $('#playerColorInput').val();
  console.log("color picked: " + c);
  var cloned = $('#playerLiToClone').clone();
  
  cloned.removeAttr("id");
  cloned.removeAttr("style");
  
  
  var cd = cloned.find(".colorDisplay");
  cd.attr("style", "background: "+c);
  var timerElem = cloned.find(".playerTime");
  timerElem.attr("data-time-added", currentTimeMs());
  timerElem.attr("data-time-elapsed", 0);
  timerElem.toggle(".timer-running");
  cloned.appendTo('#playerList');
}
