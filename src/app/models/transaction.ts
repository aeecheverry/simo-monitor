export class Transaction {
    id: string;
    date: string;
    service: string;
    succeed: boolean;
    tags: string[];
    input: string;
    output: string;
    subtraces: 
        {
            name: string,
            start: number,
            end: number,
            duration: number
        }[]
    ;
    trace: {
        name: string,
        start: number,
        end: number,
        duration: number
    }
    logObservations: string[];
}