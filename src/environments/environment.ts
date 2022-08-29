// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'https://localhost:44325/',
    AddEmployeeEndpoint: 'Employee/Add',
    updateEmployeeEndpoint: 'Employee/Update',
    getAllEmployeeEndpoint: 'Employee/GetAll',
    deleteEmployeeEndpoint: 'Employee/Delete/',
    getByIdEmployeeEndpoint: 'Employee/GetById/',


    AddClientEndpoint: 'Client/Add',
    updateClientEndpoint: 'Client/Update',
    getAllClientEndpoint: 'Client/GetAll',
    getAllQueryEndpoint: 'Client/GetAllQuery',

    deleteClientEndpoint: 'Client/Delete/',
    getByIdClientEndpoint: 'Client/GetById/',

    getAllCategoryEndpoint: 'Category/GetAll',
    getByIdCategoryEndpoint: 'Category/GetById/',

    AddProductDetailEndpoint: 'ProductDetail/Add',
    updateProductDetailEndpoint: 'ProductDetail/Update',
    getAllProductDetailEndpoint: 'ProductDetail/GetAll',
    deleteProductDetailEndpoint: 'ProductDetail/Delete/',
    getByIdProductDetailEndpoint: 'ProductDetail/GetById/',

    AddProductEndpoint: 'Product/Add',
    updateProductEndpoint: 'Product/Update',
    updateProductCantEndpoint: 'Product/UpdateCant',
    getAllProductEndpoint: 'Product/GetAll',
    deleteProductEndpoint: 'Product/Delete/',
    getByIdProductEndpoint: 'Product/GetById/',
    getAllProductqueryEndpoint: 'Product/GetAllQuery',
    getAllProductquery2Endpoint: 'Product/GetAllQuery2',


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
