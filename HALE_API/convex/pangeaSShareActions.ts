'use node';

import { action } from './_generated/server';
import { v } from 'convex/values';
import { api, internal } from './_generated/api';


export const getFiles = action({
  args: { filter: v.object({}) },
  handler: async (ctx, args) => {
    const filesRequest = await fetch('https://share.gcp.us.pangea.cloud/v1beta/list', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_SECURE_SHARE_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return await filesRequest.json();
  }
});

export const getFile = action({
  args: { 
    id: v.string(),
    transfer_method: v.string(),
    password: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const fileRequest = await fetch('https://share.gcp.us.pangea.cloud/v1beta/get', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_SECURE_SHARE_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return await fileRequest.json();
  }
});

export const updateFile = action({
  handler: async (ctx, args) => {
    const updateFileRequest = await fetch('https://share.gcp.us.pangea.cloud/v1beta/update', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_SECURE_SHARE_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return await updateFileRequest.json();
  }
});

export const newSharedFile = action({
  args: {
    auth_context: v.string(), 
    auth_type: v.string(),
    targets: v.array(v.string()),
    link_type: v.string(),
    expires_at: v.string(),
    max_access_count: v.number(),
    title: v.string(),
    message: v.string(),
    notify_email: v.string(),
    tags: v.array(v.string())
    
  },  
  handler: async (ctx, args) => {
    const filesShareRequest = await fetch('https://share.gcp.us.pangea.cloud/v1beta/share/link/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_SECURE_SHARE_TOKEN}`,
      },
      body: JSON.stringify({
        links: [
          {
            authenticators: [{
              auth_context: args.auth_context, 
              auth_type: args.auth_type
            }],
            targets: args.targets,
            link_type: args.link_type,
            expires_at: args.expires_at,
            max_access_count: args.max_access_count,
            title: args.title,
            message: args.message,
            notify_email: args.notify_email,
            tags: args.tags
          }
        ]
      })
    });

    return await filesShareRequest.json();
  }
});

export const deleteSharableLink = action({  
  handler: async (ctx, args) => {
    const delSharableLink = await fetch('https://share.gcp.us.pangea.cloud/v1beta/share/link/delete', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_SECURE_SHARE_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return await delSharableLink.json();
  }
});


export const getSharedFiles = action({
  args: {
    filter: v.object({
      notify_email: v.string() 
    })
  },
  handler: async (ctx, args) => {
    const filesShareRequest = await fetch('https://share.gcp.us.pangea.cloud/v1beta/share/link/list', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_SECURE_SHARE_TOKEN}`,
      },
      body: JSON.stringify(args)
    });

    return await filesShareRequest.json();
  }
});


export const sendFileSharableLink = action({
  args: {
    sender_email: v.string(),
    links: v.array(
      v.object({
        email: v.string(),
        id: v.string()
      })
    )
  },
  handler: async (ctx, args) => {
    console.log(args);
    const fileShareRequest = await fetch('https://share.gcp.us.pangea.cloud/v1beta/share/link/send', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HALE_SECURE_SHARE_TOKEN }`,
      },
      body: JSON.stringify(args)
    });

    return await fileShareRequest.json();
  }
});


export const newFolder = action({
  args: { name: v.string()  },
  handler: async (ctx, args) => {
    let res;

    await fetch('https://share.gcp.us.pangea.cloud/v1beta/folder/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ process.env.HALE_SECURE_SHARE_TOKEN }`,
      },
      body: JSON.stringify({
        metadata: {
            created_by: "byn",
            priority: "medium"
        },
        path:"/test/folder/"
      })
    }).then((response) => {
        res = response.json();
        console.log(res);
    });

    return res;
  }
});


export const uploadFile = action({
  args: { storageId: v.id('_storage'),
    name: v.string(),
    password: v.string(),
    created_by: v.string()
   },
   
  handler: async (ctx, args) => {
    console.log(
      {
        transfer_method: "source-url", 
        source_url: await ctx.storage.getUrl(args.storageId),
        metadata: {
          created_by: args.created_by,
          priority: "medium"
        },
        tags: ["irs_2023","personal"],
        password_algorithm: "AES-CFB-256",
        password: args.password,
        name: args.name,    
      }
    )

    //await ctx.scheduler.runAfter(30000, internal.pangeaSShareMutations.deleteById, args.storageId);
    const res =  await fetch('https://share.gcp.us.pangea.cloud/v1beta/put', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ process.env.HALE_SECURE_SHARE_TOKEN }`,
      },
      body: JSON.stringify({
        transfer_method: "source-url", 
        source_url: `${ await ctx.storage.getUrl(args.storageId) }`,
        metadata: {
          created_by: args.created_by,
          priority: "medium"
        },
        password_algorithm: "AES-CFB-256",
        password: args.password,
        name: args.name,    
      })
    });

    console.log(await res.json());
  }
});


/*request={"transfer_method":"multipart","metadata":{"created_by":"jim","priority":"medium"},"tags":["irs_2023","personal"],"password_algorithm":"AES-CFB-256","password":"fg","name":"sdddd"};type=application/json' \
-F 'upload=@path-to-my-file.ext;type=application/octet-stream' */