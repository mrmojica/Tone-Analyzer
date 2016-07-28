(function() {
    $(document).ready(function() {


        function getAnalysis() {

            var request = {
                username: "1207dc30-685e-4d17-8158-1614ccce582c",
                password: "gYdMh31GBHrS",
                version: "2016-05-19",
                text: "This is test text for which I am expecting a response."

            };

            var username = "1207dc30-685e-4d17-8158-1614ccce582c";
            var password = "gYdMh31GBHrS";

            $.ajax({
                url: "https://crossorigin.me/https://" + username + ":" + password + "@gateway.watsonplatform.net/tone-analyzer/api/v3/tone",
                data: request,
                dataType: "json", //use jsonp to avoid cross origin issues
                type: "GET",
                success: function(response) {
                    console.log(response);
                },
                error: function(error) {
                    console.log(error);
                }
            });

        };
        $('#submit-button').click(function(e) {
            console.log("hello");
            e.preventDefault();
            getAnalysis();
            alert(1);
        });
    });

})();
