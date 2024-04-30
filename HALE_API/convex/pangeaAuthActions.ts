'use node';

import { action } from './_generated/server';
import { v } from 'convex/values';
import { api } from './_generated/api';


export const startSignupSignInFlow = action({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest =  await fetch('https://authn.gcp.us.pangea.cloud/v2/flow/start', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        flow_types: ["signin"],
        cb_uri: "https://localhost:4201/auth/signin",
        email: `${args.email}`
      })
    });

    return await pangeaRequest.json()
  }
});

export const authFlowUpdate = action({
  args: { choice: v.string(), flow_id: v.string(), 
    data: v.object({
      password: v.optional(v.string()),
      social_provider: v.optional(v.string()),
      uri:v.optional(v.string())
    })
  },
  handler: async (ctx, args) => {
    console.log(args);
    
    const pangeaRequest =  await fetch('https://authn.gcp.us.pangea.cloud/v2/flow/update', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return await pangeaRequest.json()
  }
});

export const inviteAuthUser = action({
  args: { email:  v.string(), state: v.string() },
  handler: async (ctx, args) => {
    console.log(args);
    
    const pangeaRequest =  await fetch('https://authn.gcp.us.pangea.cloud/v2/user/invite', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        email: args.email,
        inviter: "bikramyoganairobikenya@getMaxListeners.com",
        callback: "/",
        state: args.state
      })
    });

    return await pangeaRequest.json()
  }
});


export const authFlowRestart = action({
  args: { choice: v.string(), flow_id: v.string(), 
    data: v.object({
      password: v.optional(v.string()),
      social_provider: v.optional(v.string()),
      uri:v.optional(v.string())
    })
  },
  handler: async (ctx, args) => {
    console.log(args);
    
    const pangeaRequest =  await fetch('https://authn.gcp.us.pangea.cloud/v2/flow/restart', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return await pangeaRequest.json()
  }
});


export const newAuthUser = action({
  args: { 
     email:  v.string(),
      profile: v.object({
        first_name: v.optional(v.string()),
        last_name: v.optional(v.string()),
        phone: v.optional(v.string())
      })
   },
  handler: async (ctx, args) => {
    const pangeaRequest =  await fetch('https://authn.gcp.us.pangea.cloud/v2/user/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify(args)
    });


    return pangeaRequest.json();
  }
});

export const updateAuthUser = action({
  args: { email: v.string(), first_name: v.string(), last_name: v.string() },
  handler: async (ctx, args) => {

    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/user/profile/update', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        email: args.email,
        profile: {
          first_name: args.first_name,
          last_name: args.last_name,
        }
      })
    });

    return pangeaRequest.json();
  }
});

export const verifyAuthUser = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/user/verify', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        id_provider: "password",
        email: args.email,
        authenticator: args.password
      })
    });

    return pangeaRequest.json();
  }
});

export const getAuthUser = action({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/user/profile/get', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return pangeaRequest.json();
  }
});

export const verifyEmail = action({
  args: { flow_id: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/flow/verify/email', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        flow_id: args.flow_id
      })
    });

    return pangeaRequest.json();
  }
});

export const verifyPassword = action({
  args: { flow_id: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/flow/verify/password', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        flow_id: args.flow_id,
        password: args.password
      })
    });

    return pangeaRequest.json();
  }
});


export const loginWithPassword = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/user/login/password', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        email: args.email,
        password: args.password,
      })
    });

    return pangeaRequest.json();
  }
});

export const passwordReset = action({
  args: { flow_id: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/flow/reset/password', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        flow_id: args.flow_id,
        password: args.password
      })
    });

    return pangeaRequest.json();
  }
});


export const getAuthUserSessions = action({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/session/list', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        filter: {
          email: args.email
        }

      })
    });

    return pangeaRequest.json();
  }
});

export const auditLog = action({
  args: { message: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://audit.gcp.us.pangea.cloud/v2/log', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUDIT_TOKEN}`,
      },
      body: JSON.stringify({
        event: {
          message: args.message
        }
      })
    });

    return pangeaRequest.json();
  }
});

export const checkEmailBreach = action({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://user-intel.gcp.us.pangea.cloud/v2/user/breached', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_INTEL_TOKEN}`,
      },
      body: JSON.stringify({
        provider: "spycloud",
        email: args.email
      })
    });

    return pangeaRequest.json();
  }
});

export const logoutAuthUser = action({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/session/logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return pangeaRequest.json();
  }
});

export const updateAuthUserPassword = action({
  args: { token: v.string(), old_password: v.string(), new_password: v.string() },
  handler: async (ctx, args) => {
    const pangeaRequest = await fetch('https://authn.gcp.us.pangea.cloud/v2/client/password/change', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_AUTHN_TOKEN}`,
      },
      body: JSON.stringify({
        token: args.token,
        old_password: args.old_password,
        new_password: args.new_password
      })
    });

    return pangeaRequest.json();
  }
});



