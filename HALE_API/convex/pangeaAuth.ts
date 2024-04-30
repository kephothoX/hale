
import { httpAction } from './_generated/server';
import { api, internal } from './_generated/api';



export const startSignupSignInFlow = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.startSignupSignInFlow, params);

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

export const authFlowUpdate = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.authFlowUpdate, params);

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


export const inviteAuthUser = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.inviteAuthUser, params);

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

export const getAuthUser = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.getAuthUser, params);

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

export const authFlowRestart = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.authFlowRestart, params);

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


export const newAuthUser = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.newAuthUser, params);

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

export const updateAuthUser = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.updateAuthUser, params);

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

export const verifyAuthUser = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.verifyAuthUser, params);

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


export const getAuthUserSessions = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.getAuthUserSessions, params);

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


export const verifyEmail = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.verifyEmail, params);

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

export const verifyPassword = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.verifyPassword, params);

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



export const loginWithPassword = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.loginWithPassword, params);

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

export const passwordReset = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.passwordReset, params);

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

export const auditLog = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.auditLog, params);

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

export const checkEmailBreach = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.checkEmailBreach, params);

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

export const logoutAuthUser = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.logoutAuthUser, params);

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

export const updateAuthUserPassword = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runAction(api.pangeaAuthActions.updateAuthUserPassword, params);

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