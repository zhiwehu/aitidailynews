import React from 'react';
import PosterPreview from './PosterPreview';
import { GenerateButton, PreviewContainer, SectionContainer, SectionHeading } from './styles/CommonStyles';

const PreviewSection = ({ posterRef, logo, qrCode, title, newsItems, templateId, generating, generatePoster }) => {
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
      
      <GenerateButton 
        onClick={generatePoster}
        disabled={generating}
        style={{ marginTop: '20px' }}
      >
        {generating ? '生成中...' : '生成海报'}
      </GenerateButton>
    </SectionContainer>
  );
};

export default PreviewSection; 