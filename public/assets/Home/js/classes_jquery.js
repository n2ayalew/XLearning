
//==========================IMPORTING DUMMY CLASSES===================================//
function generateAllClassPicker(classArray) {
	createClassPicker(classArray,'newNoticeClassPicker');
	createClassPicker(classArray,'newEventClassPicker');
}
function createClassPicker(classArray,DOM) { // takes in id of <select></select>
	var size = classArray.length;
	for(var i=0; i<size; i++) {
		var option = document.createElement('option');
		option.setAttribute('value',classArray[i].classID +":"+ classArray[i].name);
		option.innerHTML = classArray[i].name;

		//console.log('importing:' + classArray[i].name);

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
function createClassDOM(newClass,index) {
	console.log('index2 : '+index);/////////////////////////////////////
	var e = document.createElement('div');
	e.setAttribute('id', newClass.classID +"-"+ newClass.name);
	e.setAttribute('class','classElement');
	
	var deleteButton = document.createElement('button');
	deleteButton.setAttribute("class", "deleteButton");
	deleteButton.setAttribute("onclick", "deleteClass("+index+","+newClass.classID+")");
	e.appendChild(deleteButton);
	var a = document.createElement('a');
	a.setAttribute('href','http://api.jquery.com/jquery.post/');

	a.setAttribute('class','className');

	a.innerHTML = newClass.name + " ID:" + newClass.classID;
	e.appendChild(a);

	return e;
}

function appendClass(newClass, index) {
	console.log('index1 : '+index);/////////////////////////////////////
	var e = createClassDOM(newClass, index);
	var classList = document.getElementById('classList');
	classList.appendChild(e);
}


$(document).ready( function() {
	$.ajax({
		method: 'GET',
		url: '/class',
		success: function(result){
			var temp, lst = [];
			for (var i = 0; i < result.length; i++){
				temp = new class_();
				temp.classID = result[i].class_id;
				temp.name = result[i].subject;
				urClass.push(temp);
			}
			generateAllClassPicker(urClass);
			var size = urClass.length;
			for(var i=0; i<size; i++) {
				appendClass(urClass[i],i);
				console.log('i : '+i);/////////////////////////////////////
			}
		}
	});
	// generateAllClassPicker(urClass); // IMPORTING DUMMY CLASS FOR DEMO PURPOSES ONLY.
	// var size = urClass.length;
	// for(var i=0; i<size; i++) {
	// 	appendClass(urClass[i]);
	// }

});
//======================DELETE CLASS===================================//
function deleteClass(index,classID) {
	console.log('index in delete: '+index);////////////
	if(confirm("Are you sure you you want to delete this class?")){
		// $('#'+classID+'-'+className).slideUp();
		$('#classList').empty();
		urClass.splice(index,1);
		for(var i=0; i < urClass.length; i++) {
			console.log(urClass[i]);
			appendClass(urClass[i],i);
		}
		console.log(urClass);
	}
}


//=========================APPEND REQUEST TO UI===================================//
function createJRDOM(newRequest, index) {
	var e = document.createElement('div');
	e.setAttribute('class', 'joinRequest');
	e.setAttribute('id', newRequest.requestID);

	var studentName = document.createElement('div');
	studentName.setAttribute('class', 'requestStudentName');
	studentName.innerHTML = newRequest.studentName;

	var classToJoin = document.createElement('div');
	classToJoin.setAttribute('class', 'requestClass');
	classToJoin.innerHTML = newRequest.className;
	
	var button1 = document.createElement('button');
	button1.setAttribute('class', 'but');
	button1.setAttribute('onclick', 'decline('+newRequest.requestID+','+ index +')');	
	button1.innerHTML = "DECLINE";

	var button2 = document.createElement('button');
	button2.setAttribute('class', 'but');
	button2.setAttribute('onclick', 'accept('+newRequest.requestID+','+ index +')' );	
	button2.innerHTML = "ACCEPT";

	e.appendChild(studentName);
	e.appendChild(classToJoin);
	e.appendChild(button1);
	e.appendChild(button2);
	

	return e;
}

function appendRequest(newRequest, index) {
	var e = createJRDOM(newRequest, index);
	var joinRequestList = document.getElementById('joinRequestList');
	joinRequestList.appendChild(e);
}

//=========================DECLINE REQUEST===================================//
// index is the index in which it is stored in the local array.
// requestID is the id in the baack end database.
function decline(requestID,index) {  
	// send to back end....
	//console.log('deleting request with index: '+index);
	requestList.deleteRequest(index);
	refreshCounter(requestList.getList());
	$('#'+requestID).slideUp('fast');
	setTimeout( function(){
		refreshRequestList(requestList.getList());
	},1000);
}

//=========================ACCEPT REQUEST===================================//
// index is the index in which it is stored in the local array.
// requestID is the id in the baack end database.
function accept(requestID,index) {  
	// send to back end....
	//console.log('deleting request with index: '+index);
	requestList.deleteRequest(index);
	refreshCounter(requestList.getList());
	$('#'+requestID).slideUp('fast');
	setTimeout( function(){
		refreshRequestList(requestList.getList());
	},1000);
}
//===================IMPORTING JOIN REQUESTS=========================//
function importRequests(requestList) {
	var size = requestList.length;
	for (var i=0; i<size; i++) {
		appendRequest(requestList[i],i);
	}

}

$(document).ready( function() {
	importRequests(requestList.getList());
	refreshCounter(requestList.getList());
});


//====================SETTING COUNTER==================================//

function refreshCounter(requestList) {
	var rem =requestList.length;
	counter = document.getElementById('joinRequest-counter');
	counter.innerHTML = rem.toString();
}

//=========================REFRESH REQUEST LIST===================================//
function refreshRequestList(requestList) {
	$('#joinRequestList').empty();
	importRequests(requestList);
}


//=======================SETTING INTERACTIVE CLASS====================//
$(document).ready( function() {

	$('#createNewClassButton').click( function() {
		$('.overlay').css('visibility','visible').hide().fadeIn('fast');
		$('#createNewClass-container').css('visibility','visible').hide().fadeIn('fast');
	});
	$('#closeCreateNewClass').click( function() {
		$('.overlay').fadeOut('fast');
		$('#createNewClass-container').fadeOut('fast');
	});
});



