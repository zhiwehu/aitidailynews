import React from 'react';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import PosterGenerator from '../src/components/PosterGenerator';
import { Container } from '../src/components/styles/CommonStyles';

export default function Home() {
  return (
    <Container>
      <div className="tech-dots tech-dots-1"></div>
      <div className="tech-dots tech-dots-2"></div>
      
      <Header />
      <PosterGenerator />
      <Footer />
    </Container>
  );
} 