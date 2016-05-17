"use strict";

$(document).ready(function(){
  $(document).foundation();

  $('#addPlayerButton').bind('click', addPlayer);
//      topic: $('#topicInputModal #topicInput').val(), 
});

function deletePlayer(obj){
  $(obj).parent().parent().parent().remove();
}

function numPlayers(){
    return $('#playerList li').size();
}

function addPlayer(opts){
  var c = $('#playerColorInput').val();
  console.log("color picked: " + c);
  $("<li><div class='row'>"+
      "<div class='small-2 columns'>"+
        "<input type='text' class='playerNameInput' value='"+c+"'/>"+
      "</div>"+
      "<div class='small-2 columns' style='background: "+c+"'>"+
        "<span>.</span>"+
      "</div>"+
      "<div class='small-2 columns'>"+
        "<span class='playerTime'>0:00</span>"+
      "</div>"+
      "<div class='button-group small-4 columns'>"+
          "<a href='#' class='button startButton'>Start</a>"+
          "<a href='#' class='button stopButton'>Stop</a>"+
          "<a href='#' class='button resetButton'>Reset</a>"+
          "<button type='button' class='button deletePlayer alert' onclick='deletePlayer(this);'>Delete</button>"+
      "</div>"+
      "</div></li>").appendTo('#playerList');
}
