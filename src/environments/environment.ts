// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiHost: "https://r09o8rvlz1.execute-api.us-west-1.amazonaws.com/dev",
  kibana_endpoint: "simoo-elasticsearch.omnixsystem.com",
  
  path_transactions_list_services: "/transactions/services",
  path_transactions_list: "/transactions",

  path_client: "/client",
  path_client_list: "/client/list",

  path_billing_activity: "/billing/activity",
  path_billing_invoices: "/billing/invoices"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
