import React from 'react';
import PosterPreview from './PosterPreview';
import { PreviewContainer, SectionContainer, SectionHeading } from './styles/CommonStyles';

const PreviewSection = ({ posterRef, logo, qrCode, title, newsItems, templateId }) => {
  return (
    <SectionContainer className="glass-card">
      <SectionHeading>海报预览</SectionHeading>
      <PreviewContainer className="preview-container">
        <PosterPreview 
          ref={posterRef}
          logo={logo} 
          qrCode={qrCode} 
          title={title} 
          newsItems={newsItems}
          templateId={templateId}
          className="poster-container"
        />
      </PreviewContainer>
    </SectionContainer>
  );
};

export default PreviewSection; 