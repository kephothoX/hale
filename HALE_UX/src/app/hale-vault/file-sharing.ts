export interface FileSharing {
    access_count: Number;
    authenticators: String[ ];
    created_at: String;
    expires_at: String;
    id: String;
    link: String;
    link_type: String;
    max_access_count: Number;
    message: String;
    notify_email: String;
    storage_pool_id: String;
    tags: String[];
    targets: String[];
    title: String;

}
