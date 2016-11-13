// on document ready
$( document ).ready(function() {

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

        // var test = answers;
        // send textareas values to api (if succes show message, if error show message)
        $.ajax({
              type: 'POST',
              url: "http://survey.quantox.tech/answers",
              data: answers,
              dataType: "text",
              success: function() { 
                    $(divID).css("display","none");
                    $('#success').css("display","block");

              },
              error: function(){ 
                    $(divID).css("display","none");
                     $('#error').css("display","block");
        
              }
        });
    }


    // get json file
    $.ajax({
        dataType: "json",
        crossOrigin: true,
        // url: 'http://survey.quantox.tech/survey',
        url:'https://dentist-reminder.azurewebsites.net/api/Questions',
        // headers: {'Access-Control-Allow-Origin': '*', 'api-key':'4fd9b42566b547562be9f75784ad58f868e90d49'},
        // beforeSend: function(xhr){xhr.setRequestHeader('api-key', '08f1a4ed10cfe271fcbc477542c314eb6e58d51a');},
        beforeSend: function(xhr){xhr.setRequestHeader('ZUMO-API-VERSION', '2.0.0');},
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

    // validate email using regex
    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validate() {

        $("#result").text("");
        var email = $("#email").val();

        if (validateEmail(email)) {
        
            $("#validate").click(function(event) {
                $('.common:first').css("display", "block");
                $('#step1').css("display", "none");
            });

        } else {

            $("#result").text(email + " is not valid :(");
            $("#result").css("color", "red");

        }
        return false;
    }

    $("form").bind("submit", validate);

});


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }


