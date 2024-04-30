

const appId = 'sandbox-sq0idb-9rQUQ7NT3rJFBeE52EsEkQ'; 
const locationId = window.localStorage.getItem('Active_Loc');

async function initializeCard(payments) {
    const card = await payments.card();
    await card.attach('#card-container');
    return card;
}

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

    const paymentResponse = await fetch('/api/square/payments/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    if (paymentResponse.ok) {
        console.log(paymentResponse.json());
        return paymentResponse.json();
    }

    const errorBody = await paymentResponse.text();
    throw new Error(errorBody);
}

async function storeCard(token, customerId, verificationToken) {
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

    const paymentResponse = await fetch('api/square/cards/new', {
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

document.addEventListener('DOMContentLoaded', async function () {

    if (window.Square) {
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

        let card;
        try {

            card = await initializeCard(payments);
        } catch (e) {
            console.error('Initializing Card failed', e);
            return;
        }

        async function handlePaymentMethodSubmission(event, card) {
            event.preventDefault();
            try {
                // disable the submit button as we await tokenization and make a payment request.
                cardButton.disabled = true;
                const token = await tokenize(card);
                const verificationToken = await verifyBuyer(payments, token);
                const paymentResults = await createPayment(
                    token,
                    verificationToken,
                );
                displayPaymentResults('SUCCESS');

                console.debug('Payment Success', paymentResults);
            } catch (e) {
                cardButton.disabled = false;
                displayPaymentResults('FAILURE');
                console.error(e.message);
            }
        }

        async function handleStoreCardSubmission(event, card, customerId) {
            event.preventDefault();

            try {
                // disable the submit button as we await tokenization and make a payment request.
                cardButton.disabled = true;
                const token = await tokenize(card);

                let verificationToken = await verifyBuyer(payments, token);
                const storeCardResults = await storeCard(
                    token,
                    customerId,
                    verificationToken,
                );

                displayResults('SUCCESS');
                console.debug('Store Card Success', storeCardResults);
            } catch (e) {
                cardButton.disabled = false;
                displayResults('FAILURE');
                console.error('Store Card Failure', e);
            }
        }




        const cardButton = document.getElementById('card-button');
        cardButton.addEventListener('click', async function (event) {
            const textInput = document.getElementById('customer-input');
            if (!textInput.reportValidity()) {
                return;
            }

            const customerId = textInput.value;
            await handleStoreCardSubmission(event, card, customerId);
            await handlePaymentMethodSubmission(event, card);
        });

    } else {
        throw new Error('Square.js failed to load properly');
    }
})

