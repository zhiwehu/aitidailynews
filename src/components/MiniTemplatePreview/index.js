import React from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
  width: 100%;
  aspect-ratio: 9 / 16;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  
  /* 应用背景色和背景图片 */
  background-color: ${props => props.$backgroundColor || '#000000'};
  background-image: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  
  /* 对于渐变背景 */
  background: ${props => props.$gradient || props.$backgroundColor || '#000000'};
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
`;

// 添加网格线背景图案 (科技极客模板)
const GridLinesPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill='%2306b6d4' fill-opacity='0.3' d='M0 0h100v1H0zM0 20h100v1H0zM0 40h100v1H0zM0 60h100v1H0zM0 80h100v1H0zM1 0v100h1V0zM21 0v100h1V0zM41 0v100h1V0zM61 0v100h1V0zM81 0v100h1V0z'/%3E%3C/svg%3E");
  background-size: 60px 60px;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
`;

// 添加点状图案 (现代简约模板)
const DotsPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2306b6d4' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 20px 20px;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
`;

// 添加光晕效果 (未来科幻模板)
const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15), transparent 70%);
  opacity: 0.8;
  pointer-events: none;
  z-index: 1;
`;

// 添加装饰图案 (优雅格调模板)
const ElegantPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23c4b5fd' fill-opacity='0.2' d='M0 0h20v20H0zm40 40h20v20H40zm60 60h20v20h-20zM20 20h20v20H20zm40 40h20v20H60zM80 0h20v20H80zm-20 80h20v20H60zM20 60h20v20H20zm-20 0h20v20H0z'/%3E%3C/svg%3E");
  background-size: 50px 50px;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.5;
  pointer-events: none;
  z-index: 1;
`;

// Logo占位符
const LogoPlaceholder = styled.div`
  align-self: ${props => props.$position === 'top-center' ? 'center' : 'flex-start'};
  width: 15px;
  height: 5px;
  background-color: ${props => props.$color || '#888'};
  border-radius: 1px;
  margin-bottom: 4px;
  z-index: 2;
`;

// 标题占位符
const TitlePlaceholder = styled.div`
  width: 60%;
  height: 5px;
  background-color: ${props => props.$color || '#fff'};
  border-radius: 1px;
  margin: 6px 0 4px;
  z-index: 2;
`;

// 新闻项目占位符
const NewsItemPlaceholder = styled.div`
  width: 90%;
  height: 14px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  margin-bottom: 4px;
  padding: 2px 4px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  
  /* 根据模板样式添加特定边框 */
  border-left: ${props => props.$borderLeft ? `1px solid ${props.$accentColor}` : 'none'};
  border-top: ${props => props.$borderTop ? `1px solid ${props.$accentColor}` : 'none'};
  box-shadow: ${props => props.$shadow ? '0 1px 3px rgba(0,0,0,0.15)' : 'none'};
`;

// 新闻标题占位符
const NewsTitlePlaceholder = styled.div`
  width: 50%;
  height: 2px;
  background-color: ${props => props.$color || '#fff'};
  border-radius: 1px;
  margin-bottom: 2px;
`;

// 新闻内容占位符
const NewsContentPlaceholder = styled.div`
  width: 80%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1px;
  margin-top: 2px;
`;

// 二维码占位符
const QrPlaceholder = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.$color || '#fff'};
  border-radius: 1px;
  margin-top: auto;
  z-index: 2;
`;

const MiniTemplatePreview = ({ templateData }) => {
  // 根据模板ID确定应该使用哪种背景
  const getTemplateBackground = () => {
    switch (templateData.id) {
      case 'techGeek':
        return 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #1a365d 100%)';
      case 'modern':
        return 'linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%)';
      case 'futuristic':
        return 'linear-gradient(135deg, #0f0720 0%, #1e0942 50%, #3b0764 100%)';
      case 'elegant':
        return 'linear-gradient(to right, #1e1b4b 0%, #312e81 100%)';
      case 'classic':
        return 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1e40af 100%)';
      default:
        return templateData.backgroundColor;
    }
  };

  // 获取动态的背景图案组件
  const getBackgroundPattern = () => {
    switch (templateData.id) {
      case 'techGeek':
        return <GridLinesPattern />;
      case 'modern':
        return <DotsPattern />;
      case 'futuristic':
        return <GlowEffect />;
      case 'elegant':
        return <ElegantPattern />;
      default:
        return null;
    }
  };

  // 确定新闻项的样式
  const getNewsItemStyle = () => {
    const showShadow = templateData.newsItemStyle?.boxShadow;
    const showBorderLeft = templateData.newsItemStyle?.borderLeft;
    const showBorderTop = templateData.newsItemStyle?.borderTop;
    
    return {
      shadow: showShadow,
      borderLeft: showBorderLeft,
      borderTop: showBorderTop
    };
  };

  const newsItemStyle = getNewsItemStyle();
  const background = getTemplateBackground();
  const backgroundPattern = getBackgroundPattern();

  return (
    <PreviewContainer
      $backgroundColor={templateData.backgroundColor}
      $backgroundImage={templateData.backgroundImage}
      $gradient={background}
    >
      {backgroundPattern}
      
      <LogoPlaceholder 
        $position={templateData.logoPosition}
        $color={templateData.accentColor}
      />
      
      <TitlePlaceholder $color={
        templateData.id === 'classic' ? templateData.accentColor : 
        templateData.id === 'dark' ? templateData.accentColor : '#fff'
      } />
      
      {/* 只显示2个新闻项目，保持预览简洁 */}
      {[1, 2].map(i => (
        <NewsItemPlaceholder 
          key={i}
          $accentColor={templateData.accentColor}
          $borderLeft={newsItemStyle.borderLeft}
          $borderTop={newsItemStyle.borderTop && i === 1}
          $shadow={newsItemStyle.shadow}
        >
          <NewsTitlePlaceholder $color={
            templateData.id === 'classic' ? templateData.accentColor : 
            templateData.id === 'modern' ? templateData.accentColor : 
            templateData.id === 'dark' ? templateData.accentColor : '#fff'
          } />
          <NewsContentPlaceholder />
        </NewsItemPlaceholder>
      ))}
      
      <QrPlaceholder $color={templateData.accentColor} />
    </PreviewContainer>
  );
};

export default MiniTemplatePreview; 