import { Award, BookOpen, Users, Globe } from "lucide-react";

export function About() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero */}
      <section className="bg-[#0A192F] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00C2FF]/10 opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Sobre a COMPIA</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Impulsionando o futuro através do conhecimento. Somos a editora líder em Inteligência Artificial e Tecnologia na América Latina.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#00C2FF] font-bold text-sm tracking-widest uppercase mb-2 block">Nossa História</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-6">Democratizando o acesso à tecnologia de ponta</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Fundada em 2020 por um grupo de pesquisadores e engenheiros de software, a COMPIA nasceu com a missão de preencher a lacuna de material técnico de alta qualidade em língua portuguesa.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Acreditamos que a educação é a chave para o desenvolvimento tecnológico. Por isso, trabalhamos com os maiores especialistas do mercado para trazer conteúdos atualizados, práticos e transformadores.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <h4 className="text-4xl font-bold text-[#00C2FF] mb-2">50k+</h4>
                <p className="text-gray-500 font-medium">Leitores Ativos</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-[#00C2FF] mb-2">200+</h4>
                <p className="text-gray-500 font-medium">Títulos Publicados</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-[#00C2FF]/20 rounded-2xl transform rotate-3" />
            <img 
              src="https://images.unsplash.com/photo-1625461291092-13d0c45608b3?q=80&w=1000&auto=format&fit=crop" 
              alt="Office" 
              className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Nossos Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              O que nos guia na busca pela excelência editorial e educacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-[#00C2FF] transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-[#00C2FF] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00C2FF] group-hover:text-white transition-colors">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Excelência</h3>
              <p className="text-gray-500 leading-relaxed">
                Rigor técnico e didático em cada publicação, garantindo o melhor aprendizado.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-[#00C2FF] transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-[#00C2FF] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00C2FF] group-hover:text-white transition-colors">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Inovação</h3>
              <p className="text-gray-500 leading-relaxed">
                Estamos sempre atentos às novas tendências para trazer o futuro até você.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-[#00C2FF] transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-[#00C2FF] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00C2FF] group-hover:text-white transition-colors">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Comunidade</h3>
              <p className="text-gray-500 leading-relaxed">
                Fomentamos uma rede de troca de conhecimento entre autores e leitores.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-[#00C2FF] transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-[#00C2FF] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00C2FF] group-hover:text-white transition-colors">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">Acessibilidade</h3>
              <p className="text-gray-500 leading-relaxed">
                Compromisso em tornar o conhecimento complexo acessível a todos.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
