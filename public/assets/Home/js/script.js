$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
});

//=========================CONFIRM=======================//
var submitionConfirmed = false;
var deleteClassConfirmation = false;
var deleteEventConfirmation = false;
var deleteAnnouncementConfirmation = false;
function confirmFormSubmition(eve, message, formType){
	eve.preventDefault();
	document.getElementById('confirmMessage').innerHTML = message;
	$('.overlay').css('visibility', 'visible').fadeIn('fast');
	$('#confirm-container').css('visibility','visible').fadeIn('fast');
	$('#confirmYes').click( function() {
		$('.overlay').fadeOut('fast');
		$('#confirm-container').fadeOut('fast');
		submitionConfirmed = true;
		if (formType == "changeEmail"){
			$('#changeEmailForm').submit();
		}
		if (formType == "changePassword"){
			$('#changeEmailForm').submit();
		}
	});
	$('#confirmNo').click( function() {
		$('.overlay').fadeOut('fast');
		$('#confirm-container').fadeOut('fast');
		return false;
	});
}

function confirmDelete(message, index, classID){ // for classes
	document.getElementById('confirmMessage').innerHTML = message;
	$('.overlay').css('visibility', 'visible').fadeIn('fast');
	$('#confirm-container').css('visibility','visible').fadeIn('fast');
	$('#confirmYes').click( function() {
		$('.overlay').fadeOut('fast');
		$('#confirm-container').fadeOut('fast');
		deleteClassConfirmation = true;
		deleteClass(index,classID);
	});
	$('#confirmNo').click( function() {
		$('.overlay').fadeOut('fast');
		$('#confirm-container').fadeOut('fast');
		deleteClassConfirmation = false;
	});
}

function confirmDeleteEvent(message,form,e,index,date,month,year,eventID){
	document.getElementById('confirmMessage').innerHTML = message;
	$('.overlay').css('visibility', 'visible').fadeIn('fast');
	$('#confirm-container').css('visibility','visible').fadeIn('fast');
	$('#confirmYes').click( function() {
		$('.overlay').fadeOut('fast');
		$('#confirm-container').fadeOut('fast');
		deleteEventConfirmation = true;
		deleteEvent(form,e,index,date,month,year,eventID);
	});
	$('#confirmNo').click( function() {
		$('.overlay').fadeOut('fast');
		$('#confirm-container').fadeOut('fast');
		deleteEventConfirmation = false;
	});
}

function confirmDeleteAnnouncement(message, index){
	document.getElementById('confirmMessage').innerHTML = message;
	$('.overlay').css('visibility', 'visible').fadeIn('fast');
	$('#confirm-container').css('visibility','visible').fadeIn('fast');
	$('#confirmYes').click( function() {
		$('.overlay').fadeOut('fast');
		$('#confirm-container').fadeOut('fast');
		deleteAnnouncementConfirmation = true;
		deleteNotice(index);
	});
	$('#confirmNo').click( function() {
		$('.overlay').fadeOut('fast');
		$('#confirm-container').fadeOut('fast');
		deleteAnnouncementConfirmation = false;
	});
}

