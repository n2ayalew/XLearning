function notice() {
	var d = new Date();
  	var date_= d.getDate();
  	var month_=month_name[parseInt(d.getMonth())];
  	var year_=d.getFullYear(); 
	this.noticeID; // string got from the server
	this.teacherID; // string
	this.classID; // string
	this.className; //string
	this.message;	//string RAW NO <br/>
	this.dateCreated = date_+' '+month_+' '+year_; // default constructor
}

function noticeList() {
	var list =[];
	this.saveNotice = function(notice) {
		if(list.length == 0) {
			list.push(notice);
			// console.log('first notice item');
		} 
		else {
			// console.log('saving new notice at front');
			list.splice(0,0,notice);
		}
		// console.log('checking list..... list[0].message='+list[0].message)
		return ;
	};

	this.deleteNotice =function(index) {
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

var noticeList = new noticeList();

