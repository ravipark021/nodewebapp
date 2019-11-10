var mongoose = require('mongoose');

var reportDetailsSchema = new mongoose.Schema({
    report_id: {
        type: String,
        required: true
    },
    report_details: [{
        reg_citation: {
            type: String
        },
        br_id: {
            type: String
        },
        rule_text: {
            type: String
        },
        business_requirement: {
            type: String
        },
        scope: {
            type: String
        },
        report_field_name: {
            type: String
        },
        format: {
            type: String
        },
        valid_values: {
            type: String
        },
        pde_name: {
            type: String
        },
        table_name: {
            type: String
        },
        transformation: {
            type: String
        },
        application_name: {
            type: String
        }
    }]
});

let ReportDetails = module.exports = mongoose.model('ReportDetails', reportDetailsSchema);