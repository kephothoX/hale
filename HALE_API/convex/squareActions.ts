'use node';

import 'dotenv/config'
import { action } from './_generated/server';
import { v } from 'convex/values';

const SQAuth = `Bearer ${ process.env.SQUARE_TOKEN}`;



export const addNewSQSubscription = action({
  args: {},
  handler: async (ctx, args: any) => {
    const SQSubscription =  await fetch('https://connect.squareupsandbox.com/v2/subscriptions/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });


    return await SQSubscription.json();
  }
});


export const getSQLocations = action({
  handler: async () => {
    const getSQLocations = await fetch('https://connect.squareupsandbox.com/v2/locations', {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getSQLocations.json();
  }
});


export const getSQCatalog = action({
  handler: async () => {
    const getSQCatalog = await fetch('https://connect.squareupsandbox.com/v2/catalog/list', {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getSQCatalog.json();
  }
});

export const getSQBulkCatalog = action({
  
  handler: async (ctx, args: any) => {
    const getSQCatalog = await fetch('https://connect.squareupsandbox.com/v2/catalog/batch-retrieve', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await getSQCatalog.json();
  }
});

export const newSQCatalog = action({  
  handler: async (ctx, args: any) => {
    const newSQCatalog = await fetch('https://connect.squareupsandbox.com/v2/catalog/object', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await newSQCatalog.json();
  }
});

export const newSQTeamMember = action({
  args: {
    team_member: v.object({
        assigned_locations: v.object({
          location_ids: v.array(v.string()),
          assignment_type: v.string()
        }), 
        reference_id: v.string(),
        status: v.string(),
        phone_number: v.string(),
        given_name: v.string(),
        family_name: v.string(),
        email_address: v.string()
      }),
      idempotency_key: v.string()
   },
  handler: async (ctx, args: any) => {
    console.log(args);
    const newSQTeamMember = await fetch('https://connect.squareupsandbox.com/v2/team-members', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await newSQTeamMember.json();
  }
});

export const getSQTeamMembers = action({ 
  handler: async (ctx, args: any) => {

    console.log(args);

    const SQTeamMembers = await fetch('https://connect.squareupsandbox.com/v2/team-members/search', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await SQTeamMembers.json();
  }
});

export const updateSQTeamMember = action({
  args: { team_member_id: v.string() },
  handler: async (ctx, args: any) => {
    const updateSQTeamMember = await fetch(`https://connect.squareupsandbox.com/v2/team-members/${ args.team_member_id}`, {
      method: 'PUT',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await updateSQTeamMember.json();
  }
});

export const listSQBookings = action({
  args: {
    location_id: v.optional(v.string()),
    customer_id: v.optional(v.string()),
    team_member_id: v.optional(v.string())
  },
  handler: async (ctx, args: any) => {
    console.log(args);

    const SQBookings = await fetch(`https://connect.squareupsandbox.com/v2/bookings?location_id=${ args.location_id }&customer_id=${ args.customer_id }&team_member_id=${ args.team_member_id}`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await SQBookings.json();
  }
});

 
 export const getSQBooking = action({
  args: {
    booking_id: v.optional(v.string())
  },
  handler: async (ctx, args: any) => {
    const SQBooking = await fetch(`https://connect.squareupsandbox.com/v2/bookings/${ args.booking_id}`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await SQBooking.json();
  }
}); 

export const getSQTeamMember = action({
  args: { team_member_id: v.string() },
  handler: async (ctx, args: any) => {
    const SQTeamMember = await fetch(`https://connect.squareupsandbox.com/v2/team-members/${ args.team_member_id}`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
    });

    return await SQTeamMember.json();
  }
});

export const newSQBooking = action({
  args: {
    idempotency_key: v.string(),
    booking: v.object({
      customer_id: v.string(),
      customer_note: v.string(),
      location_id: v.string(),
      location_type: v.string(),
      seller_note: v.string(),
      start_at: v.string(),
      appointment_segments: v.array(
        v.object({
          team_member_id: v.string(),
          duration_minutes: v.number(),
          service_variation_id: v.string(),
          service_variation_version: v.number()
        })
      )
    })
  },  
  handler: async (ctx, args: any) => {
    const newSQBooking = await fetch('https://connect.squareupsandbox.com/v2/bookings', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await newSQBooking.json();
  }
});

export const newSQLocation = action({
  args: { location: v.object({
    name: v.string(),
    description: v.string(),
    business_name: v.string(),
    business_email: v.string(),
    phone_number: v.string(),
    address: v.object({
      address_line_1: v.string(),
      address_line_2: v.string(),
      locality: v.string(),
      administrative_district_level_1: v.string(),
      postal_code: v.string(),
      sublocality: v.string(),
      first_name: v.string(),
      last_name: v.string(),
    }),
    twitter_username: v.string(),
    instagram_username: v.string(),
    facebook_url: v.string(),
    website_url: v.string(),
    type: v.string(),
    timezone: v.string(),
    mcc: v.string(),
    language_code: v.string(),
    business_hours: v.object({
      periods: v.array(
        v.object({
          day_of_week: v.string(),
          start_local_time: v.string(),
          end_local_time: v.string(),
        }),
      )
    }),
    coordinates: v.object({
      latitude: v.number(),
      longitude: v.number()
    })
  })},
  handler: async (ctx, args: any) => {
    console.log(args);
    const newSQLocation = await fetch('https://connect.squareupsandbox.com/v2/locations/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await newSQLocation.json();
  }
});

export const getSQLocation = action({
  args: { id:  v.optional(v.string()) },  
  handler: async (ctx, args: any) => {
    console.log(args);
    const getSQLocation = await fetch(`https://connect.squareupsandbox.com/v2/locations/${ args.id }`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });
    return await getSQLocation.json();

  }
});


export const editSQLocation = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const editSQLocation = await fetch(`https://connect.squareupsandbox.com/v2/location/${ args.id}`, {
      method: 'PUT',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await editSQLocation.json();
  }
});

export const newSQCustomer = action({
  
  handler: async (ctx, args: any) => {
    const newSQCustomer = await fetch('https://connect.squareupsandbox.com/v2/customers/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await newSQCustomer.json();

  }
});


export const getSQMainLocation = action({
  handler: async (ctx, args: any) => {

    const getSQMainLocation = await fetch('https://connect.squareupsandbox.com/v2/locations/main', {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },

    });

    return await getSQMainLocation.json();

  }

});


export const getSQCustomerByEmail = action({
  
  handler: async (ctx, args: any) => {
    const getSQCustomerByEmail = await fetch('https://connect.squareupsandbox.com/v2/customers/search/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await getSQCustomerByEmail.json();

  }

});

export const getSQCatalogObjectByID = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const getSQCatalogByID = await fetch(`https://connect.squareupsandbox.com/v2/catalog/object/${ args.id }?include_related_objects=true`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    })

    return await getSQCatalogByID.json();
  }
});


export const searchSQCatalog = action({
  handler: async (ctx, args) => {
    console.log(args);
    const searchSQCatalogObjects = await fetch(`https://connect.squareupsandbox.com/v2/catalog/search`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });   

    return await searchSQCatalogObjects.json();
  }
});


export const searchSQCatalogItems = action({
  args: {
    product_types: v.optional(v.array(v.string())),
    enabled_location_ids: v.optional(v.array(v.string()))
  },
  handler: async (ctx, args) => {
    console.log(args);
    const searchSQCatalogItems = await fetch(`https://connect.squareupsandbox.com/v2/catalog/search-catalog-items`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });   

    return await searchSQCatalogItems.json();
  }
});


export const newSQOnlineSubscriptionCheckout = action({
  
  handler: async (ctx, args: any) => {
    const newSQOnlineSubscriptionCheckout = await fetch('https://connect.squareupsandbox.com/v2/online-checkout/payment-links/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)

    })

    return await newSQOnlineSubscriptionCheckout.json();
  }
});

export const newSQSubscription = action({
  
  handler: async (ctx, args: any) => {
    const newSQSubscription = await fetch('https://connect.squareupsandbox.com/v2/subscriptions/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    })

    return await newSQSubscription.json();
  }
});

export const newSQCard = action({
  
  handler: async (ctx, args: any) => {
    const newSQCard = await fetch('https://connect.squareupsandbox.com/v2/cards', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await newSQCard.json();

  }
});

export const getSQCards = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const getSQCards = await fetch(`https://connect.squareupsandbox.com/v2/cards?customer_id=${ args.id }`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getSQCards.json();

  }
});


export const getSQCard = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const getSQCard = await fetch(`https://connect.squareupsandbox.com/v2/cards/${ args.id }`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getSQCard.json();

  }
});

export const disableSQCard = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const disableSQCard = await fetch(`https://connect.squareupsandbox.com/v2/cards/${ args.id }/disable/`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await disableSQCard.json();
  }
});



export const newSQOrder = action({
  
  handler: async (ctx, args: any) => {
    const newSQOrder = await fetch('https://connect.squareupsandbox.com/v2/orders/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await newSQOrder.json();
  }
});

export const newSQInvoice = action({
  
  handler: async (ctx, args: any) => {
    const newSQInvoice = await fetch('https://connect.squareupsandbox.com/v2/invoices/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await newSQInvoice.json();
  }
});

export const getSQInvoices = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const getSQInvoices = await fetch(`https://connect.squareupsandbox.com/v2/invoices?location_id=${ args.id }`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getSQInvoices.json();
  }
});


export const newSQPayment = action({
  args: {
    amount_money: v.object({
      amount: v.number(),
      currency: v.string()
    }),
    idempotency_key: v.string(),
    location_id: v.string(),
    source_id: v.string(),
    verification_token: v.string()
  },
  handler: async (ctx, args: any) => {  
    const newSQPayment = await fetch('https://connect.squareupsandbox.com/v2/payments/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await newSQPayment.json();
  }
});

export const getSQCustomers = action({
  handler: async (ctx, args: any) => {
    const getSQUsers = await fetch('https://connect.squareupsandbox.com/v2/customers?sort_field=CREATED_AT&sort_order=DESC', {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getSQUsers.json();
  }
});

export const getSQCustomer = action({
  args: { email: v.string() }, 
  handler: async (ctx, args: any) => {
    const getSQUser = await fetch(`https://connect.squareupsandbox.com/v2/customers/search`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify({
        query: {
          filter: {
            email_address: {
              exact: args.email
            }
          }
        }
      })
    });

    return await getSQUser.json();
  }
});


export const updateSQCustomer = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const updateSQUser = await fetch(`https://connect.squareupsandbox.com/v2/customers/${ args.id }`, {
      method: 'PUT',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await updateSQUser.json();
  }
});

export const deleteSQCustomer = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const deleteSQUser = await fetch(`https://connect.squareupsandbox.com/v2/customers/${ args.id }`, {
      method: 'DELETE',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await deleteSQUser.json();
  }
});


export const getSQSubscriptions = action({  
  handler: async (ctx, args: any) => {
    const getSQSubscriptions = await fetch('https://connect.squareupsandbox.com/v2/invoices/search/', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)

    });
    return await getSQSubscriptions.json();
  }
});

export const updateSQLocation = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const updateSQLocation = await fetch(`https://connect.squareupsandbox.com/v2/locations/${ args.id }`, {
      method: 'PUT',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  args
    });

    return await updateSQLocation.json();
  }
});

export const pauseSQSubscription = action({
  args: { subscription_id: v.string() },
  handler: async (ctx, args: any) => {
    const pauseSQSubscription = await fetch(`https://connect.squareupsandbox.com/v2/subscriptions/${ args.subscription_id }/pause/`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  args
    });

    return await pauseSQSubscription.json();
  }
});

export const cancelSQSubscription = action({
  args: { subscription_id: v.string() },
  handler: async (ctx, args: any) => {
    const cancelSQSubscription = await fetch(`https://connect.squareupsandbox.com/v2/subscriptions/${ args.subscription_id }/cancel/`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await cancelSQSubscription.json();

  }
});

export const resumeSQSubscription = action({
  args: { subscription_id: v.string() },
  handler: async (ctx, args: any) => {
    const resumeSQSubscription = await fetch(`https://connect.squareupsandbox.com/v2/subscriptions/${ args.subscription_id}/resume/`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body:  JSON.stringify(args)
    });

    return await resumeSQSubscription.json();
  }
});

export const getSQSubscriptionByID = action({
  args: { id: v.string() },
  handler: async (ctx, args: any) => {
    const getSQSubscriptionID = await fetch(`https://connect.squareupsandbox.com/v2/subscriptions/${ args.id }`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getSQSubscriptionID.json();
  }
});

export const getSQMerchants = action({
  
  handler: async (ctx, args: any) => {
    const getSQSubscriptions = await fetch('https://connect.squareupsandbox.com/v2/merchants', {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });
    return await getSQSubscriptions.json();
  }
});



export const newSQVendor = action({
  args: {
    vendor: v.object({
      address:  v.object({
        address_line_1: v.string(),
        administrative_district_level_3: v.optional(v.string()),
        administrative_district_level_2: v.optional(v.string()),
        administrative_district_level_1: v.optional(v.string()),
        country: v.string(),
        first_name: v.string(),
        last_name: v.string(),
        locality: v.string(),
        postal_code: v.string(),
      }),
      name: v.string(),
      note: v.string(),
      status: v.string(),
      contacts: v.optional(v.array(
        v.object({
          ordinal: v.number(),
          email_address: v.string(),
          name: v.string(),
          phone_number: v.string(),
          removed: v.boolean(),
        })
      )),
    }),
    idempotency_key: v.string(),
   },
  handler: async (ctx, args: any) => {
    console.log(args);
    const newSQVendor = await fetch('https://connect.squareupsandbox.com/v2/vendors/create', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await newSQVendor.json();
  }
});

export const getSQVendors = action({ 
   args: {
    filter: v.object({
      status: v.optional(v.array(
        v.string()
      ))
    })
  },
  handler: async (ctx, args) => {

    console.log(args);

    const SQVendors = await fetch('https://connect.squareupsandbox.com/v2/vendors/search', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await SQVendors.json();
  }
});

export const updateSQVendor = action({  
  handler: async (ctx, args: any) => {
    const updateSQVendor = await fetch(`https://connect.squareupsandbox.com/v2/vendors/${ args.vendor_id}`, {
      method: 'PUT',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await updateSQVendor.json();
  }
});


export const getSQVendor = action({
  args: { vendor_id: v.string() },
  handler: async (ctx, args: any) => {
    const getVendor = await fetch(`https://connect.squareupsandbox.com/v2/vendors/${ args.vendor_id}`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getVendor.json();
  }
});

export const createCheckoutPaymentLinks = action({
  args: {
      quick_pay: v.object({
        location_id: v.string(),
        name: v.string(),
        price_money: v.object({
          amount: v.number(),
          currency: v.string(),
        })
      }),
      idempotency_key: v.string(),
      checkout_options: v.object({
        allow_tipping: v.boolean(),
        accepted_payment_methods: v.object({
          cash_app_pay: v.boolean(),
          google_pay: v.boolean()
        }),
        merchant_support_email: v.string(),
        redirect_url: v.string()
      })
    },
  handler: async (ctx, args: any) => {
    const createCheckoutPaymentLinks = await fetch(`https://connect.squareupsandbox.com/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      },
      body: JSON.stringify(args)
    });

    return await createCheckoutPaymentLinks.json();
  }
});



export const getCheckoutPaymentLinks = action({
  handler: async (ctx, args: any) => {
    const getCheckoutPaymentLinks = await fetch(`https://connect.squareupsandbox.com/v2/online-checkout/payment-links`, {
      method: 'GET',
      headers: {
        'Square-Version': '2024-04-17',
        'Content-Type': 'application/json',
        'Authorization': SQAuth,
      }
    });

    return await getCheckoutPaymentLinks.json();
  }
});