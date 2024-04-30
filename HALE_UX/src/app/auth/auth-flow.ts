export interface AuthFlow {
    email: String;
    flow_choices: [
        {
            choice: String;
            data: {
                enrollment: Boolean
                password_policy: {
                    chars_max: Number;
                    chars_min: Number;
                    lower_min: Number;
                    number_min: Number;
                    punct_min: Number;
                    upper_min: Number;
                }
            }
        },
        {
            choice: String;
            data: {
                enrollment: Boolean;
                resend_time: String;
                sent: Boolean;
            }
        },
        {
            choice: String;
            data: {
                resend_time: String;
                sent: Boolean;
                state: String;
            }
        },
        {
            choice: String;
            data: {
                enrollment: Boolean
                redirect_uri: String;
                social_provider: String;
                state: String;
            }
        },
        {
            choice: String;
            data: {
                enrollment: Boolean;
                redirect_uri: String;
                social_provider: String;
                state: String;
            }
        },
        {
            choice: String;
            data: {
                enrollment: Boolean;
                need_phone: Boolean;
                resend_time:String;
                sent: Boolean
            }
        },
        {
            choice: String;
            data: {
                enrollment: Boolean
                totp_secret: {
                    qr_image: String;
                    secret: String;
                }
            }
        }
    ],
    flow_id: String;
    flow_phase: String;
    flow_type: String[];
}
