/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                        TEACHER DISCUSION

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

//==============================HELPER FUNCTIONS====================================//


//==============================GLOBAL VARIABLES===================================//
var currentDiscIndex = 0;
var emptyDisc = true;

/*
TODO: 
- On page load the first disscusion's details should be loaded
*/
//==============================REFRESH THE DISCUSSION LIST===================================//
function refreshDiscList(send) { // First call is made syncron
    $('#discussionList').empty();
    
    // Fetch Discussions from server
    /*
    Discussions are saved as a discussionClass() object

    /*
        We should delete all discussions then load them all to the page after each refresh... for now.
        We should move the rest of the function inside the success callback 
    */
    //discussionList.deleteDiscussions();
    if (send) {

        $.ajax({
            method: 'GET',
            url: 'discussions',
            success: function (result){
                
                for (var i = 0, count = 1; i < result.length; i++, count = 1){
                    
                    if (discussionList.loadedPosts.indexOf(result[i].post_id) > -1) {continue;}
                    var newDis = new discussionClass();
                    newDis.discussionID = result[i].post_id;
                    newDis.topic = result[i].post_title;
                    newDis.postedByTeacher = result[i].teacher_post;
                    var tempStr = result[i].created_at;
                    console.log(tempStr);
                    var tempLst = tempStr.split(' ');
                    tempLst = tempLst[0].split('-');
                    newDis.dateCreated = newDis.getMonthName(tempLst[1]) + ' ' + parseInt(tempLst[2]) + ' ' + parseInt(tempLst[0]);
                    newDis.posterID = i;
                    newDis.detail = result[i].discussion_post;
                    newDis.posterName = result[i].first_name;
                    discussionList.loadedPosts.push(result[i].post_id);
                    discussionList.saveDiscussion(newDis);
                
                }
                if(discussionList.isEmpty()) {
                    console.log('!!!!!!!!!!!!!!!!!discussionList EMPTY!!!!!!!!!!!!!!!!!!!');  /////////////////////////////////////////
                    $('#discussionList').append('<div>NO DISCUSSIONS</div>');
                    emptyDisc = true;
                    //currentDiscIndex = 0;
                }
                        else {
                            emptyDisc = false;
                            var discArray = [];
                            discArray = discussionList.getList();

                            //console.log('++++++++++++++++++++REFRESHING+++++++++++++++++');  /////////////////////////////////////////
                            //console.log(discArray);  /////////////////////////////////////////

                            var size = discArray.length;
                            for (var i=0; i <size; i++) {
                                appendDiscDOM(discArray[i],i);
                            }
                        }                
            }
        });
    } else {
        console.log( discussionList.getList() );
        if(discussionList.isEmpty()) {
            console.log('!!!!!!!!!!!!!!!!!discussionList EMPTY!!!!!!!!!!!!!!!!!!!');  /////////////////////////////////////////
            $('#discussionList').append('<div>NO DISCUSSIONS</div>');
            emptyDisc = true;
            currentDiscIndex = 0;
        } else {
            emptyDisc = false;
            var discArray = [];
            discArray = discussionList.getList();

                //console.log('++++++++++++++++++++REFRESHING+++++++++++++++++');  /////////////////////////////////////////
                //console.log(discArray);  /////////////////////////////////////////

            var size = discArray.length;
            for (var i=0; i <size; i++) {
                appendDiscDOM(discArray[i],i);
            }
        }
    }
}
//===========================================OPEN DISCUSSION===================================//
function openDisc(index) {
    
    //console.log('Opening discussion with index:' + index); ///////////////////////////////////
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

function addDisc(f) {
    newDisc = new discussionClass();
    newDisc.topic = $('#newDiscTitle').val();
    newDisc.detail = $('#newDiscDetail').val();
    //newDisc.postedByTeacher = true;
    // NEED TO SET POSTERNAME 
    // & POSTER ID
    
    $.ajax({
        type: 'POST',
        url: 'discussion',
        data: f.serialize(),
        success: function (result){
            obj = $.parseJSON(result);
            newDisc.posterName = obj['first_name'];
            newDisc.posterID = obj['user_id'];
            newDisc.discussionID = obj['post_id'];
            newDisc.postedByTeacher = obj['postedByTeacher'];
            emptyDisc = false;
            discussionList.saveDiscussion(newDisc);
            refreshDiscList(false);
            //refreshDiscList(true);
            //refreshFullDetail();
            //refreshCommList();
            //refreshDiscList(true);
        }
    });
    if(!emptyDisc) {
        refreshFullDetail();
        refreshCommList();
    }
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

/*
    BUGS:
    - If a disscussion w/o comments is deleted we get error: discussion_jquery.js:385 Uncaught TypeError: Cannot read property 'detail' of undefined
    - If a discussion w/ comments is deleted we get error: discussion_jquery.js:344 Uncaught TypeError: Cannot read property 'deleteComments' of undefined
*/
//===========================================DELETE DISCUSSION===================================//
function deleteDisc(iDisc,discussionID) {
    discussionList.deleteDiscussion(iDisc);
    
    var csrf_token = $('meta[name="csrf-token"]').attr('content');
    ////////////////REQUEST SERVER TO DELETE////////////////////////
    
    $.ajax({
        method: "DELETE",
        url: 'discussion/' + discussionID,
        data: discussionID + "&" + "_token=" + csrf_token,
        success: function (response) {
            console.log("discussion deleted");
            if (discussionList.isEmpty()) {
                emptyDisc = true;
            }
            else {
                emptyDisc = false;
            }
            
            //////////////DELETE IN LOCAL DB//////////////
            $('#disc-'+iDisc).slideUp();
            setTimeout( function() {
            refreshDiscList(false);
            //refreshCommList();
            },500);
        }

    });    
}

//===========================================ADD COMMENT===================================//
// CREATE A NEW COMMENT OBJECT SET ITS PROPERTIES EXCEPT THE COMMENT ID FROM THE SERVER.
// POST IT TO SERVER.
// GET REPONSE ID FROM SERVER.
// SET NEW COMMENT OBJECT COMMENT ID PROPERTY.
// SAVE IT INTO THE CLIENT SIDE TEMPORARY DATABASE.

function addComm(f) {
    newComm = new commentClass();
    newComm.message = $('#commentBox').val();
    //newComm.postedByTeacher = true;
    // NEED TO SET POSTER ID AND POSTER NAME LATER.
    // NOW POST TP SERVER AND GET COMMENT ID.
    
    $.ajax({
        type: 'POST',
        url: 'discussion/' + (discussionList.getDiscussion(currentDiscIndex)).discussionID + '/comment',
        data: f.serialize(),
        success: function (result){
            var response = $.parseJSON(result);
            newComm.postedByTeacher = response['postedByTeacher'];
            newComm.posterName = response['first_name'];
            newComm.commentID = response['comment_id'];
            newComm.posterID = response['poster_id'];
            
            // SET THE ID OF THE COMMENT AND PUSH IT IN THE CLIENT SIDE DB.    
            discussionList.saveComment(currentDiscIndex, newComm);
            refreshCommList();
        }
    });
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
    date.innerHTML = newComment.dateCreated; 

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


    return e;
}

function appendCommDOM(newComment,index) {
    
    //console.log('creating Comment DOM.') ////////////////////////////////////


    var e = createCommDOM(newComment, index);
    var commList = document.getElementById('commentList');
    commList.appendChild(e);
}

//==============================REFRESH THE COMMENT LIST===================================//
function refreshCommList() {
    $('#commentList').empty();
    // Get from server
    if ( discussionList.isEmpty() ) {
        return;
    }
    var currentDisc = discussionList.getDiscussion(currentDiscIndex);
    currentDisc.deleteComments();

    $.ajax({
        type: 'GET',
        url: 'discussion/' + currentDisc.discussionID + '/comments',
        success: function(result) {
            
            // we gotta loop through comment list and save each one
            for (var i = 0, count = 1; i < result.length; i++, count = 1) {
                var comment = new commentClass();
                comment.message = result[i]['comment'];
                comment.postedByTeacher = result[i]['teacher_comment'];
                comment.posterID = result[i]['user_id'];
                comment.posterName = result[i]['first_name'];
                comment.commentID = result[i]['id'];
                currentDisc.saveComment(comment);
            }
            if(discussionList.isCommEmpty(currentDiscIndex)) {
                //console.log('NO COMMENTS');
                $('#commentList').append('<div>NO COMMENTS</div>');
            }
            else {
                var commList = [];
                commList = discussionList.getComments(currentDiscIndex);
                //console.log('HERE IS COMMLIST: ---');
                //console.log(commList);
                var size = commList.length;
                for (var i=0; i<size; i++) {
                    appendCommDOM(commList[i],i);
                }
            }
        }
    });
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
    
    /////////////REQUEST SERVER TO DELETE ///////////
    ////////////////SEND ID TO SERVER////////////////////////
    var csrf_token = $('meta[name="csrf-token"]').attr('content');
    $.ajax({
        method: "DELETE",
        url: 'discussion/' + discussionList.getDiscussion(iDisc).discussionID + '/comment/' + commentID,
        data: commentID + "&" + "_token=" + csrf_token,
        success: function (response) {
            console.log("discussion deleted");

            //////////////DELETE IN LOCAL DB//////////////
            $('#comm-'+iComm).slideUp();
            setTimeout( function() {
            refreshCommList();
            },500);
            discussionList.deleteComment(iDisc, iComm); 
        }
    });
}


//===========================================SETTING DISCUSSION LIST===================================//
$(document).ready( function() {
    refreshDiscList(true);
    $('#createDiscButton').click( function() {
        $('.overlay').css('visibility', 'visible').hide().fadeIn('fast');
        $('#newDiscussion-container').css('visibility', 'visible').hide().fadeIn('fast');
    });

    $('#createNewComment').on( 'submit', function() {
        event.preventDefault();
        addComm( $(this) );
        $('#commentBox').val('');
    });
    if (!emptyDisc) {
        refreshFullDetail();
        refreshCommList();
    }
});

//======================================SETTING NEW DISCUSSION MODAL===================================//
$(document).ready( function() {
    
    $('#closeNewDiscussion').click( function() {
        $('.overlay').fadeOut('fast');
        $('#newDiscussion-container').fadeOut('fast');
    });
    $('#createDiscussionForm').on('submit', function(event) {
        event.preventDefault();
        // We should validate the form here....
        addDisc( $(this) );
        $('#newDiscDetail').val('');
        $('#newDiscTitle').val('');
        $('.overlay').fadeOut('fast');
        $('#newDiscussion-container').fadeOut('fast');
    });
});








