//==========================IMPORTING DUMMY CLASSES===================================//
function generateAllClassPicker(classArray) {

}
function createClassPicker(classArray,DOM) { // takes in id of <select></select>
	var size = classArray.length;
	for(var i=0; i<size; i++) {
		var option = document.createElement('option');
		option.setAttribute('value',classArray[i].classID +":"+ classArray[i].name);
		option.innerHTML = classArray[i].name;

		console.log('importing:' + classArray[i].name);

		var selection = document.getElementById(DOM);
		selection.appendChild(option);
	}
}
//=========================IMPORTING NEW CLASS=======================//
function importNewClass(id) {
	var size = allClass.length;
	for (var i=0; i<size; i++) {
		if(allClass[i].classID == id) {
			urClass.push(allClass[i]);
		}
	}
}
//=========================APPEND CLASS TO UI===================================//
function createClassDOM(newClass) {
	var e = document.createElement('div');
	e.setAttribute('id', newClass.classID +"-"+ newClass.name);
	e.setAttribute('class','classElement');
	var a = document.createElement('a');
	a.setAttribute('href','http://api.jquery.com/jquery.post/');

	a.setAttribute('class','className');

	a.innerHTML = newClass.name + " ID:" + newClass.classID;
	e.appendChild(a);

	return e;
}

function appendClass(newClass) {
	var e = createClassDOM(newClass);
	var classList = document.getElementById('classList');
	classList.appendChild(e);
}


$(document).ready( function() {
	generateAllClassPicker(urClass); // IMPORTING DUMMY CLASS FOR DEMO PURPOSES ONLY.
	var size = urClass.length;
	for(var i=0; i<size; i++) {
		appendClass(urClass[i]);
	}

});
//=======================CREATE CLASSES TO JOIN LIST===================//
//parameter class object
function createOtherClassDOM(class_) {
	var e = document.createElement('div');
	e.setAttribute('id', class_.classID+"-"+class_.name);
	e.setAttribute('class', 'otherClassElement');

	var teacher = document.createElement('div');
	teacher.setAttribute('class', 'otherClassTeacher');
	teacher.innerHTML = 'TEACHER: '+class_.teacher;

	e.appendChild(teacher);

	var className = document.createElement('div');
	className.setAttribute('class','otherClassName');
	className.innerHTML = class_.name;

	e.appendChild(className);

	var joinButton = document.createElement('button');
	joinButton.setAttribute('class', 'joinBut');
	joinButton.setAttribute('onclick', 'joinClass('+class_.classID+')');
	joinButton.innerHTML = 'JOIN';

	e.appendChild(joinButton);
	return e
}

function appendOtherClassDOM(class_) {
	otherClassList = document.getElementById('allClassList');
	var e = createOtherClassDOM(class_);
	otherClassList.appendChild(e)
}

$(document).ready( function() {
	ur = urClass.length;
	all =allClass.length;
	for(var i=0; i<all; i++) {
		var isUrs = false;
		
		for(var j=0; j<ur; j++) {
			if ((urClass[j].classID).toString() == (allClass[i].classID).toString())
				isUrs = true;
		}

		if(isUrs == false)
			appendOtherClassDOM(allClass[i]);
	}
	return;
})
//============================JOIN CLASS================================//
//HERE IS THE FUNCTION THAT WILL SEND A REQUEST TO THE SERVER TO JOIN  CLASS
// i think we need the user ID as one parameter but i dont have it right now.
function joinClass(classID) {
	var miniAlert = document.getElementById('miniAlert5');
	miniAlert.innerHTML = "YOUR JOIN REQUEST HAS BEEN SENT TO THE TEACHER.";
	setTimeout( function() {
	    $('#miniAlert5').empty();
	},2000);
}
//=======================SETTING INTERACTIVE CLASS====================//
$(document).ready( function() {
	$('#joinNewClassButton').click( function() {
		$('.overlay').css('visibility','visible').hide().fadeIn('fast');
		$('#joinNewClass-container').css('visibility','visible').hide().fadeIn('fast');
	});
	$('#closeJoinNewClass').click( function() {
		$('.overlay').fadeOut('fast');
		$('#joinNewClass-container').fadeOut('fast');
	});
});



