import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Greeting from './components/Greeting/Greeting';

export default function StartScreen({history}) {
    return (
          <div className="Page Page_font_yandex">
              <Header start={true} history={history} />
    
              <main className="Main">
                  <div className="Container Container_align_centralize">
                      <Greeting />
                  </div>
              </main>
    
              <Footer />  
          </div>
    );
};