/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

                        TEACHER DISCUSSION

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var  month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];


function commentClass() {
    this.message = '';
    this.postedByTeacher = false; // default will be false and will be changed only if was posted by a teacher.
    this.posterID;
    this.posterName;
    this.commentID;

    var d = new Date();
    var date_= d.getDate();
    var month_=month_name[parseInt(d.getMonth())];
    var year_=d.getFullYear(); 

    this.dateCreated = date_+' '+month_+' '+year_; // default constructor
}


function discussionClass() {
    this.discussionID;
    this.topic='';
    this.postedByTeacher = false; // default will be false and will be changed only if was posted by a teacher.
    
    var comments = [];  // stores comment objects
    
    var d = new Date();
    var date_= d.getDate();
    var month_=month_name[parseInt(d.getMonth())];
    var year_=d.getFullYear(); 

    this.dateCreated = date_+' '+month_+' '+year_; // default constructor

    this.posterID; //the one saved in DB
    this.posterName;
    this.detail;

    this.getMonthName = function(monthIndex){
        return month_name[monthIndex - 1];
    }

    this.saveComment = function(newComment) {
        comments.push(newComment);
        
        //console.log('------------------------comment saved-----L: '+comments.length); /////////////////////////////////////////
        //console.log(newComment); /////////////////////////////////////////
        //console.log(comments); /////////////////////////////////////////
        
        return;
    };

    this.deleteComment = function(index) {
        //console.log('---------------------deleting comment at index: '+index+'----------------'); /////////////////////////////////////////
        //console.log(comments[index]); /////////////////////////////////////////
        
        comments.splice(index,1);
        
        //console.log(comments); /////////////////////////////////////////
        
        return;
    };

    this.getComments = function() {

        //console.log(comments); /////////////////////////////////////////
        //console.log("]========"); /////////////////////////////////////////

        return comments;
    };
}








function discussionList() {
    this.loadedPosts = [];
    var list = [];

    this.saveDiscussion = function(newDiscussion) {  // take in  a discussionClass object.
        if(list.length == 0) {
            list.push(newDiscussion);
            
            //console.log('------------------------First discussion saved------------------------'); /////////////////////////////////////////
            console.log(newDiscussion); /////////////////////////////////////////
        }
        else {
            list.splice(0,0, newDiscussion);
            
            //console.log('------------------------Discussion saved------------------------'); /////////////////////////////////////////
            //console.log(newDiscussion); /////////////////////////////////////////
        }
        
        //console.log('size of discussion list: '+list.length ); /////////////////////////////////////////
        
        return;
    };

    this.saveComment = function(iDisc, newComment) {
        iDisc = parseInt(iDisc);
        list[iDisc].saveComment(newComment);
        return;
    }

    this.deleteDiscussion = function(index) {
        index = parseInt(index);
        list.splice(index,1);
        
        //console.log('DELETED discussion at index: '+index); /////////////////////////////////////////
        
        return;
    };

    this.getList = function() {

        //console.log("Returning list of discussions========["); /////////////////////////////////////////
        //console.log(list); /////////////////////////////////////////
        //console.log("]========"); /////////////////////////////////////////

        return list;
    };

    this.getComments = function(iDisc) {

        //console.log("Returning list of comments for discussion"+iDisc+"=====["); /////////////////////////////////////////
        //console.log( list[iDisc].getComments());
        return list[iDisc].getComments();
    };

    this.isEmpty = function() {
        if(list.length == 0) {
            //console.log('discussionList EMPTY');
            return true;
        }
        else {
            //console.log('discussionList NOT EMPTY');
            return false;
        }
    };

    this.deleteComment = function(iDisc, iComm) {
        iDisc = parseInt(iDisc);
        iComm = parseInt(iComm);
        
        //console.log('deleting Comment from discussion: '+ iDisc); /////////////////////////////////////////
        
        list[iDisc].deleteComment(iComm);

        //console.log(list[iDisc].getComments()); /////////////////////////////////////////
    };

    this.isCommEmpty = function(iDisc) {
        var comments =[];
        comments = list[iDisc].getComments();
        if(comments.length == 0)
            return true;
        else
            return false;
    };

    this.getDiscussion = function(iDisc) { // returning a discussion object
        //console.log('returning discussion with index: '+iDisc+'------->'); /////////////////
        //console.log(list[iDisc]); /////////////////
        return list[iDisc];
    };
}

var discussionList = new discussionList();



//============================CREATING 30 DUMMY DISCUSSIONS WITH 10 COMMENTS EACH==============================//
// for (var i=0; i<30; i++) {
//     var newDiscussion = new discussionClass();
//     newDiscussion.topic = 'test'+i;
//     newDiscussion.detail = i+'------Lorem ipsum dolor sit amet, sale consul appellantur his ei, eu ornatus consequat mea. Cu nisl munere vis, et iusto intellegat nec. Cu eum facer error quidam, vim nullam praesent mediocrem ea, pri id assum corpora expetendis. An est enim detraxit sensibus.Vix at case forensibus, quo lucilius maluisset ne. Assum tractatos instructior ex per, no ignota aliquid recusabo vim. Vis nemore forensibus cu. Te qui integre fabellas. Cum amet noluisse facilisi ad, duo constituto eloquentiam an. Eos elitr veritus philosophia ut.Vel cu illud velit, aeterno consetetur id mel. Eum at nominavi maluisset principes, euismod conclusionemque sit ut, no per sint facer quidam. Sed meliore dignissim interesset ea, no sit habemus nominavi adipisci, in luptatum lucilius voluptaria nec. Quo eius harum et, vim nominati adipiscing consectetuer te. Ei possit euripidis quo, an saepe suavitate splendide qui. Id sed ullum convenire, no vix vero debitis. Ea ius ferri verterem accusata, audiam percipit in sed. Has et simul nominavi vulputate. Quod equidem mei et, mucius luptatum conceptam vix ex, ei pro dicat falli clita.';
//     if(i%2 == 0) {
//         newDiscussion.postedByTeacher = true;
//         newDiscussion.posterName = 'Mr Paul';
//     } 
//     else {
//         newDiscussion.posterName = 'student' + i;
//     }
//     discussionList.saveDiscussion(newDiscussion);
// }

// for(var j =0; j<30; j++) {
//     for(var i=0; i<10; i++) {
//         var newComment = new commentClass();
//         if(i%2 == 0) {
//             newComment.postedByTeacher = true;
//             newComment.posterName = "Mr Paul";
//         }
//         else {
//             newComment.posterName = 'George';
//         }

//         newComment.message = "hello what is this discussion dumbass!!??? u are a complete asshole sir dont give a shit what u think just keep sucking balls and get paid to do nothing";

//         discussionList.saveComment(j,newComment)
//     }
// }
















