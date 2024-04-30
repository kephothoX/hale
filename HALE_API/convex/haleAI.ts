import { httpAction } from './_generated/server';
import { api } from './_generated/api';


export const generativeAIContent = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const result = await ctx.runAction(api.HALEAIActions.generateContent, params);

  return new Response(JSON.stringify(result), {
    headers: new Headers({
        'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });

});


export const generativeAIChat = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const result = await ctx.runAction(api.HALEAIActions.generativeAIChat, params);

  return new Response(JSON.stringify(result), {
    headers: new Headers({
        'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });

});


export const textToSpeech = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text())
  let result;
  const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'xi-api-key': '4269936f79db3e51dc91b52c1d5288e5'
},
  body: JSON.stringify({
    model_id: 'eleven_multilingual_v2',
    text: params.text,
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0,
      use_speaker_boost: true
    }
  })
};

await fetch('https://api.elevenlabs.io/v1/text-to-speech/IpRWYitl8g5lvTzV1FqJ', options)
  .then(response => response.json())
  .then(response => { result = response })
  .catch(err => console.error(err));

  console.log(result);
 
  return new Response(result, {
    headers: new Headers({
        'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });

});
