export interface Booking {
    all_day: false,
    appointment_segments: [
        {
            any_team_member: Boolean;
            duration_minutes: Number;
            intermission_minutes: Number;
            service_variation_id: String;
            service_variation_version: Number;
            team_member_id: String;
        }
    ],
    created_at: String;
    creator_details: {
        creator_type: String;
        team_member_id: String;
    },
    customer_id: String;
    customer_note: String;
    id: String;
    location_id: String;
    location_type: String;
    seller_note: String;
    source: String;
    start_at: String;
    status: String;
    transition_time_minutes: Number;
    updated_at: String;
    version: Number;

}
