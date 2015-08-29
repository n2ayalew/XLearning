function class_() {
	this.classID;
	this.name;
}

var urClass =[];

//===========================CREATING DUMMY CLASSES===========================//
var class1 = new class_();
class1.classID = '5251';
class1.name = 'ECO1';
urClass.push(class1);

var class2 = new class_();
class2.classID = '4512';
class2.name = 'PHY3';
urClass.push(class2);

var class3 = new class_();
class3.classID = '1025';
class3.name = 'BIO2';
urClass.push(class3);

var class4 = new class_();
class4.classID = '7910';
class4.name = 'MTE4';
urClass.push(class4);
//==========================IMPORTING CLASSES===================================//
function importClass(classArray) {
	var size = classArray.length;
	for(var i=0; i<size; i++) {
		var option = document.createElement('option');
		option.setAttribute('value',classArray[i].name);
		option.innerHTML = classArray[i].name;
		console.log('importing:' + classArray[i].name);
		var selection = document.getElementById('newEventClass');
		selection.appendChild(option);
	}
}

$(document).ready( function() {
	importClass(urClass);
});