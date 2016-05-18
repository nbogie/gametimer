"use strict";

//TODO: Record the time-started, and update elapsed time based on that and the current time.
//      Do not update incrementally with unreliable timers - they may be turned off

$(document).ready(function(){
  $(document).foundation();

  $('#addPlayerButton').bind('click', addPlayer);
  setInterval(updateTimers, timerStepSize());
});

function timerStepSize(){
  return 500;
}

function msToTimeString(ms){
  var d = new Date(ms);
  var s = d.getUTCSeconds();
  var m = d.getUTCMinutes();
  var h = d.getUTCHours();
  var msOnly = d.getUTCMilliseconds();
  function pad(n){
    return ((n < 10) ? "0" : "") + n;
  }
  return ""+pad(h) + ":"+pad(m) + ":"+pad(s);
  //some browsers will attach a timezone offset to the following
  //return new Date(ms).toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC'});
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
  $(obj).parentsUntil("#playerList", "li").remove();
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
  var cloned = $('#playerLiToClone').clone();
  
  cloned.removeAttr("id");
  cloned.removeAttr("style");
  
  var cd = cloned.find(".colorDisplay");
  cd.attr("style", "background: "+c);

  var timerElem = cloned.find(".playerTime");
  timerElem.attr("data-time-elapsed", 0);
  timerElem.toggle(".timer-running");

  cloned.appendTo('#playerList');

  //TODO: swipe right to remove player.  Use foundation Touch.js:
  //  timerElem.spotSwipe().on('swipeleft', handleLeftSwipe);
  // or use jquery mobile:
  // http://demos.jquerymobile.com/1.4.5/swipe-list/
}
