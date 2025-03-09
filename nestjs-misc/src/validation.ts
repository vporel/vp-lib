import { ValidationError } from "@nestjs/common"

/**
 * Format validation errors
 * Example: { "name": "must be a string", "contact.email": "Email already exists" }
 */
export function formatValidationErrors(validationErrors: ValidationError[]){
    const errors = {}
    function addError(property, constraints){
      for(const constraint in constraints) {
        const firstSpaceIndex = constraints[constraint].indexOf(' ') //To remove the property name from the message
        errors[property] = constraints[constraint].substring(firstSpaceIndex + 1)
      }
    }
    function addErrorGroup(errorGroup){
      if(errorGroup.children.length == 0) addError(errorGroup.property, errorGroup.constraints)
      else errorGroup.children.forEach(child => addErrorGroup({...child, property: errorGroup.property+"."+child.property}))
    }
    validationErrors.forEach(addErrorGroup)
    return errors
}