export class User {
    id: number;
    name: string;
    email: string;
    role: string;
    mainGroup: {
        id : string,
        name : string
    }
    token: string
}