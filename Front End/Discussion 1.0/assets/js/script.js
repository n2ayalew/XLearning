//=====================SETTING VARIABLES/DOM ELEMENTS ==============================//
var submitButton = $('#submitButton');
var wall = $('#wall');
var submitButton = $('#submitButton');
var text;
var counter = 0;


//=====================POST CLASS==============================//
function postClass() {
  this.ID;
  this.dateCreated = (new Date()).toDateString();
  this.message = "Nothing";
}

//======================GENERATE ID============================//
function generateID() {
  return parseInt(counter++);
}

//======================ADD POST============================//
function addPost(post) {
  var message = post.message;
  var date = post.dateCreated;
  var Id = post.ID;
  wall.append('<div id="'+ Id +'" class="question"><button class="deleteButton" onClick = "deletePost(' + Id + ')"></button><div class="date">'+ date +'</div><div class="message">' + message + '</div></div>');
  $('#messageBox').val(''); // reset text area.
}

//======================DELETE POST============================//
function deletePost(id) {
  $('#'+id).slideUp();
}
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


//============================SETTING INTERRACTIVE BUTTONS & RESPONSIVE LAYOUT=======================================//
$(document).ready(
  function() {
    buttonHover(submitButton);
    submitButton.click(
      function() {
        if(($('#messageBox').val()) != '') {
          var post  = new postClass(); // creating temporary instance of postClass.
          post.ID = generateID();
          post.message = ($('#messageBox').val());
          addPost(post);
          //alert( temp.ID +": " + temp.message + ": "+ temp.dateCreated); // for debugging
        }
      }
    );
  }
);


