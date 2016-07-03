$(document).ready(function (){
	
	$('.delete_doc').click(function (){
		
		var id = $(this).attr('data-id');
		var classId = $(this).attr('data-classid');
		deleteDoc(id, classId);
	});
});

function deleteDoc(id, cid) {
	var csrf_token = $('meta[name="csrf_token"]').attr('content');
	
	var id_token = "id=" + id + "&" + "_token=" + csrf_token;
	$.ajax({
		method: 'DELETE',
		url: '/home/' +  cid + '/assignments/delete_file/' + id,
		data: id_token,
		success: function (response) {
			 location.reload(true);
		}
	});
}