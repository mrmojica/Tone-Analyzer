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

                    var results = {

                        emotionResult: {
                            anger: response.document_tone.tone_categories[0].tones[0].score,
                            disgust: response.document_tone.tone_categories[0].tones[1].score,
                            fear: response.document_tone.tone_categories[0].tones[2].score,
                            joy: response.document_tone.tone_categories[0].tones[3].score,
                            sadness: response.document_tone.tone_categories[0].tones[4].score
                        },

                        //Social Tendencies
                        socialResult: {
                            openness: response.document_tone.tone_categories[2].tones[0].score,
                            conscientiousness: response.document_tone.tone_categories[2].tones[1].score,
                            extraversion: response.document_tone.tone_categories[2].tones[2].score,
                            agreeableness: response.document_tone.tone_categories[2].tones[3].score,
                            emotionRange: response.document_tone.tone_categories[2].tones[4].score
                        }
                    };

                    console.log(results.emotionResult.anger);

                    //console.log(response);
                    var emotionResult = '';
                    var socialResult = '';
                    emotionResult += '<li class="emotion">' + 'Anger: ' + Math.floor((results.emotionResult.anger * 100)) + '</li>';
                    emotionResult += '<li class="emotion">' + 'Disgust: ' + Math.floor((results.emotionResult.disgust * 100)) + '</li>';
                    emotionResult += '<li class="emotion">' + 'Fear: ' + Math.floor((results.emotionResult.fear * 100)) + '</li>';
                    emotionResult += '<li class="emotion">' + 'Joy: ' + Math.floor((results.emotionResult.joy * 100)) + '</li>';
                    emotionResult += '<li class="emotion">' + 'Sadness: ' + Math.floor((results.emotionResult.sadness * 100)) + '</li>';
                    socialResult += '<li class="social">' + 'Openness: ' + Math.floor((results.socialResult.openness * 100)) + '</li>';
                    socialResult += '<li class="social">' + 'Conscientiousness: ' + Math.floor((results.socialResult.conscientiousness * 100)) + '</li>';
                    socialResult += '<li class="social">' + 'Extraversion: ' + Math.floor((results.socialResult.extraversion * 100)) + '</li>';
                    socialResult += '<li class="social">' + 'Agreeableness: ' + Math.floor((results.socialResult.agreeableness * 100)) + '</li>';
                    socialResult += '<li class="social">' + 'Emotional Range: ' + Math.floor((results.socialResult.emotionRange * 100)) + '</li>';


                    $('.emotion-percent').html(emotionResult);
                    $('.social-percent').html(socialResult);

                    CanvasJS.addColorSet("emotionShades",
                        [//colorSet Array

                        "#B71605",
                        "#49412A",
                        "#9A64C4",
                        "#B9EE84",
                        "#83D4FD"
                        ]);
                    CanvasJS.addColorSet("socialShades",
                        [//colorSet Array

                        "#F8BB00",
                        "#D3DEE1",
                        "#FF0448",
                        "#EAFE0C",
                        "#BA6CFF"
                        ]);

                    var options = {
                        colorSet: "emotionShades",
                        title: {
                            fontFamily: "Garamond",
                            text: "Emotional Tone Analysis"
                        },
                        axisY: {
                            //     minimum: 50,
                            maximum: 100
                        },
                        animationEnabled: true,
                        data: [


                                {
                                    type: "column", //change it to line, area, bar, pie, etc
                                    indexLabelFontFamiy: "Garamond",
                                    dataPoints: [
                                        { y: Math.floor((results.emotionResult.anger * 100)), label: "Anger" },
                                        { y: Math.floor((results.emotionResult.disgust * 100)), label: "Disgust" },
                                        { y: Math.floor((results.emotionResult.fear * 100)), label: "Fear" },
                                        { y: Math.floor((results.emotionResult.fear * 100)), label: "Joy" },
                                        { y: Math.floor((results.emotionResult.sadness * 100)), label: "Sadness" }
                                    ]
                                }
                            ]
                        };
                            /// Doughnut Chart
                        var chart = new CanvasJS.Chart("doughnutContainer", {
                            colorSet: "socialShades",
                            title: {
                                fontFamily: "Garamond",
                                fontWeight: "Bold",
                                text: "Social Perception Scores"
                            },
                            animationEnabled: true,
                            theme: "theme2",
                            data: [{
                                type: "doughnut",
                                indexLabelFontFamily: "Garamond",
                                startAngle: 0,
                                indexLabelFontColor: "dimgrey",
                                indexLabelLineColor: "darkgrey",
                                toolTipContent: "{y} %",

                                dataPoints: [
                                    { y: (results.socialResult.openness * 100), indexLabel: "Openness {y}" },
                                    { y: (results.socialResult.conscientiousness * 100), indexLabel: "Conscientiousness {y}" },
                                    { y: (results.socialResult.extraversion * 100), indexLabel: "Extraversion {y}" },
                                    { y: (results.socialResult.agreeableness * 100), indexLabel: "Agreeableness {y}" },
                                    { y: (results.socialResult.emotionRange * 100), indexLabel: "Emotional Range {y}" }

                                ]
                            }]
                        });

                        chart.render();


                    $("#chartContainer").CanvasJSChart(options);

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
