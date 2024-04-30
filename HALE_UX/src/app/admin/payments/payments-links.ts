export interface PaymentsLinks {
      id: String;
      version: Number;
      order_id: String;
      checkout_options: {
        allow_tipping: Boolean;
        redirect_url: String;
        merchant_support_email: String;
        accepted_payment_methods: {
          apple_pay: Boolean;
          google_pay: Boolean;
          cash_app_pay: Boolean;
          afterpay_clearpay: Boolean;
        }
      },
      url: String;
      long_url: String;
      created_at: String;
    }
