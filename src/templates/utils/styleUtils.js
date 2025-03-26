// Apply template styles to container
const applyTemplateStyles = (template) => {
  // 确保首先重置所有样式为默认值
  let styles = {
    position: 'relative',
    overflow: 'hidden',
    // 添加这些清除属性，确保不会保留上一个模板的样式
    boxShadow: 'none',
    backdropFilter: 'none',
    border: 'none',
    borderLeft: 'none',
    borderRight: 'none',
  };
  
  // 单独设置背景
  if (template.backgroundColor && template.backgroundColor.includes('linear-gradient')) {
    // 线性渐变背景直接设置为background
    styles.background = template.backgroundColor;
    
    // 如果有背景图，设置组合背景
    if (template.backgroundImage) {
      styles.background = `${template.backgroundColor}, url(${template.backgroundImage}) center/cover no-repeat`;
    }
  } else {
    // 普通颜色背景
    styles.backgroundColor = template.backgroundColor;
    
    // 如果有背景图，单独设置
    if (template.backgroundImage) {
      styles.backgroundImage = `url(${template.backgroundImage})`;
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
      styles.backgroundRepeat = 'no-repeat';
    }
  }
  
  // 设置文字颜色和字体
  styles.color = template.textColor;
  styles.fontFamily = template.contentFont;

  // 为所有深色背景添加更强的文字对比度
  if (template.backgroundColor && (
      (template.backgroundColor.includes('linear-gradient') && 
        (template.backgroundColor.includes('#0') || 
         template.backgroundColor.includes('#1') || 
         template.backgroundColor.includes('#2') || 
         template.backgroundColor.includes('#3') || 
         template.backgroundColor.includes('#4') || 
         template.backgroundColor.includes('#5') || 
         template.backgroundColor.includes('#6') || 
         template.backgroundColor.includes('#7') || 
         template.backgroundColor.includes('#8') || 
         template.backgroundColor.includes('#9'))) ||
      // 特定处理优雅格调模板
      template.id === 'elegant')) {
    // 这是深色背景，增强文字可见度
    styles = {
      ...styles,
      color: '#ffffff', // 统一使用白色文字
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)', // 添加文字阴影增强可见度
      fontWeight: '500', // 加粗字体
    };
  }

  // 后续的其他模板特定样式
  if (template.subtlePattern && !template.backgroundImage) {
    styles = {
      ...styles,
      backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.95) 100%), url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${template.accentColor.replace('#', '')}' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
    };
  }

  if (template.decorativeBorder) {
    styles = {
      ...styles,
      borderLeft: `5px double ${template.accentColor}`,
      borderRight: `5px double ${template.accentColor}`
    };
  }

  if (template.leafPattern && template.id === 'nature') {
    styles = {
      ...styles,
      backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 100%), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cpath fill='%23047857' fill-opacity='0.12' d='M20.9 6c-3.3 3.3-4.1 8-2.4 12.2-4.8-1.5-9.9.2-13.2 3.5-3.3 3.3-5 8.4-3.5 13.2-4.2-1.6-8.9-.9-12.2 2.4-4.4 4.4-4.4 11.5 0 15.9 4.4 4.4 11.5 4.4 15.9 0 3.3-3.3 4.1-8 2.4-12.2 4.8 1.5 9.9-.2 13.2-3.5 3.3-3.3 5-8.4 3.5-13.2 4.2 1.6 8.9.9 12.2-2.4 4.4-4.4 4.4-11.5 0-15.9-4.4-4.4-11.5-4.4-15.9 0zm45 40c-3.3 3.3-4.1 8-2.4 12.2-4.8-1.5-9.9.2-13.2 3.5-3.3 3.3-5 8.4-3.5 13.2-4.2-1.6-8.9-.9-12.2 2.4-4.4 4.4-4.4 11.5 0 15.9 4.4 4.4 11.5 4.4 15.9 0 3.3-3.3 4.1-8 2.4-12.2 4.8 1.5 9.9-.2 13.2-3.5 3.3-3.3 5-8.4 3.5-13.2 4.2 1.6 8.9.9 12.2-2.4 4.4-4.4 4.4-11.5 0-15.9-4.4-4.4-11.5-4.4-15.9 0zm70 65c-3.3 3.3-4.1 8-2.4 12.2-4.8-1.5-9.9.2-13.2 3.5-3.3 3.3-5 8.4-3.5 13.2-4.2-1.6-8.9-.9-12.2 2.4-4.4 4.4-4.4 11.5 0 15.9 4.4 4.4 11.5 4.4 15.9 0 3.3-3.3 4.1-8 2.4-12.2 4.8 1.5 9.9-.2 13.2-3.5 3.3-3.3 5-8.4 3.5-13.2 4.2 1.6 8.9.9 12.2-2.4 4.4-4.4 4.4-11.5 0-15.9-4.4-4.4-11.5-4.4-15.9 0zm-80 35c-3.3 3.3-4.1 8-2.4 12.2-4.8-1.5-9.9.2-13.2 3.5-4.4 4.4-4.4 11.5 0 15.9 4.4 4.4 11.5 4.4 15.9 0 3.3-3.3 4.1-8 2.4-12.2 4.8 1.5 9.9-.2 13.2-3.5 4.4-4.4 4.4-11.5 0-15.9-4.4-4.4-11.5-4.4-15.9 0zm80-110c-3.3 3.3-4.1 8-2.4 12.2-4.8-1.5-9.9.2-13.2 3.5-4.4 4.4-4.4 11.5 0 15.9 4.4 4.4 11.5 4.4 15.9 0 3.3-3.3 4.1-8 2.4-12.2 4.8 1.5 9.9-.2 13.2-3.5 4.4-4.4 4.4-11.5 0-15.9-4.4-4.4-11.5-4.4-15.9 0z'/%3E%3C/svg%3E")`
    };
  }
  
  if (template.flowerPattern && template.id === 'nature') {
    styles = {
      ...styles,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        right: '0',
        width: '100%',
        height: '100%',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23047857' fill-opacity='0.08'%3E%3Cpath d='M20 20c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm40-5c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5zm2 0c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7zm-27 40c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0 2c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm5-37c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0 2c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm-5 12c2.8 0 5-2.2 5-5s-2.2-5-5-5-5 2.2-5 5 2.2 5 5 5zm0 2c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm-20-5c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zm-2 0c0 3.9 3.1 7 7 7s7-3.1 7-7-3.1-7-7-7-7 3.1-7 7zm60 13c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5zm2 0c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7zm-5-28c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-2c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-40 0c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm20 20c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm20 20c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-40 0c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3z'/%3E%3C/g%3E%3C/svg%3E\")",
        zIndex: 0,
        opacity: 0.7
      }
    };
  }

  if (template.goldAccents && template.id === 'classic') {
    styles = {
      ...styles,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '100px',
        height: '100px',
        background: `radial-gradient(circle, ${template.accentColor}40 0%, transparent 70%)`,
        zIndex: 0
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        width: '70px',
        height: '70px',
        background: `radial-gradient(circle, ${template.accentColor}30 0%, transparent 70%)`,
        zIndex: 0
      }
    };
  }
  
  if (template.glassEffect && template.id === 'classic') {
    styles = {
      ...styles,
      backdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    };
  }

  // Add more template-specific styles here...

  return styles;
};

// Apply styles to the title section
const applyTemplateTitleStyles = (template) => {
  let styles = {
    color: template.textColor,
    fontFamily: template.titleFont,
    textAlign: 'center',
    padding: '20px 15px',
    position: 'relative',
    marginBottom: '10px'
  };
  
  // 为深色背景的模板增强标题可见度
  if (template.backgroundColor && template.backgroundColor.includes('linear-gradient') && 
      (template.backgroundColor.includes('#0') || 
       template.backgroundColor.includes('#1') || 
       template.backgroundColor.includes('#2') || 
       template.backgroundColor.includes('#3') || 
       template.backgroundColor.includes('#4') || 
       template.backgroundColor.includes('#5') || 
       template.backgroundColor.includes('#6') || 
       template.backgroundColor.includes('#7') || 
       template.backgroundColor.includes('#8') || 
       template.backgroundColor.includes('#9'))) {
    // 深色背景模板的标题强化
    styles = {
      ...styles,
      color: '#ffffff', // 统一使用白色文字
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)', // 更强的阴影
      fontWeight: '600', // 更粗的字体
    };
  }
  
  if (template.titleBorder) {
    styles = {
      ...styles,
      borderBottom: `2px solid ${template.accentColor}80`,
    };
  }
  
  if (template.titleGlow) {
    styles = {
      ...styles,
      textShadow: `0 0 10px ${template.accentColor}80`
    };
  }
  
  // Add more template-specific title styles here...
  
  return styles;
};

// Apply styles to news items
const applyTemplateNewsItemStyles = (template, index) => {
  let styles = {
    marginBottom: '15px',
    position: 'relative',
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease'
  };
  
  // 深色背景模板的新闻项目样式调整
  if (template.backgroundColor && template.backgroundColor.includes('linear-gradient') && 
      (template.backgroundColor.includes('#0') || 
       template.backgroundColor.includes('#1') || 
       template.backgroundColor.includes('#2') || 
       template.backgroundColor.includes('#3') || 
       template.backgroundColor.includes('#4') || 
       template.backgroundColor.includes('#5') || 
       template.backgroundColor.includes('#6') || 
       template.backgroundColor.includes('#7') || 
       template.backgroundColor.includes('#8') || 
       template.backgroundColor.includes('#9'))) {
    // 深色背景下新闻项的容器样式
    styles = {
      ...styles,
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // 半透明白色背景
      backdropFilter: 'blur(2px)', // 轻微模糊效果
      borderRadius: '8px', // 圆角
      padding: '15px', // 内边距
    };
  }
  
  if (template.newsItemStyle === 'bordered') {
    styles = {
      ...styles,
      border: `1px solid ${template.accentColor}40`,
      borderRadius: '8px',
      padding: '12px 15px'
    };
  } else if (template.newsItemStyle === 'separated') {
    styles = {
      ...styles,
      padding: '12px 15px',
      marginBottom: '20px',
      borderBottom: `1px solid ${template.accentColor}30`
    };
  }
  
  // Add more template-specific news item styles here...
  
  return styles;
};

// Apply styles to news titles
const applyTemplateNewsTitleStyles = (template) => {
  let styles = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: template.textColor,
    fontFamily: template.titleFont,
    position: 'relative'
  };
  
  // 深色背景下的新闻标题增强
  if (template.backgroundColor && template.backgroundColor.includes('linear-gradient') && 
      (template.backgroundColor.includes('#0') || 
       template.backgroundColor.includes('#1') || 
       template.backgroundColor.includes('#2') || 
       template.backgroundColor.includes('#3') || 
       template.backgroundColor.includes('#4') || 
       template.backgroundColor.includes('#5') || 
       template.backgroundColor.includes('#6') || 
       template.backgroundColor.includes('#7') || 
       template.backgroundColor.includes('#8') || 
       template.backgroundColor.includes('#9'))) {
    // 深色背景模板的新闻标题强化
    styles = {
      ...styles,
      color: '#ffffff', // 统一使用白色文字 
      fontSize: '17px', // 稍微增大字号
      fontWeight: '600', // 加粗
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)', // 文字阴影
    };
  }
  
  if (template.titleHighlight) {
    styles = {
      ...styles,
      position: 'relative',
      display: 'inline-block',
      zIndex: 1,
      '&::before': {
        content: '""',
        position: 'absolute',
        bottom: '2px',
        left: '0',
        height: '8px',
        width: '100%',
        background: `${template.accentColor}30`,
        zIndex: -1,
        transition: 'height 0.3s ease'
      }
    };
  }
  
  // Add more template-specific news title styles here...
  
  return styles;
};

// Apply styles to news content
const applyTemplateNewsContentStyles = (template) => {
  let styles = {
    fontSize: '14px',
    lineHeight: '1.5',
    color: template.textColor,
    fontFamily: template.contentFont
  };
  
  // 深色背景下的内容文字增强
  if (template.backgroundColor && template.backgroundColor.includes('linear-gradient') && 
      (template.backgroundColor.includes('#0') || 
       template.backgroundColor.includes('#1') || 
       template.backgroundColor.includes('#2') || 
       template.backgroundColor.includes('#3') || 
       template.backgroundColor.includes('#4') || 
       template.backgroundColor.includes('#5') || 
       template.backgroundColor.includes('#6') || 
       template.backgroundColor.includes('#7') || 
       template.backgroundColor.includes('#8') || 
       template.backgroundColor.includes('#9'))) {
    // 深色背景模板的内容强化
    styles = {
      ...styles,
      color: '#ffffff', // 统一使用白色文字
      fontSize: '14.5px', // 稍微增大字号
      lineHeight: '1.6', // 增加行高
      fontWeight: '400', // 适当加粗
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)', // 文字阴影
    };
  }
  
  if (template.improvedContrast) {
    styles = {
      ...styles,
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
    };
  }
  
  // Add more template-specific news content styles here...
  
  return styles;
};

module.exports = {
  applyTemplateStyles,
  applyTemplateTitleStyles,
  applyTemplateNewsItemStyles,
  applyTemplateNewsTitleStyles,
  applyTemplateNewsContentStyles
}; 