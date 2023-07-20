let lineError = require('../models/LineError');

// ------------------ Main Validators -------------------- //

async function validateEquipment(equipmentList, fieldMap, errors) {
    validateColumns(equipmentList, fieldMap, errors)
    validateData(equipmentList, fieldMap, errors)
    validateUniqueKeys(equipmentList, fieldMap, errors)
}

// ------------------ Sub Validators -------------------- //


//Checks equipment list for required fields and registers an error if a required field is missing.

function validateColumns(equipmentList, fieldMap, errors) {

    let headers = Object.keys(equipmentList[0])

    for (col = 0; col < headers.length; col++) {
        let field = fieldMap.get(headers[col]);
        if (field) {
            field.colIndex = col;
        }
    }

    // Check that All the required labels now exist in map
    for (const item of fieldMap[Symbol.iterator]()) {
        if (item[1].isRequired && item[1].colIndex == null) {
            errors.push(new lineError("Required Column Missing", item[0], 'N/A'))
        }
    }

}



function validateData(equipmentList, fieldMap, errors) {

    for (let equipment of equipmentList) {

        let counter = 2

        for (const item of fieldMap[Symbol.iterator]()) {

            let column = item[0];
            let vStr = item[1].validationString;
            let attr = equipment[column];

            if (!vStr) {
                continue;
            }


            let reg = new RegExp(vStr)

            // If required, validate it.
            // If the field is missing, don't validate it as we will already get an error
            if (item[1].isRequired && item[1].colIndex != null) {

                if (attr == '') {
                    errors.push(new lineError(` ${column} column cannot contain empty values`, attr, counter));
                } else if (!reg.test(attr)) {
                    errors.push(new lineError(`Invalid data for ${column}`, attr, counter));

                    // If not required, but not empty, validate it 
                } else if (!item[1].isRequired && (attr !== '')) {

                    if (!reg.test(attr)) {
                        errors.push(new lineError(`Invalid data for ${column}`, attr, counter));
                    }
                }
            }

            // Validate column lengths
            if(item[1].maxLength != null && attr !== '') {
                if (attr.length > item[1].maxLength) {
                    errors.push(new lineError(`Data too long for ${column}. Max ${item[1].maxLength} characters`, attr, counter));
                }
            }
            
        }

        counter ++;
    }
}

function validateUniqueKeys(equipmentList, fieldMap, errors) {

    let uniqueKey = 1;
    let cols = getKeyColums(fieldMap).get(uniqueKey);
    let keyStrings = [];

    // Counter starts at 2 to compensate for excel line indexes
    counter = 2;

    // Push keys to array
    for (let equipment of equipmentList) {
        let update = equipment['Update To'] !== '' ? true : false;
        let project = equipment['Project']
        let number = !update ? equipment['Equipment Number'] : equipment['Update To']
        let key = project + number

        key = key.toLocaleLowerCase().replace(/\s/g, '');
        keyStrings.push({ key, counter });
    }
    counter++

    // Filter just duplicates
    const duplicates = keyStrings.filter((key, index, self) =>
        index !== self.findIndex((t) => (
            t.key === key.key
        ))
    )

    for (var key in duplicates) {
        errors.push(new lineError("Duplicate key value.", duplicates[key].key, duplicates[key].counter))
    }
}

function getKeyColums(fieldMap) {

    let uniqueKeys = new Map()

    for (const item of fieldMap[Symbol.iterator]()) {

        let keyID = item[1].uniqueKeyID

        if (!keyID) {
            continue;
        }

        if (uniqueKeys.has(keyID)) {
            uniqueKeys.get(keyID).push(item[1].colIndex)
        } else {
            uniqueKeys.set(keyID, [item[1].colIndex])
        }
    }
    return uniqueKeys;

}

module.exports = {
    validateEquipment
}
