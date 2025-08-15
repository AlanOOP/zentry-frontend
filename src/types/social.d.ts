export type SocialNetwork = {
    _id: string;
    name: string;
    url: string;
    enabled: boolean;
}


export type DevTreeLink = Omit<SocialNetwork, '_id'>;