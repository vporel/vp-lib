/**
 * @author Vivian NKOUANANG (https://github.com/vporel) <dev.vporel@gmail.com>
 * @description This file contains some helpers for mongoose
 */
import { isObjectIdOrHexString } from "mongoose"

/**
 * Get a database entity id as pure string
 */
export function getEntityId(obj: any): string{
    return isObjectIdOrHexString(obj) 
        ? obj.toString() 
        : (typeof obj == "object" 
            ? obj._id.toString()
            : obj
        )
}

/**
 * Compare two database entities
 */
export function compareEntities(objOrId1: any, objOrId2: any): boolean{
    const obj1Id = getEntityId(objOrId1)
    const obj2Id = getEntityId(objOrId2)
    return obj1Id == obj2Id
}

export function getModelName(instance: any){
    return instance.constructor.modelName
}

/**
 * Transform an object to an object that can be used to update a document in the database
 * 
 * Example 
 * 
 * {name: "John", address: {city: "New York", country: "USA"}} => {name: "John", "address.city": "New York", "address.country": "USA"}
 */
export function transformObjectToUpdate(obj: any): any{
    const newObj: any = {}
    for(const key in obj){
        if(obj[key] == null || typeof obj[key] != "object" || Array.isArray(obj[key]) || obj[key] instanceof Date)
            newObj[key] = obj[key]
        else{
            const nestedObjectTransformed = transformObjectToUpdate(obj[key])
            for(const key2 in nestedObjectTransformed)
                newObj[key+"."+key2] = nestedObjectTransformed[key2]
        }
    }
    return newObj
}