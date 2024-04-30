export interface Services {
    created_at: String;
    id: String;
    is_deleted: Boolean;
    item_data: {
        is_archived: Boolean;
        is_taxable: Boolean;
        name: String;
        ordinal: Number;
        product_type: String;
        variations: [
            {
                created_at: String;
                id: String;
                is_deleted: Boolean;
                item_variation_data: {
                    available_for_booking: Boolean;
                    item_id: String;
                    name: String;
                    pricing_type: String;
                    sellable: Boolean;
                    service_duration: Number;
                    stockable: Boolean;
                    team_member_ids: String[]
                    transition_time: Number;
                },
                present_at_all_locations: Boolean;
                type: String;
                updated_at: String;
                version: Number
            }
        ]
    },
    present_at_all_locations: Boolean;
    type: String;
    updated_at: String;
    version: Number;
}

