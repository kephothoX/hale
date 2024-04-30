export interface File {
    dest_url: String;
    object: {
        billable_size: Number;
        created_at: Date;
        folder: String;
        id: String;
        metadata: {
            created_by: String;
            priority: String;
        };
        metadata_protected: {
            format: String;
            mimetype: String;
        };
        name: String;
        sha256: String;
        size: Number;
        type: String;
        updated_at: Date;
    }

}


export interface Files {
    billable_size: Number;
    created_at: String;
    folder: String;
    id: String;
    metadata: {
        created_by: String;
        priority: String;
    },
    metadata_protected: {
        format: String;
        mimetype: String;
    },
    name: String;
    sha256: String;
    size: Number;
    type: String;
    updated_at: String;

}
