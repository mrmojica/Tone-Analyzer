var emotionResult = {
    anger: response.document_tone.tone_categories[0].tones[0].score,
    disgust: response.document_tone.tone_categories[0].tones[1].score,
    fear: response.document_tone.tone_categories[0].tones[2].score,
    joy: response.document_tone.tone_categories[0].tones[3].score,
    sadness: response.document_tone.tone_categories[0].tones[4].score
}

var socialResult ={
    openness: response.document_tone.tone_categories[2].tones[0].score;
    conscientiousness: response.document_tone.tone_categories[2].tones[1].score;
    extraversion: response.document_tone.tone_categories[2].tones[2].score;
    agreeableness: response.document_tone.tone_categories[2].tones[3].score;
    emotionRange: response.document_tone.tone_categories[2].tones[4].score;
}