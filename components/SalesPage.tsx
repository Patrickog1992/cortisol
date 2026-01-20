import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import { Button } from './ui/Button';
import { Check, Star, Lock, ShieldCheck, ChevronDown, ChevronUp, Clock, AlertCircle, ShoppingBag } from 'lucide-react';

interface SalesPageProps {
  userData: UserData;
}

const SalesPage: React.FC<SalesPageProps> = ({ userData }) => {
  // Timer Countdown - Starts at 10 minutes
  const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 0 });
  const [mockupIndex, setMockupIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  // Popup State
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: "Ana Paula", location: "São Paulo, SP" });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) return prev;
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Popup Logic
  const recentBuyers = [
    { name: "Fernanda S.", location: "Rio de Janeiro" },
    { name: "Mariana L.", location: "Belo Horizonte" },
    { name: "Patrícia G.", location: "Curitiba" },
    { name: "Camila R.", location: "São Paulo" },
    { name: "Juliana M.", location: "Salvador" },
    { name: "Beatriz C.", location: "Brasília" },
    { name: "Roberta T.", location: "Porto Alegre" },
    { name: "Luciana A.", location: "Recife" }
  ];

  useEffect(() => {
    // Initial delay
    const initialTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    const interval = setInterval(() => {
      setShowPopup(false);
      setTimeout(() => {
        const randomBuyer = recentBuyers[Math.floor(Math.random() * recentBuyers.length)];
        setPopupData(randomBuyer);
        setShowPopup(true);
      }, 2000); // Wait 2s before showing next
    }, 8000); // Cycle every 8 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Mockup Carousel
  const mockups = [
    "https://i.imgur.com/QT53OcU.jpeg",
    "https://i.imgur.com/bbQjEL1.jpeg"
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setMockupIndex(prev => (prev + 1) % mockups.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [mockups.length]);

  // Testimonials Data
  const testimonialsData = [
    {
      image: "https://s2.glbimg.com/x-0r5JgdJkAngKiRfQR15n6umS8=/620x465/s.glbimg.com/jo/g1/f/original/2015/03/19/laurachaves1.jpg",
      text: "Eu não conseguia emagrecer de jeito nenhum. Descobrir que era o cortisol foi a virada de chave. Menos 14kg em 3 meses!",
      name: "Laura C.",
      likes: 245,
      hearts: 120
    },
    {
      image: "https://s2.glbimg.com/SEeGAv2paeLO641mzajrJWTHVek=/s.glbimg.com/jo/g1/f/original/2013/08/23/foto2_1.jpg",
      text: "Sempre fui inchada e vivia estressada. O método é simples e o resultado aparece rápido. Minha barriga sumiu!",
      name: "Cristina R.",
      likes: 312,
      hearts: 150
    },
    {
      image: "https://s2.glbimg.com/lLkAxUiXQeIMtiH-3qRo1A2TCaJUNItp-YHO6e9JUO5Ioz-HdGixxa_8qOZvMp3w/s.glbimg.com/jo/g1/f/original/2012/11/01/sandra1.jpg",
      text: "Estava quase desistindo de mim. Hoje me olho no espelho e me reconheço de novo. Gratidão eterna por esse programa.",
      name: "Sandra M.",
      likes: 189,
      hearts: 98
    },
    {
      image: "https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2014/12/10/montagem3emagrecimentoflaviaprantesvcreporterflavia-ferreira-machado.jpg",
      text: "Depois da gravidez e menopausa, achei que nunca mais teria esse corpo. O Reset de Cortisol me provou o contrário!",
      name: "Flávia F.",
      likes: 405,
      hearts: 210
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonialsData.length);
    }, 4000); // Slightly longer reading time
    return () => clearInterval(timer);
  }, [testimonialsData.length]);

  const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-gray-200 py-4">
        <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full text-left font-semibold text-gray-800">
          <span>{question}</span>
          {isOpen ? <ChevronUp className="w-5 h-5 text-[#FF6B6B]" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>
        {isOpen && <p className="mt-2 text-gray-600 text-sm">{answer}</p>}
      </div>
    );
  };

  const handleCheckout = () => {
    window.location.href = "https://go.perfectpay.com.br/PPU38CQ692F";
  };

  // Personalized insights based on user data
  const renderPersonalizedInsights = () => {
    const items = [];
    if (userData.age) items.push(`Idade: ${userData.age} anos (Fase crítica para cortisol)`);
    if (userData.symptoms && userData.symptoms.length > 0) items.push(`Sintomas: ${userData.symptoms.slice(0, 2).join(", ")}`);
    if (userData.focusAreas && userData.focusAreas.length > 0) items.push(`Foco: ${userData.focusAreas[0]}`);
    if (userData.currentWeight && userData.desiredWeight) items.push(`Meta: Perder ${userData.currentWeight - userData.desiredWeight}kg`);
    if (userData.menopauseStatus) items.push(`Status: ${userData.menopauseStatus}`);
    
    return items.map((item, idx) => (
      <div key={idx} className="flex items-center gap-2 bg-red-50 p-3 rounded-lg">
        <Check className="w-5 h-5 text-[#FF6B6B]" />
        <span className="text-gray-700 font-medium text-sm">{item}</span>
      </div>
    ));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl overflow-hidden pb-12 relative">
      {/* Sticky Header with Timer */}
      <div className="sticky top-0 z-50 bg-[#FF6B6B] text-white p-3 shadow-md text-center">
        <div className="flex flex-col items-center justify-center leading-tight">
          <span className="font-bold text-sm md:text-base">Você acabou de receber 70% de desconto que expira em:</span>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-5 h-5 text-[#FFD700]" />
            <span className="font-extrabold text-2xl text-[#FFD700] tracking-widest">
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Social Proof Popup */}
      <div 
        className={`fixed top-[85px] right-2 z-40 bg-white/95 backdrop-blur-sm p-2 rounded-lg shadow-xl border-l-4 border-green-500 transform transition-all duration-500 ease-in-out flex items-center gap-2 max-w-[200px] ${showPopup ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}
      >
        <div className="bg-green-100 p-1.5 rounded-full">
          <ShoppingBag className="w-3 h-3 text-green-600" />
        </div>
        <div className="text-[10px] leading-tight">
          <p className="font-bold text-gray-800"><span className="text-green-600">{popupData.name}</span></p>
          <p className="text-gray-500">recebeu o MÉTODO</p>
          <p className="text-gray-400 mt-0.5">{popupData.location}</p>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 leading-tight mb-6">
          Aqui está o seu <span className="text-[#FF6B6B]">PLANO PESSOAL</span> para equilibrar o cortisol, acelerar o emagrecimento e recuperar sua energia.
        </h1>

        {/* Before/After Grid */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="text-center">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-bold mb-1 block">AGORA</span>
            <img src="https://i.imgur.com/CJxusNE.jpeg" alt="Antes" className="w-full rounded-lg shadow-md h-64 object-cover" />
          </div>
          <div className="text-center">
            <span className="bg-[#FF6B6B] text-white px-2 py-1 rounded text-xs font-bold mb-1 block">DEPOIS DO MÉTODO</span>
            <img src="https://i.imgur.com/ZODa9px.jpeg" alt="Depois" className="w-full rounded-lg shadow-md h-64 object-cover" />
          </div>
        </div>

        {/* Checkmarks below images */}
        <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-gray-600">
          <div>
            <p className="flex items-center"><AlertCircle className="w-3 h-3 text-red-500 mr-1"/> Inchaço</p>
            <p className="flex items-center"><AlertCircle className="w-3 h-3 text-red-500 mr-1"/> Cansaço</p>
            <p className="flex items-center"><AlertCircle className="w-3 h-3 text-red-500 mr-1"/> Ansiedade</p>
          </div>
          <div>
            <p className="flex items-center"><Check className="w-3 h-3 text-green-500 mr-1"/> Disposição</p>
            <p className="flex items-center"><Check className="w-3 h-3 text-green-500 mr-1"/> Leveza</p>
            <p className="flex items-center"><Check className="w-3 h-3 text-green-500 mr-1"/> Autoestima</p>
          </div>
        </div>

        {/* 94% Stat */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-center">
          <p className="text-green-800 font-semibold">
            94% dos mulheres com perfis semelhantes ao seu percebem melhora em apenas 2 semanas com o Método RESET DO CORTISOL
          </p>
        </div>

        {/* Algorithm Results */}
        <div className="mb-8">
          <h3 className="font-bold text-lg mb-3">Nosso algoritmo inteligente criou um plano personalizado com base nos seus objetivos.</h3>
          <div className="space-y-2">
            {renderPersonalizedInsights()}
          </div>
        </div>

        {/* What You Get */}
        <h2 className="text-xl font-bold text-[#FF6B6B] mb-4">O que você vai receber?</h2>
        <div className="space-y-4 mb-8">
          {[
            "Um programa inteligente de exercícios simples e eficazes para acelerar o metabolismo, reduzir o estresse e favorecer o emagrecimento.",
            "Estratégias naturais para equilibrar o cortisol, controlar o apetite, diminuir o inchaço e aumentar a disposição diária.",
            "Técnicas de respiração e consciência corporal para reduzir a ansiedade, melhorar o sono e regular os hormônios do estresse.",
            "Práticas mentais e emocionais para fortalecer sua autoestima, foco, motivação e constância nos resultados.",
            "Orientações práticas de rotina, alimentação e hábitos saudáveis para transformar seu corpo de forma sustentável e segura."
          ].map((text, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="mt-1 bg-[#FF6B6B] rounded-full p-1 min-w-[20px]">
                <Check className="w-3 h-3 text-white" />
              </div>
              <p className="text-sm text-gray-700">{text}</p>
            </div>
          ))}
        </div>

        {/* Phone Mockup Carousel */}
        <div className="relative mx-auto w-64 h-[500px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden mb-12">
          <div className="absolute top-0 w-full h-8 bg-black rounded-b-xl z-10"></div>
          <img 
            src={mockups[mockupIndex]} 
            alt="App Interface" 
            className="w-full h-full object-contain transition-opacity duration-500" 
          />
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 -mx-6 px-6 py-8 mb-8">
          <h2 className="text-xl font-bold text-center mb-6">O QUE DIZEM NOSSAS ALUNAS</h2>
          <div className="flex flex-col items-center min-h-[400px] justify-center transition-all duration-300">
            <div className="w-64 h-48 rounded-lg overflow-hidden border-4 border-[#FF6B6B] shadow-lg mb-4">
              <img 
                src={testimonialsData[testimonialIndex].image} 
                alt="Aluna Antes e Depois" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
            </div>
            <p className="text-center text-gray-600 text-sm italic max-w-xs mb-4 px-4 min-h-[80px] flex items-center justify-center">
              "{testimonialsData[testimonialIndex].text}"
            </p>
            <p className="font-bold text-gray-800 mb-2">- {testimonialsData[testimonialIndex].name}</p>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
               <span className="flex items-center gap-1">👍 {testimonialsData[testimonialIndex].likes}</span>
               <span className="flex items-center gap-1">❤️ {testimonialsData[testimonialIndex].hearts}</span>
            </div>
          </div>
          <p className="text-center font-bold text-gray-800 mt-6">Aprovado por mais de 15 mil alunas</p>
        </div>

        {/* Pizza Anchor */}
        <div className="text-center mb-10">
          <h2 className="text-xl font-bold mb-2">E O MELHOR?</h2>
          <p className="text-lg text-gray-700">Tudo isso custa menos que uma PIZZA. 🍕</p>
          <p className="text-gray-600">Invista em você e conquiste o corpo, a saúde e a energia que você realmente merece.</p>
        </div>

        {/* Timeline */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🚀</span> Sua jornada de transformação
          </h2>
          <div className="space-y-6 border-l-2 border-red-200 pl-6 ml-2">
            {[
              { title: "7 Dias — Primeira Semana", desc: "Você começa a sentir menos inchaço, mais disposição e mais controle sobre o apetite. O sono melhora e a ansiedade começa a diminuir." },
              { title: "14 Dias — Segunda Semana", desc: "Seu corpo responde visivelmente. As roupas ficam mais confortáveis, a barriga começa a reduzir e sua confiança aumenta. As pessoas ao seu redor percebem a diferença." },
              { title: "21 Dias — Terceira Semana", desc: "Os resultados ficam ainda mais claros. Mais leveza, mais energia, mais autoestima e um corpo visivelmente mais definido. Você se sente no controle novamente." }
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#FF6B6B]"></div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bonuses */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-2xl shadow-xl mb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-2">🎁 Ganhe 5 BÔNUS EXCLUSIVOS</h2>
            <p className="text-sm bg-red-600 inline-block px-3 py-1 rounded-full animate-pulse">⏰ ÚLTIMAS 5 VAGAS DISPONÍVEIS</p>
          </div>

          <div className="space-y-6">
            {[
              { name: "BÔNUS 1", title: "Plano Acelerado de Emagrecimento em 30 Dias", desc: "Protocolo estratégico para acelerar a queima de gordura e equilibrar o metabolismo.", price: "R$ 97" },
              { name: "BÔNUS 2", title: "Treinamento Diário de Foco, Disciplina e Motivação", desc: "Fortaleça sua mentalidade e mantenha constância nos resultados.", price: "R$ 67" },
              { name: "BÔNUS 3", title: "Método Antiestresse e Controle da Ansiedade", desc: "Reduza o cortisol, melhore o sono e aumente seu bem-estar em poucos minutos por dia.", price: "R$ 87" },
              { name: "BÔNUS 4", title: "Aula Especial: Hábitos que Aceleram o Emagrecimento", desc: "Identifique e elimine comportamentos que bloqueiam seus resultados.", price: "R$ 127" },
              { name: "BÔNUS 5", title: "Comunidade Exclusiva Reset do Cortisol", desc: "Acesso a suporte, motivação e acompanhamento com outras mulheres em transformação.", price: "R$ 97" }
            ].map((bonus, idx) => (
              <div key={idx} className="border-b border-gray-700 pb-4 last:border-0">
                <p className="text-[#FFD700] font-bold mb-1">{bonus.name}</p>
                <p className="font-semibold mb-2">{bonus.title}</p>
                <p className="text-gray-300 text-sm mb-2">{bonus.desc}</p>
                <p className="text-sm">Valor: <span className="line-through text-gray-500">{bonus.price}</span></p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center pt-4 border-t border-gray-600">
            <p className="text-lg">Valor total dos bônus: <span className="line-through">R$ 475</span></p>
            <p className="text-2xl font-bold text-[#FFD700]">HOJE: GRÁTIS</p>
          </div>
        </div>

        {/* Pricing Offer - Changed to GREEN */}
        <div className="bg-white border-2 border-green-500 rounded-2xl p-6 text-center shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 font-bold rounded-bl-xl">OFERTA ESPECIAL</div>
          <p className="text-gray-500 text-lg mb-2">De <span className="line-through">R$ 497,00</span></p>
          <p className="text-gray-700 mb-2">Por apenas</p>
          <div className="text-6xl font-extrabold text-green-600 mb-2">R$ 47<span className="text-2xl">,00</span></div>
          <p className="text-sm text-gray-500 mb-6">Pagamento único • Acesso vitalício</p>
          
          <Button onClick={handleCheckout} variant="success" className="animate-pulse shadow-xl text-xl py-5">
            QUERO O MÉTODO RESET DO CORTISOL AGORA!
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" /> Pagamento 100% seguro
          </div>
        </div>

        {/* Guarantee */}
        <div className="bg-gray-100 p-6 rounded-xl mb-10 text-center">
          <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-4">🛡️ GARANTIA TOTAL — RISCO ZERO</h2>
          <p className="text-gray-600 text-sm mb-4">
            Você tem 30 dias completos para colocar o Método Reset do Cortisol em prática.
            Se, por qualquer motivo, você não perceber mais disposição, mais equilíbrio, redução do inchaço e avanço no seu bem-estar, basta enviar um e-mail ou mensagem — e devolvemos 100% do seu dinheiro.
          </p>
          <p className="font-bold text-gray-800">Sem burocracia. Sem risco. Simples assim.</p>
        </div>

        {/* Cost Comparison */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-center mb-6">💰 Compare os custos para cuidar da sua saúde e emagrecer</h2>
          <div className="space-y-4">
            {[
              { icon: "💊", title: "Remédios para emagrecimento e estimulantes (1 mês)", price: "R$ 300 a R$ 1.500", note: "Possíveis efeitos colaterais, resultados temporários e risco de dependência." },
              { icon: "👩‍⚕️", title: "Consultas particulares e terapias", price: "R$ 400 a R$ 800 por consulta", note: "Sem garantia de resultado contínuo e acompanhamento limitado." },
              { icon: "🏋️‍♀️", title: "Academia + Personal Trainer", price: "R$ 500 a R$ 1.200 por mês", note: "Alto custo mensal e nem sempre focado em equilíbrio hormonal." },
              { icon: "💉", title: "Tratamentos estéticos e clínicos", price: "R$ 5.000 a R$ 20.000", note: "Custos elevados, riscos e resultados imprevisíveis." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <p className="text-red-500 font-bold">{item.price}</p>
                <p className="text-xs text-gray-500 mt-1">{item.note}</p>
              </div>
            ))}
            
            <div className="bg-[#FF6B6B] p-4 rounded-lg text-white transform scale-105 shadow-lg">
              <div className="text-2xl mb-2">🌿</div>
              <h3 className="font-bold text-xl">Método Reset do Cortisol</h3>
              <p className="font-extrabold text-2xl my-2">Apenas R$ 47,00</p>
              <p className="text-xs opacity-90">Pagamento único • Sem mensalidades • Acesso vitalício</p>
            </div>
          </div>
        </div>

        {/* Final Choice */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Agora você tem 2 escolhas…</h2>
          
          <div className="mb-6 opacity-75">
            <h3 className="text-lg font-bold text-red-500 mb-2 flex items-center gap-2"><span className="text-2xl">❌</span> 1. Continuar como está</h3>
            <p className="text-gray-600">Tentando resolver sozinha, repetindo dietas que não funcionam, convivendo com cansaço, inchaço e frustração.</p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-bold text-green-600 mb-2 flex items-center gap-2"><span className="text-2xl">✅</span> 2. Começar hoje com o Método Reset do Cortisol</h3>
            <p className="text-gray-700 mb-4">Seguindo um plano simples, prático e acessível que já ajudou milhares de mulheres a recuperarem o controle do corpo e da saúde.</p>
            <Button onClick={handleCheckout} variant="success" className="animate-pulse">
              👉 ENTRAR NO MÉTODO RESET DO CORTISOL
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-center mb-6">Perguntas Frequentes</h2>
          <div className="space-y-2">
            <FAQItem question="Tenho acesso imediato?" answer="Sim! Assim que o pagamento for confirmado, você recebe o acesso por e-mail." />
            <FAQItem question="Funciona para quem já está na menopausa?" answer="Sim, foi desenvolvido especificamente para mulheres acima de 40 anos, em qualquer fase da menopausa." />
            <FAQItem question="Preciso de equipamentos?" answer="Não, o método utiliza exercícios simples que podem ser feitos em casa." />
            <FAQItem question="E se eu não gostar?" answer="Você tem 30 dias de garantia incondicional. Devolvemos 100% do seu dinheiro." />
            <FAQItem question="Quais as formas de pagamento?" answer="Aceitamos Cartão de Crédito e Pix." />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 text-xs py-8 border-t">
          <p>© 2025 Reset do Cortisol. Todos os direitos reservados.</p>
          <p className="mt-2">Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook.</p>
        </footer>

      </div>
    </div>
  );
};

export default SalesPage;