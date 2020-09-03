export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    job: string;
    client: string; 
    mainGroup: {
        id : string,
        name : string
    };
    token: string;
}