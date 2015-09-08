var position = 0;
$(document).ready( function() {
  $('#backButton').click( function() {
    if(position != 1) {
      if(position == '2T') {
        registrationTeacher.removeClass();
        registrationTeacher.addClass("animated slideOutRight short ");
      }
      if(position == '2S') {
        registrationStudent.removeClass();
        registrationStudent.addClass("animated slideOutRight short");
      }
      position = 1;
      teacherOrStudent.removeClass();
      teacherOrStudent.addClass("animated slideInLeft short");
    }
    else {
      teacherOrStudent.removeClass();
      teacherOrStudent.addClass("animated slideOutRight short");
      loginForm.removeClass();
      title.removeClass();
      brackets.removeClass();
      icon.removeClass();
      title.addClass("animated slideInDown");
      brackets.addClass("animated slideInDown");
      icon.addClass("animated slideInUp");
      loginForm.addClass("animated fadeInDown");
      position = 0;
      $('#backButton').removeClass();
      $('#backButton').addClass("animated fadeOut short");
    }
  });
});
//======================BUTTONHOVER============================//

function buttonHover(element) {
  var button = $(element);
  button.mouseenter(
    function() {
      button.css('background', '#121415');
    }
  );

  button.mouseleave(
    function () {
      button.css('background', '#1D718D');
    }
  );
}

//======================SLIDE FORM============================//
function exitLogin() {
  loginForm.removeClass("animated fadeInDown");
  loginForm.addClass("animated fadeOutLeftBig");
  title.removeClass("animated slideInDown");
  title.addClass("animated fadeOutUpBig")
  brackets.removeClass("animated slideInDown");
  brackets.addClass("animated fadeOutUpBig"); 
  icon.removeClass("animated slideInUp");
  // icon2.removeClass("animated slideInUp");
  icon.addClass("animated slideOutDown short");
  // icon2.addClass("animated slideOutDown short");
}


function enterTeacherOrStudent() {
  $('#backButton').css('visibility','visible');
  $('#backButton').removeClass();
  $('#backButton').addClass("animated fadeIn short");
  teacherOrStudent.removeClass();
  teacherOrStudent.css('visibility', 'visible');
  teacherOrStudent.addClass("animated slideInRight short");

}
function exitTeacherOrStudent() {
  teacherOrStudent.removeClass();
  teacherOrStudent.addClass("animated fadeOutLeftBig");
}
function enterRegistration(registration) {
  registration.removeClass();
  registration.css('visibility','visible');
  registration.addClass("animated slideInRight short");
}

//======================CHECK INPUT===============================//
function getInput() {
  if(isTeacher){
     password1 = $('#passwordT1').val();
     password2 = $('#passwordT2').val();
    }
    else{
      password1 = $('#passwordS1').val();
      password2 = $('#passwordS2').val();
    }
}
function comparePW() {
  if(password1 != password2) {
    alert("Password does not Match!");
  }
}
//=====================SETTING VARIABLES/OBJECTS ==============================//
var login = $('#button1');
var register = $('#button2');
var menu = $('#menu');
var header = $('#header');
var title = $('#title');
var brackets = $('#brackets');
var icon = $('#icon');
var star = $('#star');
var loginForm = $('#loginForm');
var logo = $('#logo');
var registrationStudent = $('#registrationStudent');
var registrationTeacher = $('#registrationTeacher');
var registrationForm = $('#registrationForm');
var teacherOrStudent = $('#teacherOrStudent');
var teacherButton = $('#TB');
var studentButton = $('#SB');
var teacher = $('#teacherButton');
var student = $('#studentButton');
var done = $('#button3');
var done2 = $('#button4');
var password1;
var password2;
var isTeacher = false;
var width;
var height;
//============================HIDDING REGISTRATION PAGE=======================================//
$(document).ready(
  function() {
    registrationStudent.css('visibility', 'hidden');
    registrationTeacher.css('visibility', 'hidden');
    teacherOrStudent.css('visibility', 'hidden');
  }
);

//============================SETTING INTERRACTIVE BUTTONS=======================================//
$(document).ready(
  function() {
    buttonHover(login);
    buttonHover(register);
    buttonHover(done);
    buttonHover(done2);
    width = $(window).width();
    height = $(window).height();
    if(width <= 768){
      teacher.css('left','50%');
      teacher.css('margin-top', '50px');
      student.css('left', '50%');
      student.css('margin-top','-200px');
    }
  }
);


//======================ANIMATING PAGE LOAD=============================================//
$(document).ready(
  function() {
    title.addClass("animated slideInDown");
    brackets.addClass("animated slideInDown");
    icon.addClass("animated slideInUp");
    loginForm.addClass("animated fadeInDown");
  }

);

//=========================EXIT LOGIN PAGE==========================================//
$(document).ready(
  function() {
    register.click(
      function() {
        position = 1;
        console.log('position: ' + position);
        exitLogin();
        enterTeacherOrStudent();
        studentButton.click(
          function() {
            position = '2S';
            console.log('position: ' + position);
            exitTeacherOrStudent();
            enterRegistration(registrationStudent);
            
            done.click(
              function() {
                getInput();
                comparePW();
              }
            );
          }
        );

        teacherButton.click(
          function() {
            position = '2T';
            console.log('position: ' + position);            
            isTeacher = true;
            exitTeacherOrStudent();
            enterRegistration(registrationTeacher);

            done2.click(
              function() {
                getInput();
                comparePW();
              }
            );
          }
        );
      }
    );
  }
);
