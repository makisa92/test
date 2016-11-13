$( document ).ready(function() {

    nextQuestion = function (divID) {
        $(divID).css("display","none");
        $(divID).next().css("display","block");
    }

     prevQuestion = function (divID) {
        $(divID).css("display","none");
        $(divID).prev().css("display","block");
    }


    $.ajax({
        dataType: "json",
        crossOrigin: true,
        // url: 'http://survey.quantox.tech/survey',
        url:'https://dentist-reminder.azurewebsites.net/api/Questions',
        // headers: {'Access-Control-Allow-Origin': '*', 'api-key':'4fd9b42566b547562be9f75784ad58f868e90d49'},
        // beforeSend: function(xhr){xhr.setRequestHeader('api-key', '08f1a4ed10cfe271fcbc477542c314eb6e58d51a');},
        beforeSend: function(xhr){xhr.setRequestHeader('ZUMO-API-VERSION', '2.0.0');},
         success: function (data) {

                    // for each user
                    for (var i=0; i < data.length; i++) {
                        if (i == data.length -1){
                          $(".right-container-side").append("<div class='common' id='step_"+data[i].id+"' style='display:none'>" +
                            "<h4 class='id'>" + data[i].id + "</h4>" +
                            "<p class='question'>" + data[i].question + "</p>" +
                            "<p class='category'>" + data[i].category + "</p>" +
                            "<textarea id='answer_"+data[i].id+"' rows='4' cols='50'>gfdgdfgfdg</textarea>"+
                            "<button onclick='prevQuestion(step_"+data[i].id+")'>Prev</button>"+
                            "</div>");
                        }else{

                        $(".right-container-side").append("<div class='common' id='step_"+data[i].id+"' style='display:none'>" +
                            "<h4 class='id'>" + data[i].id + "</h4>" +
                            "<p class='question'>" + data[i].question + "</p>" +
                            "<p class='category'>" + data[i].category + "</p>" +
                            "<textarea id='answer_"+data[i].id+"' rows='4' cols='50'>gfdgdfgfdg</textarea>"+
                            "<button onclick='prevQuestion(step_"+data[i].id+")'>Prev</button>"+
                            "<button onclick='nextQuestion(step_"+data[i].id+")'>Next</button>"+
                            "</div>");
                        }
                        
                    };
                },
    });

    



    // $.ajax({
    //     type: 'GET',
    //     url: 'http://www.survey.quantox.tech/survey',
    //     headers: {'Access-Control-Allow-Origin': '*', 'api-key':'08f1a4ed10cfe271fcbc477542c314eb6e58d51a'},
    //     crossOrigin: true,
    // });


    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    //When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }


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


