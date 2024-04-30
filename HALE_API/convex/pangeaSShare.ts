
import { httpAction } from './_generated/server';
import { api, internal } from './_generated/api';



export const getFiles = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaSShareActions.getFiles, params);

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});

export const getFile = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaSShareActions.getFile, params);

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});

export const updateFile = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaSShareActions.updateFile, params);

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});

export const newSharedFile = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaSShareActions.newSharedFile, params);

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});



export const getSharedFiles = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaSShareActions.getSharedFiles, params);

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});


export const sendFileSharableLink = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaSShareActions.sendFileSharableLink, params);

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});

export const delSharableLink = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaSShareActions.deleteSharableLink, params);

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});

export const newFolder = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaSShareActions.getFiles, params);

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});

export const uploadFile = httpAction(async (ctx, request) => {
    let response;
    await request.formData()
        .then(async (data) => {

          const storageId = await ctx.storage.store(data.get('_file') as Blob);

          const dataset: any = {
                storageId: storageId,
                name: data.get('name'),
                password: data.get('password'),
                created_by: data.get('created_by')
            }

            response = await ctx.runAction(api.pangeaSShareActions.uploadFile, dataset);

            console.log(response);

        });

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, x-requested-with',
            Vary: 'origin',
        }),

        status: 200,
    });
});