import React from 'react';
import Header from './components/Header/Header';
import ContactForm from './components/ContactForm/ContactForm';
import Slider from './components/Slider/Slider';
import Features from './components/Features/Features';
import ContactInfo from './components/ContactInfo/ContactInfo';
import FooterLine from './components/FooterLine/FooterLine';
import Footer from './components/Footer/Footer';
import './styles/global.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <ContactForm />
      <Slider />
      <Features />
      <ContactInfo />
      <FooterLine />
      <Footer />
    </div>
  );
}

export default App;

