let project = /\b\d{4}\b/;
let notEmpty = /^.{1,255}$/;
let testCodes = /((^|[, ])[A-Za-z]{1,3}[0-9]{4})+$/;

const equipmentMap = new Map();

equipmentMap.set('Project', { colIndex: null, isRequired: true, validationString: project, uniqueKeyID: 1, maxLength: null })
equipmentMap.set('Item No.', { colIndex: null, isRequired: false, validationString: null, uniqueKeyID: null, maxLength: null })
equipmentMap.set('PLU', { colIndex: null, isRequired: true, validationString: notEmpty, uniqueKeyID: null, maxLength: 50 })
equipmentMap.set('Subsystem', { colIndex: null, isRequired: true, validationString: notEmpty, uniqueKeyID: null, maxLength: 50 })
equipmentMap.set('Parent Equipment Number', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: null, maxLength: 100})
equipmentMap.set('Equipment Number', { colIndex: null, isRequired: true, validationString: notEmpty, uniqueKeyID: 1, maxLength: 100 })
equipmentMap.set('Update To', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: 1, maxLength: 100 })
equipmentMap.set('Description', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: null, maxLength: 255 })
equipmentMap.set('Supplier', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: null, maxLength: 45 })
equipmentMap.set('Manufacturer', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: null, maxLength: 45 })
equipmentMap.set('Model Number', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: null, maxLength: 45 })
equipmentMap.set('Test Code', { colIndex: null, isRequired: false, validationString: testCodes, uniqueKeyID: null, maxLength: null })
equipmentMap.set('Comments', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: null, maxLength: 500 })
equipmentMap.set('Drawings', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: null, maxLength: null })
equipmentMap.set('Docnumber', { colIndex: null, isRequired: false, validationString: notEmpty, uniqueKeyID: null, maxLength: 255 })


module.exports = {
    equipmentMap
}