


var testSendTeacher = new questionClass();
var testSendStudent = new answerClass();


//=====================SETTING VARIABLES/DOM ELEMENTS ==============================//
var submitButtonTeacher = $('#submitButtonTeacher');
var wallTeacher = $('#wallTeacher');


//++++++++++++++++++++++CLASSES+++++++++++++++++++++++++++++++++++++//

//=====================QUESTION CLASS==============================//
function questionClass() {
  this.type = 'question';
  this.ID;
  this.dateCreated = (new Date()).toDateString();
  this.message = '';
  this.answer = '';
  this.user;
  this.isAnswered = false;
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





//++++++++++++++++++++++COMMUNICATIONS+++++++++++++++++++++++++++++++++++++//

//======================RECEIVE QUESTION FROM STUDENT====================//
function fetchQuestion(incoming, teacherCopy) {
  var previousId = -1;
  setInterval(
    function() {
      if(previousId != incoming.ID && incoming.ID >=0) {
      teacherCopy.ID = incoming.ID;
      teacherCopy.user = 't';
      teacherCopy.dateCreated = incoming.dateCreated;
      teacherCopy.message = incoming.message;
      previousId = incoming.ID;
      addQuestionTeacher(teacherCopy);
      }
    }
  , 1000);
}

//======================SEND ANSWER TO STUDENT============================//
function sendAnswer(answer) {
  testSendStudent.message = answer.message;
  testSendStudent.ID = answer.ID;
  testSendStudent.dateCreated = answer.dateCreated;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//======================ADD QUESTION============================//
function addQuestionTeacher(question) {
  var message = question.message;
  var date = question.dateCreated;
  var Id = question.ID;
  var user = question.user;
  wallTeacher.append('<div id="' + user + Id + '" class="question"><button class="deleteButton" onClick = "deleteQuestion(\'' + user + '\',\'' + Id + '\' )"></button><div class="date">'+ date +'</div><div id="message'+ user + Id + '" class="message">' + message + '</div></div>'); 
  $('#'+user+Id).append('<textarea id="answerBox'+ user + Id +'" cols="auto" rows="3" class="answerBox"></textarea>');
  $('#'+user+Id).append('<button id="answerButton' + user + Id + '" class="answerButton" onClick = "answerQuestion(\'' + user + '\',\'' + Id + '\' )">ANSWER</button>');
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

//======================ANSWER QUESTION============================//

function answerQuestion(user, id) {
  var teacherAnswer = new answerClass();
  teacherAnswer.message = $('#answerBox'+user+id).val();
  teacherAnswer.ID = id;
  teacherAnswer.user = 't';
  sendAnswer(teacherAnswer); 
  minimize(user,id, teacherAnswer.message);
  changeColor(teacherAnswer);
}


//======================HIDE ANSWER BOX===============================//
function  hideAnswerBox(user, id) {
  $('#answerBox'+user+id).slideUp();
  $('#answerButton'+user+id).slideUp();
}

//======================ADD NEW MINIMIZED CONTENT========================//
function minimize (user, id, message) {
  hideAnswerBox(user,id);
  setTimeout( function() {
    $('#'+user+id).append('<div id="answer' + user + id +'" class="answer">'+ message +'</div>');
  }, 600);
}

//======================CHANGE COLOR============================//
function changeColor(answer) {
  var Id = answer.ID;
  var user = answer.user;
  $('#'+user+Id).css('background', '#fafafa');
  $('#message'+user+Id).css('color', '#FE6356');
}

//===============SETTING INTERRACTIVE BUTTONS & RESPONSIVE LAYOUT=======================================//
$(document).ready(
  function() {
    var teacherCopy = new questionClass();
    fetchQuestion(testSendTeacher, teacherCopy);
  }
);


