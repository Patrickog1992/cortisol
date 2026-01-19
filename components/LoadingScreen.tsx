import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const messages = [
    "Analisando seu perfil metabólico...",
    "Calculando necessidades calóricas...",
    "Ajustando níveis de cortisol...",
    "Selecionando exercícios ideais...",
    "Preparando seu plano exclusivo..."
  ];

  const testimonials = [
    {
      name: "Maria S.",
      text: "Finalmente consegui perder peso depois da menopausa! Me sinto outra mulher.",
      rating: 5
    },
    {
      name: "Cláudia R.",
      text: "O inchaço sumiu na primeira semana. Incrível!",
      rating: 5
    },
    {
      name: "Ana P.",
      text: "Nunca dormi tão bem. O método realmente funciona.",
      rating: 5
    },
    {
      name: "Patrícia L.",
      text: "Perdi 4kg em 10 dias sem passar fome. Recomendo muito.",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total approx

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onComplete, 500);
    }
  }, [progress, onComplete]);

  // Cycle messages
  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(msgTimer);
  }, [messages.length]);

  // Cycle testimonials
  useEffect(() => {
    const testTimer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(testTimer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      
      {/* Circular Progress or Bar */}
      <div className="w-full mb-8 text-center">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#FF6B6B] bg-red-100">
                Processando
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-[#FF6B6B]">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-red-100 shadow-inner">
            <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#FF6B6B] transition-all duration-300"></div>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-700 animate-pulse mt-4 min-h-[2rem]">
          {messages[messageIndex]}
        </p>
      </div>

      {/* Testimonial Carousel */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full border border-gray-100">
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <div className="h-24 flex items-center justify-center">
          <p className="text-center italic text-gray-600 transition-opacity duration-500">
            "{testimonials[testimonialIndex].text}"
          </p>
        </div>
        <p className="text-center font-bold text-gray-800 mt-2">
          - {testimonials[testimonialIndex].name}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
