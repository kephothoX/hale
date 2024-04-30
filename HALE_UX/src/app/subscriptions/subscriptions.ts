export interface Subscriptions {
}


export interface SubscriptionPlanData {
    created_at: String;
    id: String;
    is_deleted: Boolean;
    present_at_all_locations: Boolean;
    subscription_plan_data: {
        name: String;
        subscription_plan_variations: [
            {
                created_at: String;
                id: String;
                is_deleted: Boolean;
                present_at_all_locations: Boolean;
                subscription_plan_variation_data: {
                    name: String;
                    phases: [
                        {
                            cadence: String;
                            ordinal: Number;
                            periods: Number;
                            pricing: {
                                price: {
                                    amount: Number
                                    currency: String;
                                },
                                price_money: {
                                    amount: Number;
                                    currency: String;
                                },
                                type: String;
                            },
                            uid: String;
                        }
                    ],
                    subscription_plan_id: String;
                },
                type: String;
                updated_at: String;
                version: Number;
            }            
        ]
    },
    type: String;
    updated_at: String;
    version: Number;
}