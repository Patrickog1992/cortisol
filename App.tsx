import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import LoadingScreen from './components/LoadingScreen';
import SalesPage from './components/SalesPage';
import { UserData, ViewState } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>('quiz');
  const [userData, setUserData] = useState<UserData>({
    focusAreas: [],
    symptoms: [],
    currentWeight: 70, // Default for visuals before input
    desiredWeight: 60, // Default for visuals before input
  });

  // Preload critical images on mount
  useEffect(() => {
    const imagesToPreload = [
      "https://i.imgur.com/nzmDg6y.png", // Logo
      "https://img.freepik.com/fotos-gratis/mulher-senior-ativa-sorrindo-apos-um-treino_23-2151997777.jpg?semt=ais_hybrid&w=740&q=80",
      "https://i.pinimg.com/736x/3e/9b/ce/3e9bce3b4b6e6ccc1c9b98dc57f40b21.jpg",
      "https://tour.reverse.health/cdn-cgi/image/width=640,quality=75,f=auto/https://cms.reverse.health/api/media-images/file/lose-weight-after-menopause-answer.jpg",
      "https://s2.glbimg.com/5Wxp9ayqXx4KZRFEMz1XIgZ6k-M=/s.glbimg.com/jo/g1/f/original/2015/03/19/laurachaves3.jpg",
      // Sales page critical images
      "https://i.imgur.com/CJxusNE.jpeg",
      "https://i.imgur.com/ZODa9px.jpeg",
      "https://i.imgur.com/QT53OcU.jpeg",
      "https://i.imgur.com/bbQjEL1.jpeg",
      // Testimonial images
      "https://s2.glbimg.com/x-0r5JgdJkAngKiRfQR15n6umS8=/620x465/s.glbimg.com/jo/g1/f/original/2015/03/19/laurachaves1.jpg",
      "https://s2.glbimg.com/SEeGAv2paeLO641mzajrJWTHVek=/s.glbimg.com/jo/g1/f/original/2013/08/23/foto2_1.jpg",
      "https://s2.glbimg.com/lLkAxUiXQeIMtiH-3qRo1A2TCaJUNItp-YHO6e9JUO5Ioz-HdGixxa_8qOZvMp3w/s.glbimg.com/jo/g1/f/original/2012/11/01/sandra1.jpg",
      "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2014/12/10/montagem3emagrecimentoflaviaprantesvcreporterflavia-ferreira-machado.jpg"
    ];

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleQuizComplete = (data: UserData) => {
    setUserData(data);
    setView('loading');
  };

  const handleLoadingComplete = () => {
    setView('sales');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-['Poppins']">
      {view === 'quiz' && (
        <Quiz 
          userData={userData} 
          setUserData={setUserData} 
          onComplete={() => handleQuizComplete(userData)} 
        />
      )}
      {view === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      {view === 'sales' && (
        <SalesPage userData={userData} />
      )}
    </div>
  );
}