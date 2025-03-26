            <PosterPreview
              ref={previewRef}
              logo={logo}
              qrCode={qrCode}
              title={title}
              newsItems={newsItems}
              templateId={selectedTemplate?.id || 'classic'}
              onExport={handleExport}
            /> 