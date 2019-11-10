var mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  description: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  regulatory_citation: {
    type: String,
    required: true
  },
  regulatory_agency: {
    type: String,
    required: true
  },
  entity_scope: {
    type: String,
    required: true
  },
  event_scope: {
    type: String,
    required: true
  },
  product_scope: {
    type: String,
    required: true
  },
  report_template: {
    type: String,
    required: true
  },
  report_frequency: {
    type: String,
    required: true
  }
});

let Report = module.exports = mongoose.model('Report', reportSchema);