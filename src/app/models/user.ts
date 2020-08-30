export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    mainGroup: {
        id : string,
        name : string
    }
    authentication: {
        mode : string,
        credentials : {
            enabled : boolean,
            key : string,
            secret: string
        }
    };
    sessionToken: string
}