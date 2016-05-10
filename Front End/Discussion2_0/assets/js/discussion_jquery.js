/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                        TEACHER DISCUSION

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


//==============================GLOBAL VARIABLES===================================//
var currentDiscIndex = 0;



//==============================REFRESH THE DISCUSSION LIST===================================//
function refreshDiscList() {
    $('#discussionList').empty();
    if(discussionList.isEmpty()) {
        console.log('!!!!!!!!!!!!!!!!!discussionList EMPTY!!!!!!!!!!!!!!!!!!!');  /////////////////////////////////////////
        $('#discussionList').append('<div>NO DISCUSSIONS</div>');
    }
    else {
        var discArray = [];
        discArray = discussionList.getList();

        console.log('++++++++++++++++++++REFRESHING+++++++++++++++++');  /////////////////////////////////////////
        console.log(discArray);  /////////////////////////////////////////

        var size = discArray.length;
        for (var i=0; i <size; i++) {
            appendDiscDOM(discArray[i],i);
        }
    }
}
//===========================================OPEN DISCUSSION===================================//
function openDisc(index) {
    
    console.log('Opening discussion with index:' + index); ///////////////////////////////////
    $('.openedDisc').removeClass('openedDisc');
    $('#disc-'+index).addClass('openedDisc');
    currentDiscIndex = index;
    refreshCommList();
    refreshFullDetail();
}
//===========================================ADD DISCUSSION===================================//
// CREATE A NEW DISCUSSION OBJECT SET ITS PROPERTIES EXCEPT THE DISCUSSIONID FROM THE SERVER.
// POST IT TO SERVER.
// GET REPONSE ID FROM SERVER.
// SET NEW DISCUSSION OBJECT DISCUSSION ID PROPERTY.
// SAVE IT INTO THE CLIENT SIDE TEMPORARY DATABASE.

function addDisc() {
    newDisc = new discussionClass();
    newDisc.topic = $('#newDiscTitle').val();
    newDisc.postedByTeacher = true;
    // NEED TO SET POSTERNAME 
    // & POSTER ID

    newDisc.detail = $('#newDiscDetail').val();

    discussionList.saveDiscussion(newDisc);
    refreshDiscList();
    refreshFullDetail();
    refreshCommList();
}




//===========================================APPEND DISCUSSION TO UI===================================//
function createDiscDOM(newDiscussion, index) {
    var e =  document.createElement('div');
    e.setAttribute('id', 'disc-'+index);
    e.setAttribute('class', 'discElement');
    e.setAttribute('onclick', 'openDisc('+index+')');

    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('onclick', 'deleteDisc('+index+','+newDiscussion.discussionID+')');
    deleteButton.setAttribute('class', 'deleteButton');

    e.appendChild(deleteButton);

    var date = document.createElement('div');
    date.setAttribute('class', 'discDate');
    date.innerHTML = newDiscussion.dateCreated; 

    e.appendChild(date);

    var title = document.createElement('div');
    title.setAttribute('class', 'discTitle');
    title.innerHTML = newDiscussion.topic;

    e.appendChild(title);


    // shows only part of the whole details when clicking on it will reveal more
    var miniDetail = document.createElement('div');     
    miniDetail.setAttribute('class', 'discMiniDetail');
    var text = newDiscussion.detail;
    text = text.slice(0,40);
    miniDetail.innerHTML = text;

    e.appendChild(miniDetail);


    var poster = document.createElement('div');

    
    
    if(newDiscussion.postedByTeacher) {
        poster.setAttribute('class','discPosterTeacher');
        poster.innerHTML = 'Teacher: '+newDiscussion.posterName;
    }
    else {
        poster.setAttribute('class', 'discPoster');
        poster.innerHTML = newDiscussion.posterName;
    }
    
    e.appendChild(poster);

    return e;
}

function appendDiscDOM(newDiscussion, index) {
    var e = createDiscDOM(newDiscussion, index);
    var discList = document.getElementById('discussionList');
    discList.appendChild(e);
}

//===========================================DELETE DISCUSSION===================================//
function deleteDisc(iDisc,discussionID) {
    discussionList.deleteDiscussion(iDisc);
    /////////////REQUEST SERVER TO DELETE ///////////
    ////////////////SEND ID TO SERVER////////////////////////
    //////////////DELETE IN LOCAL DB//////////////
    $('#disc-'+iDisc).slideUp();
    setTimeout( function() {
    refreshDiscList();
    },500);    
}

//===========================================ADD COMMENT===================================//
// CREATE A NEW COMMENT OBJECT SET ITS PROPERTIES EXCEPT THE COMMENT ID FROM THE SERVER.
// POST IT TO SERVER.
// GET REPONSE ID FROM SERVER.
// SET NEW COMMENT OBJECT COMMENT ID PROPERTY.
// SAVE IT INTO THE CLIENT SIDE TEMPORARY DATABASE.

function addComm() {
    newComm = new commentClass();
    newComm.message = $('#commentBox').val();
    newComm.postedByTeacher = true;
    // NEED TO SET POSTER ID AND POSTER NAME LATER.
    // NOW POST TP SERVER AND GET COMMENT ID.
    // SET THE ID OF THE COMMENT AND PUSH IT IN THE CLIENT SIDE DB.    
    discussionList.saveComment(currentDiscIndex, newComm);
    refreshCommList();
}


//===========================================APPEND COMMENT TO UI===================================//
function createCommDOM(newComment, index) {
    var e = document.createElement('div');
    e.setAttribute('class', 'commElement');
    e.setAttribute('id', 'comm-'+index);

    var deleteButton = document.createElement('div');
    deleteButton.setAttribute('class', 'deleteButton');
    deleteButton.setAttribute('onclick', 'deleteComm('+currentDiscIndex+','+index+','+newComment.commentID+')');

    e.appendChild(deleteButton);

    var date = document.createElement('div');
    date.setAttribute('class', 'commDate');
    date.innerHTML = newDiscussion.dateCreated; 

    e.appendChild(date);

    var poster = document.createElement('div');

    if(newComment.postedByTeacher) {
        poster.setAttribute('class', 'commPosterTeacher');
        poster.innerHTML = 'Teacher: '+ newComment.posterName;
    }
    else {
        poster.setAttribute('class', 'commPoster');
        poster.innerHTML = newComment.posterName;
    }

    e.appendChild(poster);

    var message = document.createElement('div');
    message.setAttribute('class', 'commMessage');
    var text = newComment.message;
    text = text.replace(/(?:\r\n|\r|\n)/g, '<br />'); // so that line break appears
    message.innerHTML = text;
    
    e.appendChild(message);

    console.log('HERE IS E: ');
    console.log(e);

    return e;
}

function appendCommDOM(newComment,index) {
    
    console.log('creating Comment DOM.') ////////////////////////////////////


    var e = createCommDOM(newComment, index);
    var commList = document.getElementById('commentList');
    commList.appendChild(e);
}

//==============================REFRESH THE COMMENT LIST===================================//
function refreshCommList() {
    $('#commentList').empty();
    if(discussionList.isCommEmpty(currentDiscIndex)) {
        console.log('NO COMMENTS');
        $('#commentList').append('<div>NO COMMENTS</div>');
    }
    else {
        var commList = [];
        commList = discussionList.getComments(currentDiscIndex);

        console.log('HERE IS COMMLIST: ---');
        console.log(commList);

        var size = commList.length;
        for (var i=0; i<size; i++) {
            appendCommDOM(commList[i],i);
        }
    }
}

//========================APPEND FULL DETAIL OF DISCUSSION TO COMMENT SECTION===================================//
function createFullDetailDOM(discussion) {
    var e = document.createElement('div');
    e.setAttribute('class', 'discFullDetail');
    
    message =document.createElement('p');

    var text = discussion.detail;
    text = text.replace(/(?:\r\n|\r|\n)/g, '<br />'); // so that line break appears
    message.innerHTML = text;

    e.appendChild(message);

    return e;
}

function appendFullDetailDOM(iDisc) {
    var disc = discussionList.getDiscussion(iDisc);
    var e = createFullDetailDOM(disc);
    var parent = document.getElementById('discFullDetail');
    parent.appendChild(e);
}
//=======================================REFRESH FULL DETAIL=========================================//
function refreshFullDetail() {
    $('#discFullDetail').empty();
    appendFullDetailDOM(currentDiscIndex);
    return;
}



//===========================================DELETE COMMENT===================================//
function deleteComm(iDisc, iComm, commentID) {
    discussionList.deleteComment(iDisc, iComm);
    /////////////REQUEST SERVER TO DELETE ///////////
    ////////////////SEND ID TO SERVER////////////////////////
    //////////////DELETE IN LOCAL DB//////////////
    $('#comm-'+iComm).slideUp();
    setTimeout( function() {
    refreshCommList();
    },500);    
}

//===========================================SETTING DISCUSSION LIST===================================//
$(document).ready( function() {
    refreshDiscList();
    $('#createDiscButton').click( function() {
        $('.overlay').css('visibility', 'visible').hide().fadeIn('fast');
        $('#newDiscussion-container').css('visibility', 'visible').hide().fadeIn('fast');
    });

    $('#submitComment').click( function() {
        addComm();
        $('#commentBox').val('');
    });
});


//===========================================SETTING OPENED DISCUSSION===================================//
$(document).ready( function() {
    refreshFullDetail();
    refreshCommList();
});

//======================================SETTING NEW DISCUSSION MODAL===================================//
$(document).ready( function() { 
    $('#closeNewDiscussion').click( function() {
        $('.overlay').fadeOut('fast');
        $('#newDiscussion-container').fadeOut('fast');
    });
    $('#submitNewDiscButton').click( function() {
        addDisc();
        $('#newDiscDetail').val('');
        $('#newDiscTitle').val('');
        $('.overlay').fadeOut('fast');
        $('#newDiscussion-container').fadeOut('fast');
    });
});








