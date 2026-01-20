import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import { Button } from './ui/Button';
import WeightChart from './charts/WeightChart';
import { ArrowLeft, Check, ChevronRight } from 'lucide-react';

interface QuizProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ userData, setUserData, onComplete }) => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState<string>('');

  // Reset input value when step changes
  useEffect(() => {
    setInputValue('');
  }, [step]);

  const handleOptionSelect = (key: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [key]: value }));
    nextStep();
  };

  const handleMultiSelect = (key: 'focusAreas' | 'symptoms', value: string) => {
    setUserData(prev => {
      const current = prev[key];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [key]: [...current, value] };
      }
    });
  };

  const handleInputConfirm = (key: keyof UserData, isNumber: boolean = false) => {
    if (!inputValue) return;
    setUserData(prev => ({ 
      ...prev, 
      [key]: isNumber ? Number(inputValue) : inputValue 
    }));
    nextStep();
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  // Helper to render multiple choice buttons
  const renderOptions = (options: string[], onSelect: (opt: string) => void, selected?: string) => (
    <div className="space-y-3 w-full max-w-md">
      {options.map((opt, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(opt)}
          className={`w-full p-4 text-left rounded-xl border-2 transition-all flex justify-between items-center
            ${selected === opt 
              ? 'border-[#FF6B6B] bg-red-50 text-[#FF6B6B] font-semibold' 
              : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
            }`}
        >
          {opt}
          <ChevronRight className={`w-5 h-5 ${selected === opt ? 'text-[#FF6B6B]' : 'text-gray-300'}`} />
        </button>
      ))}
    </div>
  );

  // Helper for multi-select
  const renderMultiSelect = (options: string[], selected: string[], onToggle: (opt: string) => void) => (
    <div className="space-y-3 w-full max-w-md">
      {options.map((opt, idx) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={idx}
            onClick={() => onToggle(opt)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all flex justify-between items-center
              ${isSelected 
                ? 'border-[#FF6B6B] bg-red-50 text-[#FF6B6B] font-semibold' 
                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
              }`}
          >
            {opt}
            {isSelected && <Check className="w-5 h-5 text-[#FF6B6B]" />}
          </button>
        );
      })}
    </div>
  );

  const slides = [
    // 0. Intro
    {
      render: () => (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-6 text-[#FF6B6B]">LIMPEZA DE CORTISOL: EMAGREÇA EM QUALQUER FASE DA MENOPAUSA</h1>
          <img src="https://img.freepik.com/fotos-gratis/mulher-senior-ativa-sorrindo-apos-um-treino_23-2151997777.jpg?semt=ais_hybrid&w=740&q=80" alt="Mulher ativa" className="rounded-2xl shadow-lg mb-8 w-full max-w-sm" />
          <Button onClick={nextStep}>Continuar</Button>
        </div>
      )
    },
    // 1. Social Proof
    {
      render: () => (
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-4">1.877.381 mulheres já se juntaram</h2>
          <img src="https://i.pinimg.com/736x/3e/9b/ce/3e9bce3b4b6e6ccc1c9b98dc57f40b21.jpg" alt="Comunidade" className="rounded-2xl shadow-lg mb-6 w-full max-w-sm" />
          <p className="text-lg text-gray-600 mb-8">Desenvolvido para manter níveis saudáveis de cortisol em mulheres acima de 40 anos</p>
          <Button onClick={nextStep}>Continuar</Button>
        </div>
      )
    },
    // 2. Knowledge
    {
      title: "Quanto você sabe sobre o cortisol?",
      render: () => renderOptions(
        ["Nada", "Conhecimento básico", "Sei muito"],
        (val) => handleOptionSelect('cortisolKnowledge', val),
        userData.cortisolKnowledge
      )
    },
    // 3. Educational
    {
      render: () => (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-[#FF6B6B]">O cortisol é o principal hormônio do estresse do seu corpo.</h2>
          <div className="bg-red-50 p-6 rounded-xl mb-6 text-left w-full">
            <p className="mb-4">Quando permanece em níveis muito altos por muito tempo, pode causar gordura abdominal extra, falta de energia, problemas de sono e alterações de humor.</p>
            <p className="font-semibold mb-2">Controlar o cortisol pode ajudar você a:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">✅ Emagrecer com mais facilidade</li>
              <li className="flex items-center gap-2">✅ Dormir melhor</li>
              <li className="flex items-center gap-2">✅ Ter mais energia durante o dia</li>
              <li className="flex items-center gap-2">✅ Sentir-se mais tranquila e menos estressada</li>
            </ul>
          </div>
          <Button onClick={nextStep}>Continuar</Button>
        </div>
      )
    },
    // 4. Jessica Testimonial (NEW)
    {
      render: () => (
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-4 text-[#FF6B6B]">Veja o antes e depois da Jéssica</h2>
          <img src="https://s2.glbimg.com/5Wxp9ayqXx4KZRFEMz1XIgZ6k-M=/s.glbimg.com/jo/g1/f/original/2015/03/19/laurachaves3.jpg" alt="Antes e Depois Jéssica" className="rounded-xl shadow-lg mb-6 w-full" />
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 relative">
            <span className="absolute -top-3 left-4 text-4xl text-gray-200">"</span>
            <p className="text-gray-700 italic relative z-10">
              Eu achava que era impossível emagrecer depois dos 45. Tinha insônia, irritabilidade e aquela barriga que não sumia por nada. Com o método de limpeza de cortisol, perdi 12kg em apenas 2 meses e recuperei minha alegria de viver!
            </p>
            <p className="text-right font-bold text-[#FF6B6B] mt-2">- Jéssica, 47 anos</p>
          </div>
          
          <Button onClick={nextStep}>Continuar</Button>
        </div>
      )
    },
    // 5. Goal
    {
      title: "Por que você quer perder peso?",
      subtitle: "Você pode ter vários objetivos",
      render: () => renderOptions(
        ["Melhorar minha aparência", "Ser mais saudável", "Sentir-me mais tranquila", "Melhorar minha energia e meu humor"],
        (val) => handleOptionSelect('weightLossReason', val),
        userData.weightLossReason
      )
    },
    // 6. Body Type
    {
      title: "Qual é o seu tipo de corpo atual?",
      render: () => renderOptions(
        ["Normal", "Flácido", "Sobrepeso", "Gordo", "Obeso"],
        (val) => handleOptionSelect('bodyType', val),
        userData.bodyType
      )
    },
    // 7. Time Since Ideal
    {
      title: "Quanto tempo faz desde que você teve seu peso ideal?",
      render: () => renderOptions(
        ["Menos de 1 ano", "1 a 3 anos", "Mais de 3 anos"],
        (val) => handleOptionSelect('timeSinceIdealWeight', val),
        userData.timeSinceIdealWeight
      )
    },
    // 8. Desired Body Type
    {
      title: "Qual é o seu tipo de corpo desejado?",
      render: () => renderOptions(
        ["Com curvas", "Normal", "Magro", "Forte", "Atlético"],
        (val) => handleOptionSelect('desiredBodyType', val),
        userData.desiredBodyType
      )
    },
    // 9. Focus Areas (Multi)
    {
      title: "Selecione suas áreas de foco",
      subtitle: "Marque quantas opções quiser",
      render: () => (
        <div className="w-full flex flex-col items-center">
          {renderMultiSelect(
            ["Braços", "Abdômen", "Costas", "Glúteos", "Pernas", "Quadris", "Corpo todo"],
            userData.focusAreas,
            (val) => handleMultiSelect('focusAreas', val)
          )}
          <div className="mt-6 w-full max-w-md">
            <Button onClick={nextStep} disabled={userData.focusAreas.length === 0}>Continuar</Button>
          </div>
        </div>
      )
    },
    // 10. Menopause Status
    {
      title: "Você está passando pela menopausa atualmente?",
      render: () => renderOptions(
        ["Estou na perimenopausa", "Estou na menopausa", "Estou na pós-menopausa", "Nenhuma das alternativas"],
        (val) => handleOptionSelect('menopauseStatus', val),
        userData.menopauseStatus
      )
    },
    // 11. Symptoms (Multi)
    {
      title: "Você notou algum desses sintomas da menopausa?",
      subtitle: "Marque quantas opções quiser",
      render: () => (
        <div className="w-full flex flex-col items-center">
          {renderMultiSelect(
            ["Ondas de calor", "Cansaço", "Problemas de sono", "Cabelo fino e pele seca", "Alterações de humor", "Suores noturnos", "Secura vaginal", "Nenhum desses"],
            userData.symptoms,
            (val) => handleMultiSelect('symptoms', val)
          )}
          <div className="mt-6 w-full max-w-md">
            <Button onClick={nextStep}>Continuar</Button>
          </div>
        </div>
      )
    },
    // 12. Diet Info
    {
      render: () => (
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-4 text-[#FF6B6B]">Dietas tradicionais não funcionam quando o cortisol está desequilibrado</h2>
          <img src="https://tour.reverse.health/cdn-cgi/image/width=640,quality=75,f=auto/https://cms.reverse.health/api/media-images/file/lose-weight-after-menopause-answer.jpg" alt="Gráfico hormonal" className="rounded-xl shadow-md mb-6 w-full" />
          <p className="text-gray-700 mb-8 text-left">Este plano ajuda mulheres acima de 40 anos a emagrecer, aumentar a energia e controlar os desejos, equilibrando os hormônios do estresse com refeições adaptadas ao corpo, exercícios simples e rotinas sustentáveis.</p>
          <Button onClick={nextStep}>Continuar</Button>
        </div>
      )
    },
    // 13. Activity Freq
    {
      title: "Com que frequência você pratica atividade física?",
      render: () => renderOptions(
        ["Nunca", "Só caminho", "Uma vez na semana", "1 a 3 vezes na semana", "Todo dia"],
        (val) => handleOptionSelect('activityLevel', val),
        userData.activityLevel
      )
    },
    // 14. Walking
    {
      title: "Quanto você costuma caminhar em um dia normal?",
      render: () => renderOptions(
        ["Menos de 20 minutos", "20 a 60 minutos", "Mais de 60 minutos"],
        (val) => handleOptionSelect('walkingDuration', val),
        userData.walkingDuration
      )
    },
    // 15. Water
    {
      title: "Quanta água você bebe por dia?",
      render: () => renderOptions(
        ["Só tomo café", "Menos de 2 copos", "Entre 2 e 4 copos", "Entre 5 e 10 copos", "Mais de 10 copos"],
        (val) => handleOptionSelect('waterIntake', val),
        userData.waterIntake
      )
    },
    // 16. Sleep
    {
      title: "Quantas horas você dorme?",
      render: () => renderOptions(
        ["Menos de 5 horas", "Entre 5 e 6 horas", "Entre 7 e 8 horas", "Mais de 8 horas"],
        (val) => handleOptionSelect('sleepHours', val),
        userData.sleepHours
      )
    },
    // 17. Height
    {
      title: "Qual é a sua altura?",
      subtitle: "Esta informação nos ajuda a fazer cálculos metabólicos e a personalizar seu plano para alcançar o seu melhor corpo!",
      render: () => (
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <input 
              type="number" 
              placeholder="165"
              className="text-4xl font-bold text-center border-b-2 border-[#FF6B6B] w-32 focus:outline-none p-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <span className="text-xl font-medium text-gray-500">cm</span>
          </div>
          <Button onClick={() => handleInputConfirm('height', true)} disabled={!inputValue}>Continuar</Button>
        </div>
      )
    },
    // 18. Weight
    {
      title: "Qual é o seu peso?",
      subtitle: "Esta informação nos ajuda a fazer cálculos metabólicos e a personalizar seu plano para alcançar o seu melhor corpo!",
      render: () => (
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <input 
              type="number" 
              placeholder="70"
              className="text-4xl font-bold text-center border-b-2 border-[#FF6B6B] w-32 focus:outline-none p-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <span className="text-xl font-medium text-gray-500">kg</span>
          </div>
          <Button onClick={() => handleInputConfirm('currentWeight', true)} disabled={!inputValue}>Continuar</Button>
        </div>
      )
    },
    // 19. Desired Weight
    {
      title: "Qual é o seu peso desejado?",
      subtitle: "Nosso programa já ajudou milhares de mulheres como você a alcançar seu peso ideal.",
      render: () => (
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <input 
              type="number" 
              placeholder="60"
              className="text-4xl font-bold text-center border-b-2 border-[#FF6B6B] w-32 focus:outline-none p-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <span className="text-xl font-medium text-gray-500">kg</span>
          </div>
          <Button onClick={() => handleInputConfirm('desiredWeight', true)} disabled={!inputValue}>Continuar</Button>
        </div>
      )
    },
    // 20. Age
    {
      title: "Quantos anos você tem?",
      subtitle: "Esta informação nos ajuda a fazer cálculos metabólicos e a personalizar seu plano para ajudar você a atingir seu objetivo!",
      render: () => (
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <input 
              type="number" 
              placeholder="45"
              className="text-4xl font-bold text-center border-b-2 border-[#FF6B6B] w-32 focus:outline-none p-2"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <span className="text-xl font-medium text-gray-500">anos</span>
          </div>
          <Button onClick={() => handleInputConfirm('age', true)} disabled={!inputValue}>Continuar</Button>
        </div>
      )
    },
    // 21. 4 Week Chart
    {
      render: () => (
        <div className="flex flex-col items-center w-full">
          <h2 className="text-xl font-bold mb-2">O que você pode conquistar em 4 semanas</h2>
          <p className="text-gray-600 mb-6 text-center">Estimamos que você pode alcançar <span className="font-bold text-[#FF6B6B]">{userData.desiredWeight} kg</span> como peso objetivo</p>
          
          <WeightChart 
            currentWeight={userData.currentWeight || 70} 
            targetWeight={userData.desiredWeight || 60} 
            weeks={4} 
          />
          
          <div className="mt-8 w-full">
            <Button onClick={nextStep}>Continuar</Button>
          </div>
        </div>
      )
    },
    // 22. Forbes
    {
      render: () => (
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold mb-4">O melhor aplicativo de saúde feminina em 2025</h2>
          <p className="text-gray-500 mb-4 uppercase tracking-widest text-sm">SEGUNDO A FORBES</p>
          <img src="https://tour.reverse.health/cdn-cgi/image/width=640,quality=75,f=auto/https://cms.reverse.health/api/media-images/file/best-app.jpg" alt="Forbes Best App" className="rounded-xl shadow-lg mb-8 w-full" />
          <Button onClick={nextStep}>Continuar</Button>
        </div>
      )
    },
    // 23. 7 Day Chart
    {
      render: () => {
        // Calculate 7 days target - 5kg as requested in text "até 5 KG"
        const day7Target = (userData.currentWeight || 70) - 5;
        return (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-bold mb-2">Resultados estimados nos primeiros 7 dias</h2>
            <p className="text-gray-600 mb-6 text-center">Se você seguir nosso plano, estimamos que você pode perder até 5 KG</p>
            
            <WeightChart 
              currentWeight={userData.currentWeight || 70} 
              targetWeight={day7Target} 
              days={7}
            />
            
            <div className="mt-8 w-full">
              <Button onClick={onComplete}>Continuar</Button>
            </div>
          </div>
        )
      }
    }
  ];

  const currentSlide = slides[step];
  const progress = ((step + 1) / slides.length) * 100;

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-gray-50">
      {/* Header with Progress - REMOVED sticky/top-0/z-10 */}
      <div className="bg-white p-4">
        <div className="relative flex items-center justify-center mb-4">
          {step > 0 && (
            <button onClick={prevStep} className="absolute left-0 text-gray-500 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <img 
            src="https://i.imgur.com/nzmDg6y.png" 
            alt="Logo" 
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[#FF6B6B] h-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-start pt-8">
        {currentSlide.title && (
          <h2 className="text-2xl font-bold text-center mb-2 w-full">{currentSlide.title}</h2>
        )}
        {currentSlide.subtitle && (
          <p className="text-gray-600 text-center mb-8 w-full">{currentSlide.subtitle}</p>
        )}
        
        <div className="w-full mt-4">
          {currentSlide.render()}
        </div>
      </div>
    </div>
  );
};

export default Quiz;