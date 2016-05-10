

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

function checkEmail(ev){
    var miniAlert = document.getElementById('miniAlert2');
    if($('#newEmail').val() != '') {
        //miniAlert.innerHTML = "YOUR NEW EMAIL HAS BEEN SUBMITTED";
        setTimeout( function() {
            $('#miniAlert2').empty();
        },2000);
        if(!submitionConfirmed){
            return confirmFormSubmition(ev, "Are you sure you would like to change your email?", "changeEmail");
        }
        submitionConfirmed = false;
        return true;
    }
    miniAlert.innerHTML = "INFORMATION MISSING";
    setTimeout( function() {
        $('#miniAlert2').empty();
    },2000);
    return false;
}

function checkPassword(ev){
    var miniAlert = document.getElementById('miniAlert2');
    if($('#newPassword').val() == '' || $('#newPassword').val() == '') {
        miniAlert.innerHTML = "INFORMATION MISSING";
        setTimeout( function() {
            $('#miniAlert2').empty();
        },2000);
        return false;
    }
    if($('#newPassword').val().length < 6){
        miniAlert.innerHTML = "PASSWORD MUST BE AT LEAST 6 CHARACTERS";
        setTimeout( function() {
            $('#miniAlert2').empty();
        },2000);
        return false;
    }
    if ($('#newPassword').val() != $('#confirmNewPassword').val()){
        miniAlert.innerHTML = "CONFIRMED PASSWORD IS NOT EQUAL";
        setTimeout( function() {
            $('#miniAlert2').empty();
        },2000);
        return false;
    }
    miniAlert.innerHTML = "YOUR NEW PASSWORD HAS BEEN SET";
    setTimeout( function() {
        $('#miniAlert2').empty();
    },2000);
    if (!submitionConfirmed){
        return confirmSubmitionPassword(ev, "Are you sure you want to change your password?", "changePassword");
    }
    submitionConfirmed = false;
    return true;
}