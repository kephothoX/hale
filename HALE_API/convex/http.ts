import { httpRouter } from 'convex/server';


import {
getSQLocations,
getSQCard,
getSQCards,
getSQCatalog,
getSQCatalogObjectByID,
getSQCustomerByEmail,
getSQInvoices,
getSQSubscriptionByID,
getSQSubscriptions,
getSQLocation,
getSQMainLocation,
getSQCustomer,
getSQCustomers,
newSQCard,
newSQCatalog,
newSQCustomer,
newSQInvoice,
newSQLocation,
newSQOnlineSubscriptionCheckout,
newSQPayment,
newSQOrder,
newSQSubscription,
getSQBulkCatalog,
getSQMerchants,
newSQBooking,
searchSQCatalogItems,
searchSQCatalog,
getSQTeamMember,
getSQTeamMembers,
newSQTeamMember,
updateSQTeamMember,
listSQBookings,
getSQBooking,
getSQVendor,
getSQVendors,
newSQVendor,
updateSQVendor,
createCheckoutPaymentLinks,
getCheckoutPaymentLinks


} from './square';


import {
  startSignupSignInFlow,
  newAuthUser,
  updateAuthUser,
  verifyAuthUser,
  verifyEmail,
  verifyPassword,
  loginWithPassword,
  passwordReset,
  auditLog,
  checkEmailBreach,
  logoutAuthUser,
  updateAuthUserPassword,
  authFlowUpdate,
  authFlowRestart,
  inviteAuthUser,
  getAuthUser,
  getAuthUserSessions
} from './pangeaAuth';

import {
  getFiles,
  newFolder,
  uploadFile,
  getFile,
  sendFileSharableLink,
  getSharedFiles,
  newSharedFile,
  updateFile,
  delSharableLink
} from './pangeaSShare'




const http = httpRouter();

http.route({
  path: '/api/v1/files',
  method: 'POST',
  handler: getFiles
});


http.route({
  path: '/api/v1/file',
  method: 'POST',
  handler: getFile
});

http.route({
  path: '/api/v1/files/update',
  method: 'POST',
  handler: updateFile
});

http.route({
  path: '/api/v1/files/share/new',
  method: 'POST',
  handler: newSharedFile
});

http.route({
  path: '/api/v1/file/share/send',
  method: 'POST',
  handler: sendFileSharableLink
});

http.route({
  path: '/api/v1/file/share/remove',
  method: 'POST',
  handler: delSharableLink
});


http.route({
  path: '/api/v1/files/shared',
  method: 'POST',
  handler: getSharedFiles
});


http.route({
  path: '/api/v1/files/upload',
  method: 'POST',
  handler: uploadFile
});

http.route({
  path: '/api/v1/folders/new',
  method: 'POST',
  handler: newFolder
});


http.route({
  path: '/api/v1/auth/flow/start',
  method: 'POST',
  handler: startSignupSignInFlow
});

http.route({
  path: '/api/v1/auth/flow/restart',
  method: 'POST',
  handler: authFlowRestart
});


http.route({
  path: '/api/v1/auth/flow/update',
  method: 'PUT',
  handler: authFlowUpdate
});

http.route({
  path: '/api/v1/auth/users/new',
  method: 'POST',
  handler: newAuthUser
});

http.route({
  path: '/api/v1/auth/users/update',
  method: 'PUT',
  handler: updateAuthUser
});

http.route({
  path: '/api/v1/auth/user',
  method: 'POST',
  handler: getAuthUser
});

http.route({
  path: '/api/v1/auth/user/sessions',
  method: 'POST',
  handler: getAuthUserSessions
});

http.route({
  path: '/api/v1/auth/users/verify',
  method: 'POST',
  handler: verifyAuthUser
});

http.route({
  path: '/api/v1/auth/users/invite',
  method: 'POST',
  handler: inviteAuthUser
});

http.route({
  path: '/api/v1/email/verify',
  method: 'POST',
  handler: verifyEmail
});

http.route({
  path: '/api/v1/password/verify',
  method: 'POST',
  handler: verifyPassword
});


http.route({
  path: '/api/v1/password/login',
  method: 'POST',
  handler: loginWithPassword
});

http.route({
  path: '/api/v1/password/reset',
  method: 'POST',
  handler: passwordReset
});

http.route({
  path: '/api/v1/audit/log',
  method: 'POST',
  handler: auditLog
});

http.route({
  path: '/api/v1/check/email/breach',
  method: 'POST',
  handler: checkEmailBreach
});

http.route({
  path: '/api/v1/auth/users/logout',
  method: 'POST',
  handler: logoutAuthUser
});

http.route({
  path: '/api/v1/auth/users/password/update',
  method: 'POST',
  handler: updateAuthUserPassword
});


http.route({
  path: '/api/v1/square/location',
  method: 'POST',
  handler: getSQLocation,
});

http.route({
  path: '/api/v1/square/locations/new',
  method: 'POST',
  handler: newSQLocation,
});


http.route({
  path: '/api/v1/square/main/location',
  method: 'GET',
  handler: getSQMainLocation,
});


http.route({
  path: '/api/v1/square/locations',
  method: 'GET',
  handler: getSQLocations
});

http.route({
  path: '/api/v1/square/card',
  method: 'GET',
  handler: getSQCard
});

http.route({
  path: '/api/v1/square/merchants',
  method: 'GET',
  handler: getSQMerchants
});

http.route({
  path: '/api/v1/square/cards',
  method: 'GET',
  handler: getSQCards
});

http.route({
  path: '/api/v1/square/cards/new',
  method: 'POST',
  handler: newSQCard
});

http.route({
  path: '/api/v1/square/catalog',
  method: 'GET',
  handler: getSQCatalog
});

http.route({
  path: '/api/v1/square/catalog/items/search',
  method: 'POST',
  handler: searchSQCatalogItems
});

http.route({
  path: '/api/v1/square/catalog/search',
  method: 'POST',
  handler: searchSQCatalog
});

http.route({
  path: '/api/v1/square/catalog/bulk',
  method: 'POST',
  handler: getSQBulkCatalog
});

http.route({
  path: '/api/v1/square/catalog/object/id',
  method: 'GET',
  handler: getSQCatalogObjectByID
});

http.route({
  path: '/api/v1/square/catalog/new',
  method: 'POST',
  handler: newSQCatalog
});

http.route({
  path: '/api/v1/square/customer/email',
  method: 'GET',
  handler: getSQCustomerByEmail
});

http.route({
  path: '/api/v1/square/invoices',
  method: 'POST',
  handler: getSQInvoices
});

http.route({
  path: '/api/v1/square/subscriptions/id',
  method: 'GET',
  handler: getSQSubscriptionByID
});

http.route({
  path: '/api/v1/square/subscriptions/online/checkout',
  method: 'POST',
  handler: newSQOnlineSubscriptionCheckout
});

http.route({
  path: '/api/v1/square/subscriptions',
  method: 'POST',
  handler: getSQSubscriptions
});

http.route({
  path: '/api/v1/square/subscriptions/new',
  method: 'POST',
  handler: newSQSubscription
});

http.route({
  path: '/api/v1/square/customer',
  method: 'POST',
  handler: getSQCustomer
});

http.route({
  path: '/api/v1/square/customers',
  method: 'GET',
  handler: getSQCustomers
});

http.route({
  path: '/api/v1/square/customers/new',
  method: 'POST',
  handler: newSQCustomer
});

http.route({
  path: '/api/v1/square/team/members',
  method: 'POST',
  handler: getSQTeamMembers
});

http.route({
  path: '/api/v1/square/team/member',
  method: 'POST',
  handler: getSQTeamMember
});

http.route({
  path: '/api/v1/square/team/members/new',
  method: 'POST',
  handler: newSQTeamMember
});

http.route({
  path: '/api/v1/square/team/members/update',
  method: 'POST',
  handler: updateSQTeamMember
});

http.route({
  path: '/api/v1/square/vendors',
  method: 'POST',
  handler: getSQVendors
});

http.route({
  path: '/api/v1/square/vendor',
  method: 'POST',
  handler: getSQVendor
});

http.route({
  path: '/api/v1/square/vendors/new',
  method: 'POST',
  handler: newSQVendor
});

http.route({
  path: '/api/v1/square/vendors/update',
  method: 'POST',
  handler: updateSQVendor
});

http.route({
  path: '/api/v1/square/invoices/new',
  method: 'POST',
  handler: newSQInvoice
});

http.route({
  path: '/api/v1/square/payments/new',
  method: 'POST',
  handler: newSQPayment
});

http.route({
  path: '/api/v1/square/orders/new',
  method: 'POST',
  handler: newSQOrder
});

http.route({
  path: '/api/v1/square/bookings/new',
  method: 'POST',
  handler: newSQBooking
});

http.route({
  path: '/api/v1/square/bookings/list',
  method: 'POST',
  handler: listSQBookings
});

http.route({
  path: '/api/v1/square/booking',
  method: 'POST',
  handler: getSQBooking
});


http.route({
  path: '/api/v1/square/checkout/links/create',
  method: 'POST',
  handler: createCheckoutPaymentLinks
});

http.route({
  path: '/api/v1/square/checkout/links',
  method: 'GET',
  handler: getCheckoutPaymentLinks
});


// Convex expects the router to be the default export of `convex/http.js`.
export default http;

