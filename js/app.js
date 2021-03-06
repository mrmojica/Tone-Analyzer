(function() {



    $(document).ready(function() {


/************GET API***************/

        function getAnalysis() {

            var userInput = $('textarea').val();
            var request = {
                username: "edbfb344-421b-4a09-96e1-80893eee6949",
                password: "chbuNrzQAOU7",
                version: "2016-05-19",
                text: userInput

            };

            var username = "edbfb344-421b-4a09-96e1-80893eee6949";
            var password = "chbuNrzQAOU7";

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

            /**************CHART SECTION****************/

                    CanvasJS.addColorSet("emotionShades", [ //colorSet Array

                        "#B71605",
                        "#B9EE84",
                        "#9A64C4",
                        "#F8E259",
                        "#83D4FD"
                    ]);
                    CanvasJS.addColorSet("socialShades", [ //colorSet Array

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
                                type: "bar", //change it to line, area, bar, pie, etc
                                indexLabelFontFamiy: "Garamond",
                                dataPoints: [
                                    { y: Math.floor((results.emotionResult.anger * 100)), label: "Anger", toolTipContent: "A sense of tension or hostility." },
                                    { y: Math.floor((results.emotionResult.disgust * 100)), label: "Disgust", toolTipContent: "Revulsion to something offensive or unpleasant." },
                                    { y: Math.floor((results.emotionResult.fear * 100)), label: "Fear", toolTipContent: "A feeling of mild or extreme caution." },
                                    { y: Math.floor((results.emotionResult.joy * 100)), label: "Joy", toolTipContent: "A sense of well-being, safety, contentment." },
                                    { y: Math.floor((results.emotionResult.sadness * 100)), label: "Sadness", toolTipContent: "A sense of loss: less energetic and withdrawn." }
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

                            dataPoints: [
                                { y: (results.socialResult.openness * 100), indexLabel: "Openness {y}", label: "Extent a persion is open to variety" },
                                { y: (results.socialResult.conscientiousness * 100), indexLabel: "Conscientiousness {y}", label: "A tendency to act in a thoughtful way" },
                                { y: (results.socialResult.extraversion * 100), indexLabel: "Extraversion {y}", label: "Engaging, assertive, outgoing." },
                                { y: (results.socialResult.agreeableness * 100), indexLabel: "Agreeableness {y}", label: "A measure of compassion and sympathy." },
                                { y: (results.socialResult.emotionRange * 100), indexLabel: "Emotional Range {y}", label: "A measure of sensitivity to the environment." }

                            ]
                        }]
                    });

                    chart.render();


                    $("#chartContainer").CanvasJSChart(options);

            /*****************INSIDE OUT FEATURE***********/

                    $('.image').hide();
                    if ((results.emotionResult.anger * 100) >= 50) {
                        $('#anger').show();
                    }
                    if ((results.emotionResult.disgust * 100) >= 50) {
                        $('#disgust').show();
                    }
                    if ((results.emotionResult.fear * 100) >= 50) {
                        $('#fear').show();
                    }
                    if ((results.emotionResult.joy * 100) >= 50) {
                        $('#joy').show();
                    }
                    if ((results.emotionResult.sadness * 100) >= 50) {
                        $('#sadness').show();
                    }

                },
                error: function(error) {
                    console.log(error);
                }
            });



        };

        $('.instructions').hide();

        $('#submit-button').click(function(e) {
            console.log();
            e.preventDefault();
            getAnalysis();
            $('.instructions').show();



        });
    });

})();
