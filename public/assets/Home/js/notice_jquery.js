//======ADDING NOTICE TO LOCAL DATABASE AND THEN REFRESHING UI===========================//
function addNotice(f) {
  var form = f;
  newNotice = new notice();
  newNotice.message = $('#announcement').val();

  //console.log('saving new message: '+newNotice.message);
  ///////////////NEEDS TO SET THE TEACHER ID LATER//////////
  var temp =[];
  var str = $('#newNoticeClassPicker').val().toString();
  temp =  str.split(':');
  newNotice.classID = temp[0];
  newNotice.className = temp[1];

  //$('#announcement').val('');
  //$('#newNoticeClassPicker').val('0');

  /////////////SEND TO SERVER ///////////////////
  $.ajax({
    method:'POST',
    url:'announcement',
    data: form.serialize(),
    success: function(response){
      newNotice.noticeID = response;
      $('#miniAlert4').append('YOUR POST HAS BEEN SUBMITTED');
      setTimeout( function() {
          $('#miniAlert4').empty();
      },2000);
      noticeList.saveNotice(newNotice);
      refreshNoticeList();
      $('#newNoticeClassPicker').val("0");
      $('#announcement').val("");
    }
  });
  ////////////////GET ID////////////////////////

  //////////////SET ID IN LOCAL DB//////////////
}

//======DELETING NOTICE TO LOCAL DATABASE AND THEN REFRESHING UI===========================//
function deleteNotice(index) {
  //console.log('deleting message with index:'+index);
  /////////////REQUEST SERVER TO DELETE ///////////
  ////////////////SEND ID TO SERVER////////////////////////
  if (!deleteAnnouncementConfirmation){
    confirmDeleteAnnouncement("Are you sure you would like to remove this Announcement?", index);
  }
  else{
    deleteAnnouncementConfirmation = false;
    var id  = noticeList.getList()[index].noticeID;
    $.ajax({
      url:'/announcement/remove/'+ id,
      success: function(response){
        //////////////DELETE IN LOCAL DB//////////////
        document.getElementById("bigAlert").innerHTML = "The Announcement has been deleted!";
        $('.overlay').css('visibility', 'visible');
        $('#bigAlert-container').css('visibility', 'visible');
        setTimeout( function() {
          $('.overlay').fadeOut('fast');
          $('#bigAlert-container').fadeOut('fast');
        }, 2000);
        noticeList.deleteNotice(index);
        $('#notice-'+index).slideUp();
        setTimeout( function() {
          refreshNoticeList();
        },500);
      }
    });
  }
}


//==============================REFRESH THE NOTICE LIST===================================//
function refreshNoticeList() {
  $('#noticeList').empty();

  if(noticeList.isEmpty()) {
    $('#noticeList').append('<div>NO ANNOUNCEMENTS</div>');
  }
  else {
    var noticeArray = [];
    noticeArray = noticeList.getList();
    var size = noticeArray.length;
    for(var i=0; i<size; i++) {
      appendNoticeDOM(noticeArray[i],i);
    }
  }
  return;
}


//==============================APPEND NOTICE TO UI===================================//
function createNoticeDOM (newNotice, index) {// index in array NOT IN BACKEND DATABASE
  var e = document.createElement('div');
  e.setAttribute('id', 'notice-'+index);
  e.setAttribute('class', 'noticeElement');

  var deleteButton = document.createElement('button');
  deleteButton.setAttribute('onclick', 'deleteNotice('+index+','+newNotice.noticeID+')');
  deleteButton.setAttribute('class', 'deleteButton');

  e.appendChild(deleteButton);

  var date = document.createElement('div');
  date.setAttribute('class', 'noticeDate');
  //console.log('date: ------->'+ newNotice.dateCreated);
  date.innerHTML =newNotice.dateCreated; 

  e.appendChild(date);

  var class_ = document.createElement('div');
  class_.setAttribute('class', 'noticeClass');
  class_.innerHTML = 'Class: '+ newNotice.className;

  e.appendChild(class_);

  var message = document.createElement('div');
  message.setAttribute('class', 'noticeMessage');
  var text = newNotice.message;
  text = text.replace(/(?:\r\n|\r|\n)/g, '<br />'); // so that line break appears
  message.innerHTML = text;
  e.appendChild(message);

  return e;
}
function appendNoticeDOM(newNotice,index) {
  var e = createNoticeDOM(newNotice, index);
  var noticeList = document.getElementById('noticeList');
  noticeList.appendChild(e);
}

//==============================CHECK INPUT===================================//
function correctInputNewNotice() {
  //console.log('checking input');  
  if($('#announcement').val() != '' && $('#newNoticeClassPicker').val() !='0') {
        //console.log('right input');        
        return true;
  }
  //console.log('wrong input');
  var miniAlert = document.getElementById('miniAlert4');
  miniAlert.innerHTML = "SOME INFORMATION IS MISSING PLEASE FILL THEM OUT";
  setTimeout( function() {
      $('#miniAlert4').empty();
  },2000);
  return false;
}
//============================SETTING INTERACTIVE NOTICE CREATOR===================//
$(document).ready( function () {
  $.ajax({
    method: 'GET',
    url: '/announcement',
    success: function(result){
      var str, lst;
      var announs = result['announcements'];
      var classes = result['classes'];
      console.log(announs);
      console.log(classes);
      for (var i = 0; i < announs.length; i++){
        var temp = new notice();
        lst = announs[i].created_at.split(' ');
        str = lst[0].split('-');
        temp.dateCreated = str[2]+' '+str[1]+' '+str[0];
        temp.noticeID = announs[i].id;
        temp.teacherID = announs[i].teacher;
        temp.classID = announs[i].classe_id;
        for (var j = 0; j < classes.length; j++){
          if (temp.classID == classes[j].class_id){
            temp.className = classes[j].subject;
          }
        }
        temp.message = announs[i].announcement;
        noticeList.saveNotice(temp);
        refreshNoticeList();
      }
    }
  });
  $('#newNoticeButton').click( function () {
    $('.overlay').css('visibility', 'visible').hide().fadeIn('fast');
    $('#newNotice-container').css('visibility', 'visible').hide().fadeIn('fast');
  });

  $('#closeNewNotice').click( function() {
    $('.overlay').fadeOut('fast');
    $('#newNotice-container').fadeOut('fast');
  });

  $('#newAnnouncementForm').on( 'submit', function(e) {
    e.preventDefault();
    //console.log('button pressed');
    if(correctInputNewNotice()) {
      //console.log('right input adding');
      addNotice($(this));
    }
  });

});