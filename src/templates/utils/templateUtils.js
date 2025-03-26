// Template utilities
const { templateList } = require('../data');

// Get template by ID
const getTemplateById = (id) => {
  return templateList.find(template => template.id === id) || templateList[0];
};

module.exports = {
  getTemplateById
}; 