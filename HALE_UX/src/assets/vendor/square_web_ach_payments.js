async function initializeACH(payments) {
  const ach = await payments.ach();
  // Note: ACH does not have an .attach(...) method
  // the ACH auth flow is triggered by .tokenize(...)
  return ach;
}

async function createPayment(token) {
  const body = JSON.stringify({
    amount_money: {
      amount: parseInt(window.localStorage.getItem('TotalCheckOutAmount')),
      currency: 'USD'
    },
    location_id: locationId,
    source_id: token,
    verification_token: verificationToken,
    idempotency_key: window.crypto.randomUUID(),
  });


  const paymentResponse = await fetch('/api/square/payments/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (paymentResponse.ok) {
    return paymentResponse.json();
  }

  const errorBody = await paymentResponse.text();
  throw new Error(errorBody);
}

async function tokenize(paymentMethod, options = {}) {
  paymentMethod.addEventListener(
    'ontokenization',
    async function (event) {
      const { tokenResult, error } = event.detail;
      if (error !== undefined) {
        let errorMessage = `Tokenization failed with error: ${error}`;
        throw new Error(errorMessage);
      }
      if (tokenResult.status === 'OK') {
        const paymentResults = await createPayment(tokenResult.token);
        displayPaymentResults('SUCCESS');

        console.debug('Payment Success', paymentResults);
      } else {
        let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(
            tokenResult.errors,
          )}`;
        }
        throw new Error(errorMessage);
      }
    },
  );
  await paymentMethod.tokenize(options);
}

// status is either SUCCESS or FAILURE;
function displayPaymentResults(status) {
  const statusContainer = document.getElementById(
    'payment-status-container',
  );
  if (status === 'SUCCESS') {
    statusContainer.classList.remove('is-failure');
    statusContainer.classList.add('is-success');
  } else {
    statusContainer.classList.remove('is-success');
    statusContainer.classList.add('is-failure');
  }

  statusContainer.style.visibility = 'visible';
}

function getBillingContact(form) {
  const formData = new FormData(form);
  // It is expected that the developer performs form field validation
  // which does not occur in this example.
  return {
    givenName: formData.get('givenName'),
    familyName: formData.get('familyName'),
  };
}

function getACHOptions(form) {
  const billingContact = getBillingContact(form);
  const accountHolderName = `${billingContact.givenName} ${billingContact.familyName}`;

  return {
    accountHolderName,
    intent: 'CHARGE',
    total: { amount: window.localStorage.getItem('TotalCheckOutAmount'), currencyCode: 'USD' },
  };
}

document.addEventListener('DOMContentLoaded', async function () {
  if (!window.Square) {
    throw new Error('Square.js failed to load properly');
  }

  let payments;
  try {
    payments = window.Square.payments(appId, locationId);
  } catch {
    const statusContainer = document.getElementById(
      'payment-status-container',
    );
    statusContainer.className = 'missing-credentials';
    statusContainer.style.visibility = 'visible';
    return;
  }

  let ach;
  try {
    ach = await initializeACH(payments);
  } catch (e) {
    console.error('Initializing ACH failed', e);
    return;
  }

  async function handlePaymentMethodSubmission(
    event,
    paymentMethod,
    options,
  ) {
    event.preventDefault();
    const achButton = document.getElementById('ach-button');

    try {
      achButton.disabled = true;
      await tokenize(paymentMethod, options);
    } catch (e) {
      achButton.disabled = false;
      displayPaymentResults('FAILURE');
      console.error(e.message);
    }
  }

  if (ach) {
    const achButton = document.getElementById('ach-button');
    achButton.addEventListener('click', async function (event) {
      const paymentForm = document.getElementById('payment-form');
      const achOptions = getACHOptions(paymentForm);
      await handlePaymentMethodSubmission(event, ach, achOptions);
    });
  }
});