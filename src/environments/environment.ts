// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1Ijoic2hhcmtlZTg5IiwiYSI6ImNraHc1Mm00bDF0NjYycWt6NDFmdDlyemcifQ.6QTf11TbMB-FG8j7RNntWw',
    style: 'mapbox://styles/mapbox/streets-v11',
    circleRadius: 150,
    circleFillColor: '#3D8EFE',
    circleStrokeColor: '#3D8EFE'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
