import html2canvas from 'html2canvas';
import React, { useRef, useState } from 'react';
import { templateList } from '../templates';
import FormSection from './FormSection';
import PreviewSection from './PreviewSection';
import { Content } from './styles/CommonStyles';

const defaultNews = [
  { title: "重要新闻一", content: "这是重要新闻一的详细内容，可以有更多的描述..." },
  { title: "重要新闻二", content: "这是重要新闻二的详细内容，可以有更多的描述..." },
  { title: "重要新闻三", content: "这是重要新闻三的详细内容，可以有更多的描述..." },
  { title: "重要新闻四", content: "这是重要新闻四的详细内容，可以有更多的描述..." },
  { title: "重要新闻五", content: "这是重要新闻五的详细内容，可以有更多的描述..." }
];

const PosterGenerator = () => {
  const [logo, setLogo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [title, setTitle] = useState('每日要闻');
  const [newsItems, setNewsItems] = useState(defaultNews);
  const [newsJson, setNewsJson] = useState(JSON.stringify(defaultNews, null, 2));
  const [templateId, setTemplateId] = useState('classic');
  const [generating, setGenerating] = useState(false);
  const posterRef = useRef(null);

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQRCodeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrCode(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewsJsonChange = (e) => {
    setNewsJson(e.target.value);
    try {
      const parsedNews = JSON.parse(e.target.value);
      setNewsItems(parsedNews);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  const handleTemplateSelect = (id) => {
    setTemplateId(id);
  };

  const generatePoster = async () => {
    if (posterRef.current) {
      try {
        // Show loading state
        setGenerating(true);
        
        // 先将所有伪元素样式应用到真实DOM上，以确保图片生成包含这些效果
        const applyPseudoElementStyles = (element) => {
          const allElements = element.querySelectorAll('*');
          
          // 首先移除所有poster-title的边框，避免重复线条
          const titleElements = element.querySelectorAll('.poster-title');
          titleElements.forEach(titleEl => {
            titleEl.style.borderBottom = 'none';
          });
          
          allElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const beforeStyles = window.getComputedStyle(el, '::before');
            const afterStyles = window.getComputedStyle(el, '::after');
            
            // 处理背景渲染一致性问题
            if (style.backgroundImage && style.backgroundImage.includes('data:image/svg+xml')) {
              // 添加一个重叠层确保SVG被正确渲染
              const bgDiv = document.createElement('div');
              bgDiv.style.position = 'absolute';
              bgDiv.style.inset = '0';
              bgDiv.style.backgroundImage = style.backgroundImage;
              bgDiv.style.backgroundSize = style.backgroundSize || 'auto';
              bgDiv.style.backgroundPosition = style.backgroundPosition || 'center';
              bgDiv.style.backgroundRepeat = style.backgroundRepeat || 'repeat';
              bgDiv.style.zIndex = '0';
              bgDiv.className = 'bg-reinforcement';
              el.insertBefore(bgDiv, el.firstChild);
            }
            
            // 特殊处理标题的渐变背景
            if (el.classList.contains('gradient-text')) {
              // 保存原有的背景渐变
              const originalBackground = style.background;
              const originalBackgroundImage = style.backgroundImage;
              
              // 创建一个实际渲染渐变的背景层
              if (originalBackground.includes('gradient') || (originalBackgroundImage && originalBackgroundImage.includes('gradient'))) {
                const gradientOverlay = document.createElement('div');
                gradientOverlay.style.position = 'absolute';
                gradientOverlay.style.inset = '0';
                gradientOverlay.style.background = originalBackground;
                gradientOverlay.style.backgroundImage = originalBackgroundImage;
                gradientOverlay.style.zIndex = '-1';
                gradientOverlay.className = 'gradient-overlay';
                
                // 调整元素以确保正确显示
                el.style.position = 'relative';
                el.style.color = 'transparent';
                el.style.zIndex = '1';
                el.appendChild(gradientOverlay);
              }
            }
            
            // 检查伪元素是否有内容
            if (beforeStyles.content !== 'none' && beforeStyles.content !== '') {
              const beforeEl = document.createElement('div');
              beforeEl.style.position = 'absolute';
              beforeEl.style.top = beforeStyles.top || '0';
              beforeEl.style.left = beforeStyles.left || '0';
              beforeEl.style.width = beforeStyles.width || '100%';
              beforeEl.style.height = beforeStyles.height || '100%';
              beforeEl.style.zIndex = '0';
              beforeEl.style.background = beforeStyles.background || 'none';
              beforeEl.style.backgroundImage = beforeStyles.backgroundImage || 'none';
              beforeEl.style.backgroundSize = beforeStyles.backgroundSize || 'auto';
              beforeEl.style.backgroundPosition = beforeStyles.backgroundPosition || 'center';
              beforeEl.style.backgroundRepeat = beforeStyles.backgroundRepeat || 'repeat';
              beforeEl.style.borderRadius = beforeStyles.borderRadius || '0';
              beforeEl.style.boxShadow = beforeStyles.boxShadow || 'none';
              beforeEl.style.opacity = beforeStyles.opacity || '1';
              beforeEl.className = 'pseudo-before';
              el.appendChild(beforeEl);
            }
            
            if (afterStyles.content !== 'none' && afterStyles.content !== '') {
              const afterEl = document.createElement('div');
              afterEl.style.position = 'absolute';
              afterEl.style.top = afterStyles.top || '0';
              afterEl.style.left = afterStyles.left || '0';
              afterEl.style.width = afterStyles.width || '100%';
              afterEl.style.height = afterStyles.height || '100%';
              afterEl.style.zIndex = '0';
              afterEl.style.background = afterStyles.background || 'none';
              afterEl.style.backgroundImage = afterStyles.backgroundImage || 'none';
              afterEl.style.backgroundSize = afterStyles.backgroundSize || 'auto';
              afterEl.style.backgroundPosition = afterStyles.backgroundPosition || 'center';
              afterEl.style.backgroundRepeat = afterStyles.backgroundRepeat || 'repeat';
              afterEl.style.borderRadius = afterStyles.borderRadius || '0';
              afterEl.style.boxShadow = afterStyles.boxShadow || 'none';
              afterEl.style.opacity = afterStyles.opacity || '1';
              afterEl.className = 'pseudo-after';
              el.appendChild(afterEl);
            }
          });
        };
        
        // 确保所有图像都已加载完成
        const waitForImagesLoaded = async (element) => {
          const images = element.querySelectorAll('img');
          const promises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
              img.onload = resolve;
              img.onerror = resolve; // 即使错误也继续
            });
          });
          
          return Promise.all(promises);
        };
        
        // 处理SVG背景图像加载
        const waitForSvgBackgrounds = async (element) => {
          // 获取当前模板
          const template = templateList.find(t => t.id === templateId);
          if (template && template.backgroundImage) {
            return new Promise(resolve => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve;
              img.src = template.backgroundImage;
            });
          }
          return Promise.resolve();
        };
        
        // 等待所有样式和SVG加载完成
        await Promise.all([
          waitForImagesLoaded(posterRef.current),
          waitForSvgBackgrounds(posterRef.current)
        ]);
        
        // 在导出前临时添加样式类
        posterRef.current.classList.add('export-mode');
        
        const canvas = await html2canvas(posterRef.current, {
          scale: 3, // 使用更高的比例获得清晰图像
          useCORS: true, // 使用CORS以正确获取远程图片
          allowTaint: true,
          backgroundColor: null, // 使用透明背景，让模板的背景可以显示
          logging: true,
          height: posterRef.current.offsetHeight,
          windowHeight: posterRef.current.offsetHeight,
          imageTimeout: 0,         // 不设置图片超时
          ignoreElements: (el) => el.classList.contains('ignore-export'),
          onclone: async (document, element) => {
            // 确保克隆元素有正确的高度和位置
            element.style.height = `${posterRef.current.offsetHeight}px`;
            element.style.position = 'relative';
            element.style.transform = 'none';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            
            // 特别处理渐变背景，确保导出时正确渲染
            const currentTemplate = templateList.find(t => t.id === templateId);
            
            // 特别处理优雅格调模板
            if (currentTemplate && currentTemplate.id === 'elegant') {
              // 手动创建背景元素
              const bgLayer = document.createElement('div');
              bgLayer.style.position = 'absolute';
              bgLayer.style.inset = '0';
              bgLayer.style.background = 'linear-gradient(to right, #1e1b4b 0%, #312e81 100%)';
              bgLayer.style.zIndex = '-1';
              
              // 创建图案层
              const patternLayer = document.createElement('div');
              patternLayer.style.position = 'absolute';
              patternLayer.style.inset = '0';
              patternLayer.style.backgroundImage = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23c4b5fd' fill-opacity='0.2' d='M0 0h20v20H0zm40 40h20v20H40zm60 60h20v20h-20zM20 20h20v20H20zm40 40h20v20H60zM80 0h20v20H80zm-20 80h20v20H60zM20 60h20v20H20zm-20 0h20v20H0z'/%3E%3C/svg%3E")`;
              patternLayer.style.backgroundSize = '100px 100px';
              patternLayer.style.backgroundRepeat = 'repeat';
              patternLayer.style.opacity = '0.7';
              patternLayer.style.zIndex = '-1';
              
              // 创建边框装饰
              const borderLayer = document.createElement('div');
              borderLayer.style.position = 'absolute';
              borderLayer.style.top = '10px';
              borderLayer.style.left = '10px';
              borderLayer.style.right = '10px';
              borderLayer.style.bottom = '10px';
              borderLayer.style.border = '1px solid rgba(196, 181, 253, 0.3)';
              borderLayer.style.zIndex = '-1';
              
              // 添加所有层到元素
              element.insertBefore(borderLayer, element.firstChild);
              element.insertBefore(patternLayer, element.firstChild);
              element.insertBefore(bgLayer, element.firstChild);
            } else if (currentTemplate && currentTemplate.backgroundColor && 
                currentTemplate.backgroundColor.includes('linear-gradient')) {
              // 为模板容器添加正确的渐变背景
              element.style.background = currentTemplate.backgroundColor;
              
              // 如果有背景图，设置组合背景
              if (currentTemplate.backgroundImage) {
                element.style.background = `${currentTemplate.backgroundColor}, url(${currentTemplate.backgroundImage}) center/cover no-repeat`;
              }
            }
            
            // 特别增强所有文本元素的可见度
            const allTextElements = element.querySelectorAll('.poster-title, .news-title, .news-content');
            
            // 获取所有新闻项目元素，确保在使用它之前定义
            const newsItems = element.querySelectorAll('.news-item');
            
            // 根据模板类型应用不同的文本样式
            if (currentTemplate && currentTemplate.id === 'dark') {
              // 暗黑科技模板使用绿色文字
              allTextElements.forEach(textEl => {
                textEl.style.color = '#10b981'; // 绿色文字
                textEl.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.5)'; // 绿色辉光
                textEl.style.fontWeight = textEl.classList.contains('poster-title') ? '700' : 
                                         textEl.classList.contains('news-title') ? '600' : '500'; // 加粗文字
              });
            } else if (currentTemplate && currentTemplate.id === 'techGeek') {
              // 科技极客模板样式处理
              // 特别处理文本颜色和样式
              allTextElements.forEach(textEl => {
                if (textEl.classList.contains('poster-title')) {
                  textEl.style.color = '#ffffff'; // 白色标题
                  textEl.style.textShadow = '0 0 15px rgba(6, 182, 212, 0.7)'; // 青色辉光
                  textEl.style.borderBottom = '2px solid rgba(6, 182, 212, 0.6)'; // 青色底边
                  textEl.style.paddingBottom = '10px';
                  textEl.style.fontWeight = '700';
                } else if (textEl.classList.contains('news-title')) {
                  textEl.style.color = '#06b6d4'; // 青色新闻标题
                  textEl.style.textShadow = '0 0 8px rgba(6, 182, 212, 0.5)'; // 青色辉光
                  textEl.style.fontWeight = '600';
                } else {
                  textEl.style.color = '#ffffff'; // 白色内容
                  textEl.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.8)'; // 增强阴影
                  textEl.style.fontWeight = '400';
                }
              });
            } else if (currentTemplate && currentTemplate.id === 'futuristic') {
              // 未来科幻模板样式处理
              allTextElements.forEach(textEl => {
                if (textEl.classList.contains('poster-title')) {
                  textEl.style.color = '#ffffff'; // 白色标题
                  textEl.style.textShadow = '0 0 15px rgba(168, 85, 247, 0.7)'; // 紫色辉光
                  textEl.style.borderBottom = '2px solid rgba(168, 85, 247, 0.6)'; // 紫色底边
                  textEl.style.paddingBottom = '10px';
                  textEl.style.fontWeight = '700';
                } else if (textEl.classList.contains('news-title')) {
                  textEl.style.color = '#a855f7'; // 紫色新闻标题
                  textEl.style.textShadow = '0 0 8px rgba(168, 85, 247, 0.5)'; // 紫色辉光
                  textEl.style.fontWeight = '600';
                } else {
                  textEl.style.color = '#ffffff'; // 白色内容
                  textEl.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.8)'; // 增强阴影
                  textEl.style.fontWeight = '400';
                }
              });
            } else if (currentTemplate && currentTemplate.id === 'modern') {
              // 现代简约模板样式
              newsItems.forEach(item => {
                item.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                item.style.backdropFilter = 'blur(3px)';
                item.style.borderRadius = '8px';
                item.style.padding = '12px';
                item.style.border = '1px solid rgba(6, 182, 212, 0.3)';
                item.style.boxShadow = '0 0 10px rgba(6, 182, 212, 0.15)';
                item.style.position = 'relative';
                
                // 添加顶部渐变线条
                const gradientLine = document.createElement('div');
                gradientLine.style.position = 'absolute';
                gradientLine.style.top = '0';
                gradientLine.style.left = '0';
                gradientLine.style.width = '100%';
                gradientLine.style.height = '3px';
                gradientLine.style.background = 'linear-gradient(90deg, transparent, #06b6d4, transparent)';
                gradientLine.style.opacity = '0.7';
                gradientLine.style.pointerEvents = 'none';
                
                // 确保在内容前面插入
                if (item.firstChild) {
                  item.insertBefore(gradientLine, item.firstChild);
                } else {
                  item.appendChild(gradientLine);
                }
              });
              
              // 为现代简约模板专门调整文本样式
              allTextElements.forEach(textEl => {
                if (textEl.classList.contains('poster-title')) {
                  textEl.style.color = '#ffffff';
                  textEl.style.textShadow = '0 0 10px rgba(6, 182, 212, 0.5)';
                  textEl.style.borderBottom = '2px solid rgba(6, 182, 212, 0.4)';
                  textEl.style.paddingBottom = '8px';
                  textEl.style.fontWeight = '600';
                } else if (textEl.classList.contains('news-title')) {
                  textEl.style.color = '#06b6d4';
                  textEl.style.textShadow = '0 0 5px rgba(6, 182, 212, 0.4)';
                  textEl.style.fontWeight = '600';
                } else if (textEl.classList.contains('news-content')) {
                  textEl.style.color = '#e2e8f0';
                  textEl.style.textShadow = '0 1px 1px rgba(0, 0, 0, 0.6)';
                }
              });
            } else {
              // 其他模板使用白色文字
              allTextElements.forEach(textEl => {
                textEl.style.color = '#ffffff'; // 确保文字是白色
                textEl.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.9)'; // 增强文字阴影
                textEl.style.fontWeight = textEl.classList.contains('poster-title') ? '700' : 
                                         textEl.classList.contains('news-title') ? '600' : '500'; // 加粗文字
              });
            }
            
            // 特别处理新闻项目在黑色背景上的显示
            if (currentTemplate && currentTemplate.id === 'dark') {
              // 暗黑科技模板使用绿色边框和阴影
              newsItems.forEach(item => {
                item.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // 更深的背景色
                item.style.backdropFilter = 'blur(3px)';
                item.style.borderRadius = '8px';
                item.style.padding = '12px';
                item.style.border = '1px solid rgba(16, 185, 129, 0.4)'; // 半透明绿色边框
                item.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.3)'; // 绿色阴影效果
              });
            } else if (currentTemplate && currentTemplate.id === 'techGeek') {
              // 科技极客模板专属样式
              newsItems.forEach(item => {
                item.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                item.style.backdropFilter = 'blur(2px)';
                item.style.borderRadius = '8px';
                item.style.padding = '12px';
                item.style.border = '1px solid rgba(6, 182, 212, 0.5)'; // 青色边框
                item.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.3)'; // 青色阴影
              });
            } else if (currentTemplate && currentTemplate.id === 'futuristic') {
              // 未来科幻模板专属样式
              newsItems.forEach(item => {
                item.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                item.style.backdropFilter = 'blur(2px)';
                item.style.borderRadius = '8px';
                item.style.padding = '12px';
                item.style.border = '1px solid rgba(168, 85, 247, 0.5)'; // 紫色边框
                item.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.3)'; // 紫色阴影
                
                // 创建全息效果层
                const holoEffect = document.createElement('div');
                holoEffect.style.position = 'absolute';
                holoEffect.style.top = '0';
                holoEffect.style.left = '0';
                holoEffect.style.width = '100%';
                holoEffect.style.height = '100%';
                holoEffect.style.background = 'linear-gradient(45deg, rgba(168, 85, 247, 0) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(168, 85, 247, 0) 100%)';
                holoEffect.style.pointerEvents = 'none';
                holoEffect.style.zIndex = '1';
                
                // 确保在内容前面插入
                if (item.firstChild) {
                  item.insertBefore(holoEffect, item.firstChild);
                } else {
                  item.appendChild(holoEffect);
                }
              });
            } else if (currentTemplate && currentTemplate.id === 'modern') {
              // 现代简约模板样式
              newsItems.forEach(item => {
                item.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                item.style.backdropFilter = 'blur(3px)';
                item.style.borderRadius = '8px';
                item.style.padding = '12px';
                item.style.border = '1px solid rgba(6, 182, 212, 0.3)';
                item.style.boxShadow = '0 0 10px rgba(6, 182, 212, 0.15)';
                item.style.position = 'relative';
                
                // 添加顶部渐变线条
                const gradientLine = document.createElement('div');
                gradientLine.style.position = 'absolute';
                gradientLine.style.top = '0';
                gradientLine.style.left = '0';
                gradientLine.style.width = '100%';
                gradientLine.style.height = '3px';
                gradientLine.style.background = 'linear-gradient(90deg, transparent, #06b6d4, transparent)';
                gradientLine.style.opacity = '0.7';
                gradientLine.style.pointerEvents = 'none';
                
                // 确保在内容前面插入
                if (item.firstChild) {
                  item.insertBefore(gradientLine, item.firstChild);
                } else {
                  item.appendChild(gradientLine);
                }
              });
            }
            
            // 将伪元素的样式转换为真实DOM元素
            applyPseudoElementStyles(element);
            
            // 等待添加的DOM元素渲染完成
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // 先隐藏项目中可能干扰渲染的元素
            const pageElements = document.querySelectorAll('body > *:not(#poster-container-clone)');
            pageElements.forEach(el => {
              if (el !== element && !element.contains(el)) {
                el.style.display = 'none';
              }
            });
            
            // 调整渐变标题元素确保正确渲染
            const gradientTitles = element.querySelectorAll('.gradient-text');
            gradientTitles.forEach(title => {
              // 确保渐变标题正确渲染
              if (title.style.backgroundImage || title.style.background) {
                if (!title.querySelector('.gradient-overlay')) {
                  const style = window.getComputedStyle(title);
                  const gradientOverlay = document.createElement('div');
                  gradientOverlay.style.position = 'absolute';
                  gradientOverlay.style.inset = '0';
                  gradientOverlay.style.background = style.background;
                  gradientOverlay.style.backgroundImage = style.backgroundImage;
                  gradientOverlay.style.zIndex = '-1';
                  gradientOverlay.className = 'gradient-overlay';
                  
                  title.style.position = 'relative';
                  title.style.color = 'transparent';
                  title.style.zIndex = '1';
                  title.appendChild(gradientOverlay);
                }
              }
            });
            
            // 添加克隆后的元素到body以确保完整渲染
            const container = document.createElement('div');
            container.id = 'poster-container-clone';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100%';
            container.style.height = '100%';
            container.style.zIndex = '9999';
            // 使用模板的背景色，而不是强制设为白色
            if (currentTemplate) {
              // 应用模板背景色
              if (currentTemplate.id === 'elegant') {
                // 优雅格调模板使用特定的渐变背景
                container.style.background = 'linear-gradient(to right, #1e1b4b 0%, #312e81 100%)';
              } else if (currentTemplate.id === 'futuristic') {
                // 未来科幻模板使用深紫色渐变背景
                container.style.background = 'linear-gradient(135deg, #0f0720 0%, #1e0942 50%, #3b0764 100%)';
                
                // 添加辐射渐变光晕效果
                const glowEffect = document.createElement('div');
                glowEffect.style.position = 'absolute';
                glowEffect.style.inset = '0';
                glowEffect.style.background = 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15), transparent 70%)';
                glowEffect.style.pointerEvents = 'none';
                glowEffect.style.zIndex = '0';
                container.appendChild(glowEffect);
              } else if (currentTemplate.id === 'techGeek') {
                // 科技极客模板使用深蓝色渐变背景
                container.style.background = 'linear-gradient(135deg, #0a192f 0%, #112240 50%, #1a365d 100%)';
                
                // 添加网格线效果
                const gridEffect = document.createElement('div');
                gridEffect.style.position = 'absolute';
                gridEffect.style.inset = '0';
                gridEffect.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill='%2306b6d4' fill-opacity='0.3' d='M0 0h100v1H0zM0 20h100v1H0zM0 40h100v1H0zM0 60h100v1H0zM0 80h100v1H0zM1 0v100h1V0zM21 0v100h1V0zM41 0v100h1V0zM61 0v100h1V0zM81 0v100h1V0z'/%3E%3C/svg%3E\")";
                gridEffect.style.backgroundSize = '100px 100px';
                gridEffect.style.backgroundPosition = 'center';
                gridEffect.style.backgroundRepeat = 'repeat';
                gridEffect.style.pointerEvents = 'none';
                gridEffect.style.zIndex = '0';
                container.appendChild(gridEffect);
              } else if (currentTemplate.id === 'modern') {
                // 现代简约模板使用青色调深色渐变背景
                container.style.background = 'linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%)';
                
                // 添加点状图案
                const dotPattern = document.createElement('div');
                dotPattern.style.position = 'absolute';
                dotPattern.style.inset = '0';
                dotPattern.style.backgroundImage = 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjMDZiNmQ0IiBmaWxsLW9wYWNpdHk9IjAuMSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMyIvPjxjaXJjbGUgY3g9IjEzIiBjeT0iMTMiIHI9IjMiLz48L2c+PC9zdmc+")';
                dotPattern.style.backgroundSize = '20px 20px';
                dotPattern.style.backgroundPosition = 'center';
                dotPattern.style.backgroundRepeat = 'repeat';
                dotPattern.style.pointerEvents = 'none';
                dotPattern.style.zIndex = '0';
                container.appendChild(dotPattern);
              } else if (currentTemplate.backgroundColor) {
                if (currentTemplate.backgroundColor.includes('linear-gradient')) {
                  container.style.background = currentTemplate.backgroundColor;
                } else {
                  container.style.backgroundColor = currentTemplate.backgroundColor;
                }
              } else {
                container.style.backgroundColor = '#1a202c'; // 默认暗色背景
              }
            } else {
              container.style.backgroundColor = '#1a202c'; // 默认暗色背景
            }
            container.appendChild(element);
            document.body.appendChild(container);
            
            // 等待渲染完成
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        });
        
        // 导出完成后移除临时样式类
        posterRef.current.classList.remove('export-mode');
        
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        
        // 获取当前模板信息
        const template = templateList.find(t => t.id === templateId) || { name: '默认模板' };
        
        // 生成含有模板名称的文件名
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 格式
        const cleanTitle = title ? title.replace(/[^\w\u4e00-\u9fa5]/g, '_').substring(0, 20) : '海报';
        const fileName = `${cleanTitle}_${template.name}_${date}.png`;
        
        link.download = fileName;
        link.click();
      } catch (error) {
        console.error('Failed to generate poster:', error);
        alert('生成海报失败，请重试');
      } finally {
        setGenerating(false);
      }
    }
  };

  return (
    <Content>
      <FormSection 
        templateId={templateId}
        onTemplateSelect={handleTemplateSelect}
        handleLogoChange={handleLogoChange}
        handleQRCodeChange={handleQRCodeChange}
        title={title}
        setTitle={setTitle}
        newsJson={newsJson}
        handleNewsJsonChange={handleNewsJsonChange}
      />
      
      <PreviewSection 
        posterRef={posterRef}
        logo={logo}
        qrCode={qrCode}
        title={title}
        newsItems={newsItems}
        templateId={templateId}
        generating={generating}
        generatePoster={generatePoster}
      />
    </Content>
  );
};

export default PosterGenerator; 