grades = [];
changedGrades = [];
class Grade {
	constructor(id,user_id, grade) {
		this.id = id;
		this.user_id = user_id;
		this.grade = grade;
	}
}

function saveGrades (){
	var gradesEntrys = $('.gradeEntry').toArray();
	$('.overlay').css('visibility', 'visible');
	$('.overlay').show();
	$('#ajaxLoader').show();
	for (var i = 0; i < gradesEntrys.length; i += 1){
		if (gradesEntrys[i].innerHTML.includes('N/A')){
			continue;
		}
		var id = gradesEntrys[i].getAttribute('id').substring(6);
		var grade = new Grade(parseInt(id), parseInt(gradesEntrys[i].getAttribute('data-user-id')), gradesEntrys[i].innerHTML);
		grades.push(grade);
	}
	var csrf_token = $('meta[name="csrf_token"]').attr('content');
	
	var serializedGradesAndToken = "grades=" + JSON.stringify(grades) + "&" + "_token=" + csrf_token;
	$.ajax({
		method: 'POST',
		url: '/home/{classId}/grades/postGrades',
		data: serializedGradesAndToken,
		success: function (response) {
			console.log(response);
		},
		complete: function () {
			$('.overlay').css('visbility', 'hidden');
			$('.overlay').hide();
			$('#ajaxLoader').hide();
		}
	});
}

// Deletes all grades with the specified title
function deleteGrades() {

}

$(document).ready(function () {
	$('#saveChangesBtn').click(function (){
		saveGrades();
	});
});