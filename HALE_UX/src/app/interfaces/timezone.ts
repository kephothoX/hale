export interface Timezone {
    id: String;
    aliases: [],
    location: {
        countryCode: String;
        countryName: String;
        comment: String;
        latitude: Number;
        longitude: Number;
    },
    offsets: [ ],
    currentOffset: String;
    nextTransition: {}

}
