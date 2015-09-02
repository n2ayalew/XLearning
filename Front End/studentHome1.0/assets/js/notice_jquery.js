/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

            STUDENT NOTICE

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


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

  var date = document.createElement('div');
  date.setAttribute('class', 'noticeDate');
  console.log('date: ------->'+ newNotice.dateCreated);
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


//============================SETTING INTERACTIVE NOTICE CREATOR===================//
$(document).ready( function () {
  refreshNoticeList();
});