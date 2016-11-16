// on document ready
$( document ).ready(function() {

     // Get the modal
    var startModal = document.getElementById('startTest');
    var startBtn = document.getElementById("startBtn");
    var close = document.getElementsByClassName("close")[0];

    startBtn.onclick = function() {
        startModal.style.display = "block";
    }

    close.onclick = function() {
        startModal.style.display = "none";
    }

    // if($('#junior').data('clicked')) {
    //     //clicked element, do-some-stuff
    //     $('#jobTittle').val('Junior');
    // } else {
    //     //run function2

    // }


    // validate email using regex
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var validate = function (){

        $("#result").text("");
        var email = $("#email").val();

        if (validateEmail(email)) {
        
            $('.common:first').css("display", "block");
            $('#step1').css("display", "none");

        } else {

            $("#result").text(email + " is not valid :(");
            $("#result").css("color", "red");

        }
        return false;
    }

    $("form").bind("submit", validate);

    // function setCookie(cname, cvalue, exdays) {
    //     var d = new Date();
    //     d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //     var expires = "expires="+d.toUTCString();
    //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // }

    // function getCookie(cname) {
    //     var name = cname + "=";
    //     var ca = document.cookie.split(';');
    //     for(var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }

    changeValue = function(setJob){
        document.getElementById('jobTittle').value=setJob.innerHTML;
    }

    $(".tab").click(function () {
        $(".tab").removeClass("active");
        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).addClass("active");   
    });

    // On button click show next question
    nextQuestion = function (divID) {
        $(divID).css("display","none");
        $(divID).next().css("display","block");
    }

    // On button click show previus question
     prevQuestion = function (divID) {
        $(divID).css("display","none");
        $(divID).prev().css("display","block");
    }

    // submit answers
    submitAnswers = function (divID) {
        var answers = [];
        var textAreas = $('.textAreasCommonClass');

        for (var i=0; i < textAreas.length; i++) {
            answers.push(
                {
                    question_id: parseInt(textAreas[i].id.split("_").pop()),
                    answer: textAreas[i].value
                }
            );
        }

        var sendAnswers = {answers};

        // var test = answers;
        // send textareas values to api (if succes show message, if error show message)
        $.ajax({
              type: 'POST',
              crossOrigin: true,
              url: "http://survey.quantox.tech/answers",
              beforeSend: function(xhr){
                    xhr.setRequestHeader('api-key', '1d8ab00b433b2d3fe15134b3e1cd03da1a8eefa9');
        
                    // show loading animation before status message
                    $(divID).css("display","none");
                    $('#loading').css("display","block");
              },
              data: sendAnswers,
              dataType: "json",
              success: function() { 

                    // show success message    
                    $('#loading').css("display","none");
                    $('#success').css("display","block");

              },
              error: function(){ 

                    // show error message    
                    $('#loading').css("display","none");  
                    $('#error').css("display","block");
        
              }
        });
    }


    // get json file
    $.ajax({
        dataType: "json",
        crossOrigin: true,
        url:'http://survey.quantox.tech/survey',
        beforeSend: function(xhr){xhr.setRequestHeader('api-key', '1d8ab00b433b2d3fe15134b3e1cd03da1a8eefa9');},
        success: function (data) {

            // for each question
            for (var i=0; i < data.length; i++) {

                // except last one
                if (i == data.length -1){

                    $(".right-container-side").append("<div class='common' id='step_"+data[i].id+"' style='display:none'>" +
                        "<header class='header'><p class='modul'>Modul/" + "<span>" + data[i].id  + "</span>" + "</p>" +
                        "<p class='category'>" + data[i].category + "</p></header>" +
                        "<p class='question'>" + data[i].question + "</p>" +
                        "<textarea placeholder='Enter your answer here...' class='textAreasCommonClass' id='answer_"+data[i].id+"'></textarea>"+
                        "<footer>"+
                        "<img src='images/leftArrow.png' class='leftArrow' onclick='prevQuestion(step_"+data[i].id+")'/>"+
                        "<button class='finish' onclick='submitAnswers(step_"+data[i].id+")'>Finish</button>"+
                        "</footer>"+
                        "</div>");

                }else{

                    $(".right-container-side").append("<div class='common' id='step_"+data[i].id+"' style='display:none'>" +
                        "<header class='header'><p class='modul'>Modul/" + "<span>" + data[i].id  + "</span>"  + "</p>" +
                        "<p class='category'>" + data[i].category + "</p></header>" +
                        "<p class='question'>" + data[i].question + "</p>" +
                        "<textarea placeholder='Enter your answer here...' class='textAreasCommonClass' id='answer_"+data[i].id+"'></textarea>"+
                        "<footer>"+
                        "<img src='images/leftArrow.png' class='leftArrow' onclick='prevQuestion(step_"+data[i].id+")'/>"+
                        "<img src='images/rightArrow.png' class='rightArrow' onclick='nextQuestion(step_"+data[i].id+")'/>"+
                         "</footer>"+
                        "</div>");
                    }
                
            };
        },
    });



});


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }


