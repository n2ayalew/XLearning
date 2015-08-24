
var testSendTeacher = new questionClass();
var testSendStudent = new answerClass();



//=====================SETTING VARIABLES/DOM ELEMENTS ==============================//
var submitButtonStudent = $('#submitButtonStudent');
var wallStudent = $('#wallStudent');
var counter = 0;



//++++++++++++++++++++++CLASSES+++++++++++++++++++++++++++++++++++++//

//=====================QUESTION CLASS==============================//
function questionClass() {
  this.type = 'question';
  this.ID;
  this.dateCreated = (new Date()).toDateString();
  this.message = '';
  this.answer = '';
  this.user;
}
//=====================QUESTION CLASS==============================//
function answerClass() {
  this.type = 'answer';
  this.ID;
  this.dateCreated = (new Date()).toDateString();
  this.message = '';
  this.user;
  isAnswered = true;
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//


//======================GENERATE ID============================//
function generateID() {
  return parseInt(counter++);
}

//======================ADD QUESTION============================//
function addQuestionStudent(question) {
  var message = question.message;
  var date = question.dateCreated;
  var Id = question.ID;
  var user = question.user;
  wallStudent.append('<div id="' + user + Id + '" class="question"><button class="deleteButton" onClick = "deleteQuestion(\'' + user + '\',\'' + Id + '\' )"></button><div class="date">'+ date +'</div><div id="message' + user + Id +'"class="message">' + message + '</div></div>');
}




//++++++++++++++++++++++COMMUNICATIONS+++++++++++++++++++++++++++++++++++++//

//======================RECEIVE ANSWER FROM TEACHER=================//
function fetchAnswer(incoming, studentCopy) {
  var previousId = -1;
  setInterval(
    function() {
      if(previousId != incoming.ID && incoming.ID >=0) {
      studentCopy.ID = incoming.ID;
      studentCopy.user = 's';
      studentCopy.dateCreated = incoming.dateCreated;
      studentCopy.message = incoming.message;
      studentCopy.isAnswered = true;
      if(studentCopy.isAnswered == true);
        changeColor(studentCopy);
      previousId = incoming.ID;
      addAnswerStudent(studentCopy);
      }
    }
  , 1000);
}

//======================SEND QUESTION TO TEACHER====================//
function sendQuestion(question) {
  testSendTeacher.message = question.message;
  testSendTeacher.dateCreated = question.dateCreated;
  testSendTeacher.ID = question.ID;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//======================ADD ANSWER============================//
function addAnswerStudent(answer) {
  var message = answer.message;
  var date = answer.dateCreated;
  var Id = answer.ID;
  var user = answer.user;
  $('#s'+Id).append('<div id="#answer' + user + Id +'" class="answer">'+ message +'</div>');
}


//======================CHANGE COLOR============================//
function changeColor(answer) {
  var Id = answer.ID;
  var user = answer.user;
  $('#'+user+Id).css('background', '#fafafa');
  $('#message'+user+Id).css('color', '#FE6356');
}


//======================DELETE QUESTION============================//
function deleteQuestion(user, id){ 
  localDelete(user + id);
  globalDelete(user, id);
}

function localDelete(id) {
  $('#'+id).slideUp();
  setTimeout( function(){

      $('#'+id).remove();
      
  },1000);
}

function globalDelete(user, id) {
    if(user == 's')
      localDelete('t' + id);
    else
      localDelete('s' + id);
}


//=========SETTING INTERRACTIVE BUTTONS & RESPONSIVE LAYOUT=======================================//
$(document).ready(
  function() {
    var studentCopy = new answerClass();
    fetchAnswer(testSendStudent,studentCopy);
    submitButtonStudent.click(
      function() {
        if(($('#messageBoxStudent').val()) != '') {
          var questionStudent  = new questionClass(); // creating temporary instance of questionClass.
          questionStudent.ID = generateID();
          questionStudent.user = 's';
          questionStudent.message = ($('#messageBoxStudent').val());
          addQuestionStudent(questionStudent);
          $('#messageBoxStudent').val('');
          sendQuestion(questionStudent);
          //alert(testSend.ID);
          //alert( temp.ID +": " + temp.message + ": "+ temp.dateCreated); // for debugging
        }
      }
    );
  }
);

