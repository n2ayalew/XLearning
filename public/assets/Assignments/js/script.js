$(document).load(function (){
	
	$('.delete_doc').click(function (){
		var id = (this).attr('data-id');
		deleteDoc(id);
	});
});

function deleteDoc(id) {
	var csrf_token = $('meta[name="csrf_token"]').attr('content');
	
	var id_token = "id=" + id + "&" + "_token=" + csrf_token;
	$.ajax({
		method: 'POST',
		url: '/home/{classId}/assignments/delete_file/' + id,
		data: id_token,
		success: function (response) {
			 location.reload(true);
		}
	});
}