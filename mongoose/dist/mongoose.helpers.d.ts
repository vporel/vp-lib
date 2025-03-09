/**
 * Get a database entity id as pure string
 */
export declare function getEntityId(obj: any): string;
/**
 * Compare two database entities
 */
export declare function compareEntities(objOrId1: any, objOrId2: any): boolean;
export declare function getModelName(instance: any): any;
/**
 * Transform an object to an object that can be used to update a document in the database
 *
 * Example
 *
 * {name: "John", address: {city: "New York", country: "USA"}} => {name: "John", "address.city": "New York", "address.country": "USA"}
 */
export declare function transformObjectToUpdate(obj: any): any;
