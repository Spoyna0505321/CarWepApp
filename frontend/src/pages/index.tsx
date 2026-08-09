import { Link, useNavigate } from 'react-router-dom';
export function IndexPage() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if(token){
    navigate("/home")
  }
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white antialiased font-sans select-none">
      
      {/* 1. Arka Plan: Sinematik ve Devasa Araç Görseli */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://unsplash.com" 
          alt="NEXUS Hero" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Üst ve alt menülerin okunabilirliği için hafif karartma gradyanı */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
      </div>

      {/* 2. İçerik Katmanı */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between pt-32 pb-24 px-6 text-center">
        
        {/* Üst Metin: Model İsmi ve Slogan */}
        <div className="space-y-3 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold tracking-[0.4em] uppercase font-mono">
            MODEL S
          </h1>
          <p className="text-xs md:text-sm tracking-[0.2em] text-gray-300 uppercase font-light">
            Sürdürülebilirliğin En Hızlı Hali
          </p>
        </div>

        {/* Alt Kısım: Tesla Tarzı Butonlar ve İpucu */}
        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* İkili Buton Grubu */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            {/* Birincil Buton: Tasarım / Sipariş ekranına gider */}
            <Link 
              to="/home" 
              className="flex-1 py-3.5 bg-white/80 backdrop-blur-md text-black text-xs font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-white active:scale-[0.99] transition-all duration-200 shadow-xl text-center"
            >
              Uygulamaya Git
            </Link>

            {/* İkincil Buton: İnceleme / Bilgi ekranına gider */}
            <Link 
              to="/about" 
              className="flex-1 py-3.5 bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-black/70 hover:border-white/40 active:scale-[0.99] transition-all duration-200 shadow-xl text-center"
            >
              Keşfedin
            </Link>
          </div>

          {/* Aşağı Kaydır İkonu / Animasyonlu Ok */}
          <div className="flex justify-center pt-4">
            <div className="animate-bounce cursor-pointer p-2 opacity-60 hover:opacity-100 transition-opacity">
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
