async function createPayment(token, verificationToken) {
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

    const paymentResponse = await fetch('api/square/payment/new', {
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

async function tokenize(paymentMethod) {
    const tokenResult = await paymentMethod.tokenize();
    if (tokenResult.status === 'OK') {
        return tokenResult.token;
    } else {
        let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
        if (tokenResult.errors) {
            errorMessage += ` and errors: ${JSON.stringify(
                tokenResult.errors,
            )}`;
        }

        throw new Error(errorMessage);
    }
}

// Required in SCA Mandated Regions: Learn more at https://developer.squareup.com/docs/sca-overview
async function verifyBuyer(payments, token) {
    let SQ_User = window.sessionStorage.getItem('SQ_User');
    SQ_User = JSON.parse(SQ_User);

    const verificationDetails = {
        amount: window.localStorage.getItem('TotalCheckOutAmount'),
        billingContact: {
            givenName: SQ_User.given_name,
            familyName: SQ_User.family_name,
            email: SQ_User.email_address,
            phone: SQ_User.phone_number,
            addressLines: [`${ SQ_User.address.address_line_1 }, ${ SQ_User.address.address_line_2 }`],
            city: SQ_User.address.administrative_district_level_1,
            state: SQ_User.address.country,
            countryCode: SQ_User.address.country,
        },
        currencyCode: 'USD',
        intent: 'CHARGE'
    };

    

    const verificationResults = await payments.verifyBuyer(
        token,
        verificationDetails,
    );
    return verificationResults.token;
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

async function handlePaymentMethodSubmission(
    payments,
    event,
    paymentMethod,
) {
    event.preventDefault();

    try {
        const token = await tokenize(paymentMethod);
        let verificationToken = await verifyBuyer(payments, token);
        const paymentResults = await createPayment(token, verificationToken);
        displayPaymentResults('SUCCESS');

        console.debug('Payment Success', paymentResults);
    } catch (e) {
        displayPaymentResults('FAILURE');
        console.error(e.message);
    }
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

    try {
        const paymentRequest = payments.paymentRequest({
            countryCode: 'US',
            currencyCode: 'USD',
            total: {
                amount: window.localStorage.getItem('TotalCheckOutAmount'),
                label: 'Total',
            },
        });
        const googlePay = await payments.googlePay(paymentRequest);

        await googlePay.attach('#google-pay-button');
        document
            .getElementById('google-pay-button')
            .addEventListener('click', async function (event) {
                await handlePaymentMethodSubmission(payments, event, googlePay);
            });
    } catch (e) {
        console.error('Initializing Google Pay failed', e);
        // There are a number of reason why Google Pay may not be supported
        // (e.g. Browser Support, Device Support, Account). Therefore you should handle
        // initialization failures, while still loading other applicable payment methods.
    }
});

