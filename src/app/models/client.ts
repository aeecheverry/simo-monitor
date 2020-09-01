export class Client {
    id: string;
    name: string;
    dashboards: {
      orders:{
          id:string
      },
      transactions:{
          id:string
      } 
    };
    country: string;
    deployment: {
        type: string,
        version: string
    }
    integrations: {
        oom:{
            ram:string
        },
        oim:{
            ram:string
        }
        mongodb:{
            ram:string,
            storage: string
        },
        elasticsearch:{
            ram:string,
            storage: string
        }
    };
    logoUrl: string;
}