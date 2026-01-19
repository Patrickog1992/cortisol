import React, { useState } from 'react';
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
