import { httpAction } from './_generated/server';
import { api } from './_generated/api';


export const getSQLocations = httpAction(async (ctx) => {

  const SQLocations = await ctx.runAction(api.squareActions.getSQLocations);

  return new Response(JSON.stringify({ 'SQResponse': SQLocations }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),
    status: 200,
  });
});


export const getSQCatalog = httpAction(async (ctx) => {

  const SQCatalog = await ctx.runAction(api.squareActions.getSQCatalog);

  return new Response(JSON.stringify({ 'SQResponse': SQCatalog }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,

  });
});

export const getSQMerchants = httpAction(async (ctx) => {

  const SQCatalog = await ctx.runAction(api.squareActions.getSQMerchants);

  return new Response(JSON.stringify({ 'SQResponse': SQCatalog }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,

  });
});

export const getSQBulkCatalog = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQCatalog = await ctx.runAction(api.squareActions.getSQBulkCatalog, params);

  return new Response(JSON.stringify({ 'SQResponse': SQCatalog }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,

  });
});

export const listSQBookings = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQBookings = await ctx.runAction(api.squareActions.listSQBookings, params);

  return new Response(JSON.stringify({ 'SQResponse': SQBookings }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,

  });
});

export const getSQBooking = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQBooking = await ctx.runAction(api.squareActions.getSQBooking, params);

  return new Response(JSON.stringify({ 'SQResponse': SQBooking }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,

  });
});


export const newSQCatalog = httpAction(async (ctx, request) => {
  const params = await request.json();

  const addSQCatalog = await ctx.runAction(api.squareActions.newSQCatalog, params);

  return new Response(JSON.stringify({ 'SQResponse': addSQCatalog }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const newSQTeamMember = httpAction(async (ctx, request) => {
  const params = await request.json();

  const addSQTeamMember = await ctx.runAction(api.squareActions.newSQTeamMember, params);

  return new Response(JSON.stringify({ 'SQResponse': addSQTeamMember }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const updateSQTeamMember = httpAction(async (ctx, request) => {
  const params = await request.json();

  const updateSQTeamMember = await ctx.runAction(api.squareActions.updateSQTeamMember, params);

  return new Response(JSON.stringify({ 'SQResponse': updateSQTeamMember }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const getSQTeamMembers = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQTeamMembers = await ctx.runAction(api.squareActions.getSQTeamMembers, params);

  return new Response(JSON.stringify({ 'SQResponse': SQTeamMembers }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const getSQTeamMember = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQTeamMember = await ctx.runAction(api.squareActions.getSQTeamMember, params);

  return new Response(JSON.stringify({ 'SQResponse': SQTeamMember }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});


export const newSQVendor = httpAction(async (ctx, request) => {
  const params = await request.json();

  const addSQVendor = await ctx.runAction(api.squareActions.newSQVendor, params);

  return new Response(JSON.stringify({ 'SQResponse': addSQVendor }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const updateSQVendor = httpAction(async (ctx, request) => {
  const params = await request.json();

  const updateSQVendor = await ctx.runAction(api.squareActions.updateSQVendor, params);

  return new Response(JSON.stringify({ 'SQResponse': updateSQVendor }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const getSQVendors = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQVendors = await ctx.runAction(api.squareActions.getSQVendors, params);

  return new Response(JSON.stringify({ 'SQResponse': SQVendors }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const getSQVendor = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQVendor = await ctx.runAction(api.squareActions.getSQVendor, params);

  return new Response(JSON.stringify({ 'SQResponse': SQVendor }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const searchSQCatalogItems = httpAction(async (ctx, request) => {
  const params = await request.json();

  const searchSQCatalogItems = await ctx.runAction(api.squareActions.searchSQCatalogItems, params);

  return new Response(JSON.stringify({ 'SQResponse': searchSQCatalogItems }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});


export const searchSQCatalog = httpAction(async (ctx, request) => {
  const params = await request.json();

  const searchSQCatalog = await ctx.runAction(api.squareActions.searchSQCatalog, params);

  return new Response(JSON.stringify({ 'SQResponse': searchSQCatalog }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});



export const newSQLocation = httpAction(async (ctx, request) => {
  const params = await request.json();

  const addSQLocation = await ctx.runAction(api.squareActions.newSQLocation, params);

  return new Response(JSON.stringify({ 'SQResponse': addSQLocation }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const newSQBooking = httpAction(async (ctx, request) => {
  const params = await request.json();

  console.log(params);

  const newSQBooking = await ctx.runAction(api.squareActions.newSQBooking, params);

  return new Response(JSON.stringify({ 'SQResponse': newSQBooking }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const getSQLocation = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQLocation = await ctx.runAction(api.squareActions.getSQLocation, params);

  return new Response(JSON.stringify({ 'SQResponse': SQLocation }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});


export const editSQLocation = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQLocation = await ctx.runAction(api.squareActions.editSQLocation, params);

  return new Response(JSON.stringify({ 'SQResponse': SQLocation }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const newSQCustomer = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQCustomer = await ctx.runAction(api.squareActions.newSQCustomer, params);

  return new Response(JSON.stringify({ 'SQResponse': SQCustomer }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});


export const getSQMainLocation = httpAction(async (ctx) => {
  const SQMainLocation = await ctx.runAction(api.squareActions.getSQMainLocation);

  return new Response(JSON.stringify({ 'SQResponse': SQMainLocation }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const createCheckoutPaymentLinks = httpAction(async (ctx, request) => {
  const params = await request.json();


  const createCheckoutPaymentLinks = await ctx.runAction(api.squareActions.createCheckoutPaymentLinks, params);

  return new Response(JSON.stringify({ 'SQResponse': createCheckoutPaymentLinks }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const getCheckoutPaymentLinks = httpAction(async (ctx) => {

  const getCheckoutPaymentLinks = await ctx.runAction(api.squareActions.getCheckoutPaymentLinks);

  return new Response(JSON.stringify({ 'SQResponse': getCheckoutPaymentLinks }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});



export const getSQCustomerByEmail = httpAction(async (ctx, request) => {
  const params = await request.json();;

  const SQCustomerEmail = await ctx.runAction(api.squareActions.getSQCustomerByEmail, params);

  return new Response(JSON.stringify({ 'SQResponse': SQCustomerEmail }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const getSQCatalogObjectByID = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQCatalogObjectID = await ctx.runAction(api.squareActions.getSQCatalogObjectByID, params);

  return new Response(JSON.stringify({ 'SQResponse': SQCatalogObjectID }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});


export const newSQOnlineSubscriptionCheckout = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQOnlineSubscriptionCheckout = await ctx.runAction(api.squareActions.newSQOnlineSubscriptionCheckout, params);

  return new Response(JSON.stringify({ 'SQResponse': SQOnlineSubscriptionCheckout }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });

});

export const newSQSubscription = httpAction(async (ctx, request) => {
  const params: any = await request.json();

  const SQSubscription = await ctx.runAction(api.squareActions.newSQSubscription, params);

  return new Response(JSON.stringify({ 'SQResponse': SQSubscription }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const newSQCard = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQCard = await ctx.runAction(api.squareActions.newSQCard, params);

  return new Response(JSON.stringify({ 'SQResponse': SQCard }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const getSQCards = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQCards = await ctx.runAction(api.squareActions.getSQCards, params);

  return new Response(JSON.stringify({ 'SQResponse': SQCards }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});


export const getSQCard = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQCard = await ctx.runAction(api.squareActions.getSQCard, params);

  return new Response(JSON.stringify({ 'SQResponse': SQCard }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const disableSQCard = httpAction(async (ctx, request) => {
  const params = await request.json()

  const SQCard = await ctx.runAction(api.squareActions.disableSQCard, params);

  return new Response(JSON.stringify({ 'SQResponse': SQCard }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});



export const newSQOrder = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQOrder = await ctx.runAction(api.squareActions.newSQOrder, params);

  return new Response(JSON.stringify({ 'SQResponse': SQOrder }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const newSQInvoice = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQInvoice = await ctx.runAction(api.squareActions.newSQInvoice, params);

  return new Response(JSON.stringify({ 'SQResponse': SQInvoice }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const getSQInvoices = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQInvoices = await ctx.runAction(api.squareActions.getSQInvoices, params);

  return new Response(JSON.stringify({ 'SQResponse': SQInvoices }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});


export const newSQPayment = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQPayment = await ctx.runAction(api.squareActions.newSQPayment, params);

  return new Response(JSON.stringify({ 'SQResponse': SQPayment }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const getSQCustomers = httpAction(async (ctx, request) => {
  const SQUsers = await ctx.runAction(api.squareActions.getSQCustomers);

  return new Response(JSON.stringify({ 'SQResponse': SQUsers }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const getSQCustomer = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQUser = await ctx.runAction(api.squareActions.getSQCustomer, params);

  return new Response(JSON.stringify({ 'SQResponse': SQUser }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});


export const updateSQCustomer = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQUser = await ctx.runAction(api.squareActions.updateSQCustomer, params);

  return new Response(JSON.stringify({ 'SQResponse': SQUser }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const deleteSQCustomer = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQUser = await ctx.runAction(api.squareActions.deleteSQCustomer, params);

  return new Response(JSON.stringify({ 'SQResponse': SQUser }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});


export const getSQSubscriptions = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQSubscriptions = await ctx.runAction(api.squareActions.getSQSubscriptions, params);

  return new Response(JSON.stringify({ 'SQResponse': SQSubscriptions }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const updateSQLocation = httpAction(async (ctx, request) => {
  const params = await request.json();;

  const SQLocation = await ctx.runAction(api.squareActions.updateSQLocation, params);

  return new Response(JSON.stringify({ 'SQResponse': SQLocation }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const pauseSQSubscription = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQSubscription = await ctx.runAction(api.squareActions.pauseSQSubscription, params);

  return new Response(JSON.stringify({ 'SQResponse': SQSubscription }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const cancelSQSubscription = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQSubscription = await ctx.runAction(api.squareActions.cancelSQSubscription, params);

  return new Response(JSON.stringify({ 'SQResponse': SQSubscription }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const resumeSQSubscription = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQSubscription = await ctx.runAction(api.squareActions.resumeSQSubscription, params);

  return new Response(JSON.stringify({ 'SQResponse': SQSubscription }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});

export const getSQSubscriptionByID = httpAction(async (ctx, request) => {
  const params = await request.json();

  const SQSubscriptionID = await ctx.runAction(api.squareActions.getSQSubscriptionByID, params);

  return new Response(JSON.stringify({ 'SQResponse': SQSubscriptionID }), {
    headers: new Headers({
      'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'origin',
    }),

    status: 200,
  });
});


