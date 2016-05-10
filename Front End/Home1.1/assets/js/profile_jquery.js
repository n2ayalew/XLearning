

//===============SETTING INTERRACTIVE PROFILE=======================================//
$(document).ready( function () {
    $('#settingButton').click( function() {
        $('.overlay').css('visibility','visible').hide().fadeIn('fast');
        $('#settings-container').css('visibility','visible').hide().fadeIn('fast');
    });
});


//===============SETTING INTERRACTIVE USER SETTINGS MENU=======================================//
$(document).ready( function () {
    $('#closeSettings').click( function() {
        $('.overlay').fadeOut('fast');
        $('#settings-container').fadeOut('fast');
    });

    $('#submitNewName').click( function() {
        var miniAlert = document.getElementById('miniAlert2');
        if($('#newName').val() != '') {
            miniAlert.innerHTML = "YOUR NEW NAME HAS BEEN SUBMITTED";
            setTimeout( function() {
                $('#miniAlert2').empty();
            },2000);
        }
        else{
            miniAlert.innerHTML = "INFORMATION MISSING";
            setTimeout( function() {
                $('#miniAlert2').empty();
            },2000);
        }

    });

    $('#submitNewEmail').click( function() {
        var miniAlert = document.getElementById('miniAlert2');
        if($('#newEmail').val() != '') {
            miniAlert.innerHTML = "YOUR NEW EMAIL HAS BEEN SUBMITTED";
            setTimeout( function() {
                $('#miniAlert2').empty();
            },2000);
        }
        else{
            miniAlert.innerHTML = "INFORMATION MISSING";
            setTimeout( function() {
                $('#miniAlert2').empty();
            },2000);
        }

    });

    $('#submitNewPassword').click( function() {
        var miniAlert = document.getElementById('miniAlert2');
        if($('#newPassword').val() != '') {
            miniAlert.innerHTML = "YOUR NEW PASSWORD HAS BEEN SET";
            setTimeout( function() {
                $('#miniAlert2').empty();
            },2000);
        }
        else{
            miniAlert.innerHTML = "INFORMATION MISSING";
            setTimeout( function() {
                $('#miniAlert2').empty();
            },2000);
        }

    });
});