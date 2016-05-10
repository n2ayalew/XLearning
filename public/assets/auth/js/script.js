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
  teacherOrStudent.css('visibility', 'visible');
  teacherOrStudent.addClass("animated slideInRight short");

}
function exitTeacherOrStudent() {
   teacherOrStudent.removeClass("animated slideInRight short");
  teacherOrStudent.addClass("animated fadeOutLeftBig");
}
function enterRegistration(registration) {
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
    title.addClass("animated slideInDown short");
    brackets.addClass("animated slideInDown short");
    icon.addClass("animated slideInUp short");
    // icon2.addClass("animated slideInUp");
    // star.addClass("animated rotateIn");
    loginForm.addClass("animated fadeInDown short")
  }

);

//=========================EXIT LOGIN PAGE==========================================//
$(document).ready(
  function() {
    register.click(
      function() {
        exitLogin();
        enterTeacherOrStudent();
        studentButton.click(
          function() {
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
