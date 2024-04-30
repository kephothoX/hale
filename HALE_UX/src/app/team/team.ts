export interface Team {
    assigned_locations: {
        assignment_type: String;
        location_ids: String[]
    },
    created_at: String;
    email_address: String;
    family_name: String;
    given_name: String;
    id: String;
    is_owner: Boolean;
    phone_number: String;
    reference_id: String;
    status: String;
    updated_at: String;
}

