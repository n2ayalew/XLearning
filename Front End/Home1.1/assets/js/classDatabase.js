function class_() {
	this.classID; // string
	this.name;  //string
}

var urClass =[];
var allClass =[];
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

//===========================CREATING ALL OTHER CLASSES RANOMLY====================//
function makeName()
{
    var subject = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < 3; i++ )
        subject += possible.charAt(Math.floor(Math.random() * possible.length));
    // console.log('subject: '+subject);
	var year = Math.floor((Math.random() * 10) + 1);
	// console.log('class year: '+year);
    return subject + (year).toString();
}

function makeID()
{
	var id = Math.floor((Math.random() * 10000) + 1);
	// console.log('classID: '+id);
	return id.toString();

}

for(var i =0; i<20; i++) {
	var temp = new class_();
	temp.name = makeName();
	temp.classID = makeID();
	allClass.push(temp);
}



//========================JOIN REQUESTS ARRAY======================//

function joinRequest() {
	this.requestID = (Math.floor((Math.random() * 100000) + 1)).toString();
	this.studentID;
	this.studentName;
	this.classID;
	this.className;
}

function requestList() {
	var list =[];
	this.saveRequest = function(joinRequest) {
		list.push(joinRequest);
		return ;
	};

	this.deleteRequest =function(index) {
		list.splice(index,1);
	};
	this.getList = function() {
		return list;
	};
	this.isEmpty = function() {
		if(list.length == 0)
			return true;
		else
			return false;
	};
}

//=======================SETTING DUMMY JOIN REQUESTS=============//

var requestList = new requestList();

var join1 = new joinRequest();
var join2 = new joinRequest();
var join3 = new joinRequest();

join1.studentID = (Math.floor((Math.random() * 1000) + 1)).toString();
join1.studentName = 'John Liu';
join1.classID = '5251';
join1.className = 'ECO1';
requestList.saveRequest(join1);

join2.studentID = (Math.floor((Math.random() * 1000) + 1)).toString();
join2.studentName = 'Suzy Chan';
join2.classID = '4512';
join2.className = 'PHY3';
requestList.saveRequest(join2);

join3.studentID = (Math.floor((Math.random() * 1000) + 1)).toString();
join3.studentName = 'ken Davis'
join3.classID = '7910';
join3.className = 'MTE4';
requestList.saveRequest(join3);



for(var i=0; i<30; i++) {
	var join = new joinRequest();
	join.studentName = "Stuent" + i;
	join.className = "class" + i;
	requestList.saveRequest(join);
}




