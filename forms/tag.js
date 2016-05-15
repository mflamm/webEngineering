var forms = require('../node_modules/forms');
var fields = forms.fields;
var validators = forms.validators;

var reg_form = forms.create({
    lat: fields.string({ required: true, label: 'Latitude' }),
    long: fields.string({ required: true, label: 'Longditude' }),
    name: fields.string({ required: true, label: 'Name' }),
    hash: fields.string({ required: true, label: 'Hash' })
});