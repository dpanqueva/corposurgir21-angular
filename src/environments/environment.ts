// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'http://localhost:8100/',
  mensaje_error: 'No se ha podido acceder a la información solicitada.',
  contacto_registrado_ok: 'Gracias por escribirnos, un asesor se contactará con usted.',
  mensaje_creado_ok: 'Recurso creado con éxito.',
  mensaje_editado_ok: 'Recurso creado con éxito.',
  mensaje_fallido_fail: 'El recurso al que desea modificar no existe, por lo tanto, no fue modificado.',
  mensaje_no_encontrado: 'Recurso que desea buscar no existe.',
  mensaje_internal_error: 'Ups! Hemos presentado un error, por favor intente más tarde.'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
