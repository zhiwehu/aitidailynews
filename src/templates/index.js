// Import utilities and data
const { globalAnimations } = require('./utils/animations');
const {
  applyTemplateStyles,
  applyTemplateTitleStyles,
  applyTemplateNewsItemStyles,
  applyTemplateNewsTitleStyles,
  applyTemplateNewsContentStyles
} = require('./utils/styleUtils');
const { getTemplateById } = require('./utils/templateUtils');
const { templateList } = require('./data');

// Export everything
module.exports = {
  globalAnimations,
  applyTemplateStyles,
  applyTemplateTitleStyles,
  applyTemplateNewsItemStyles,
  applyTemplateNewsTitleStyles,
  applyTemplateNewsContentStyles,
  getTemplateById,
  templateList
};
