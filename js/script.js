$( document ).ready(function() {

    $.ajax({
        dataType: "json",
        crossOrigin: true,
        url: 'http://survey.quantox.tech/survey',
        // headers: {'Access-Control-Allow-Origin': '*', 'api-key':'4fd9b42566b547562be9f75784ad58f868e90d49'},
        beforeSend: function(xhr){xhr.setRequestHeader('api-key', '08f1a4ed10cfe271fcbc477542c314eb6e58d51a');},
         success: function (data) {

                    // for each user
                    for (var i=0; i < data.length; i++) {

                        // add li elements with class listBlockUsers in ul with id listOfUsers
                        $("#firstQuestion").append( $("<div>" +
                            "<h4 class='id'>" + data[i].id + "</h4>" +
                            "<p class='question'>" + data[i].question + "</p>" +
                            "<p class='category'>" + data[i].category + "</p>" +
                            "</div>"));
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
            $("#result").text(email + " is valid :)");
            $("#result").css("color", "green");
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

// var step1 = document.getElementById("step1");
// var nextStep2 = document.getElementById("nextStep2");

// nextStep2.onclick = function() {
// 	step1.display = "none";
// 	step2.display = "block";
// }

