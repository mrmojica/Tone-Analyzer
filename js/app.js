(function() {
    $(document).ready(function() {


        function getAnalysis() {

            var userInput = $('textarea').val();
            var request = {
                username: "1207dc30-685e-4d17-8158-1614ccce582c",
                password: "gYdMh31GBHrS",
                version: "2016-05-19",
                text: userInput

            };

            var username = "1207dc30-685e-4d17-8158-1614ccce582c";
            var password = "gYdMh31GBHrS";

            $.ajax({
                url: "https://crossorigin.me/https://" + username + ":" + password + "@gateway.watsonplatform.net/tone-analyzer/api/v3/tone",
                data: request,
                dataType: "json", //use jsonp to avoid cross origin issues
                type: "GET",
                success: function(response) {
                     
                     //Emotion
                     var anger = response.document_tone.tone_categories[0].tones[0].score;
                     var disgust = response.document_tone.tone_categories[0].tones[1].score;
                     var fear = response.document_tone.tone_categories[0].tones[2].score;
                     var joy = response.document_tone.tone_categories[0].tones[3].score;
                     var sadness = response.document_tone.tone_categories[0].tones[4].score;
                     
                     //Social Tendencies
                     var openness = response.document_tone.tone_categories[2].tones[0].score;
                     var conscientiousness = response.document_tone.tone_categories[2].tones[1].score;
                     var extraversion = response.document_tone.tone_categories[2].tones[2].score;
                     var agreeableness = response.document_tone.tone_categories[2].tones[3].score;
                     var emotionRange = response.document_tone.tone_categories[2].tones[4].score;

   console.log(response);

//console.log(response);
                var emotionResult = '';
                var socialResult = '';
                emotionResult += '<li class="emotion">' + 'Anger: ' + Math.floor((anger * 100)) + '</li>';
                emotionResult += '<li class="emotion">' + 'Disgust: ' + Math.floor((disgust * 100)) + '</li>';
                emotionResult += '<li class="emotion">' + 'Fear: ' + Math.floor((fear * 100)) + '</li>';
                emotionResult += '<li class="emotion">' + 'Joy: ' + Math.floor((joy * 100)) + '</li>';
                emotionResult += '<li class="emotion">' + 'Sadness: ' + Math.floor((sadness * 100)) + '</li>';
                socialResult += '<li class="social">' + 'Openness: ' + Math.floor((openness * 100)) + '</li>';
                socialResult += '<li class="social">' + 'Conscientiousness: ' + Math.floor((conscientiousness * 100)) + '</li>';
                socialResult += '<li class="social">' + 'Extraversion: ' + Math.floor((extraversion * 100)) + '</li>';
                socialResult += '<li class="social">' + 'Agreeableness: ' + Math.floor((agreeableness * 100)) + '</li>';
                socialResult += '<li class="social">' + 'Emotional Range: ' + Math.floor((emotionRange * 100)) + '</li>';
             

                $('.emotion-percent').html(emotionResult);
                $('.social-percent').html(socialResult);

                },
                error: function(error) {
                    console.log(error);
                }
            });



        };
        $('#submit-button').click(function(e) {
            console.log();
            e.preventDefault();
            getAnalysis();
          
        });
    });

})();
