//======================BUTTONHOVER============================//
function buttonHover(element) {
  var button = $(element);
  button.mouseenter(
    function() {
      button.css('background', '#3E4147');
    }
  );

  button.mouseleave(
    function () {
      button.css('background', '#5EC8BE');
    }
  );
}
//======================CREATE  POST============================//
function  createPost(post, wall) {
  var post = $(post);
  var wall =$(wall);
  wall.append(post);
}
//=====================SETTING VARIABLES/OBJECTS ==============================//
var submitButton = $('#submitButton');
var wall = $('#wall');
var $post = $('#post');
var submitButton = $('#submitButton');
var test = $('#test');
//============================SETTING INTERRACTIVE BUTTONS & RESPONSIVE LAYOUT=======================================//
$(document).ready(
  function() {
    buttonHover(submitButton);
    submitButton.click(
      function() {
       $('#wall').append('<div id="post"><button id="deleteButton"></button><div id="message">Lorem ipsum dolor sit am wefw ee  f wefwefet, consectetur adipiscing elitefwefwefwfwefw, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure </div><div id="divider"><img src="assets/img/divider_dots.svg" height="8px"></div></div>');
      }
    );
  }
);