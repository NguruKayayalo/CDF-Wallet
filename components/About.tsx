import React from 'react';
import { Scale, Heart, Hammer, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <section id="about" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-yellow-600/5 blur-[120px] rounded-full translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants as any}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-blue-400 font-sans text-xs uppercase tracking-[0.2em] font-bold">Identité & Mission</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 font-serif leading-[1.1]">
              Redéfinir la <br/>
              <span className="text-gradient-gold">Souveraineté</span>
            </h2>
            
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-serif italic">
               <p className="border-l-2 border-blue-600/50 pl-6">
                "Le Franc Congolais numérique est bien plus qu'un actif financier ; c'est le catalyseur d'une nouvelle ère de prospérité pour la République Démocratique du Congo."
              </p>
            </div>

            <p className="mt-8 text-slate-400 leading-relaxed font-sans text-base">
              Dans un monde de plus en plus numérisé, la RDC se dote d'un outil technologique de pointe pour sécuriser ses transactions, moderniser ses infrastructures et offrir à chaque citoyen une porte d'entrée vers l'économie mondiale décentralisée.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group p-6 glass-card rounded-2xl">
                <Globe2 className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-serif font-bold text-white mb-2">Hub Africain</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Positionner la RDC comme le leader de l'innovation blockchain en Afrique Centrale.</p>
              </div>
              
              <div className="group p-6 glass-card rounded-2xl">
                <Heart className="w-8 h-8 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-serif font-bold text-white mb-2">Inclusion</h4>
                <p className="text-slate-500 text-sm leading-relaxed">Ouvrir l'accès financier aux millions de Congolais non-bancarisés via le mobile.</p>
              </div>
            </div>
          </motion.div>

          {/* Bento Grid Layout for Values */}
          <motion.div variants={itemVariants as any} className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
            {/* Value: Justice */}
            <div className="md:col-span-2 group relative p-8 glass-card rounded-3xl overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Scale className="w-24 h-24 text-blue-500" />
               </div>
               <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                  <Scale className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-2">Justice</h4>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  L'intégrité du code remplace la confiance aveugle. Chaque transaction est vérifiable, équitable et protégée par la décentralisation.
                </p>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
            </div>

            {/* Value: Paix */}
            <div className="group relative p-8 glass-card rounded-3xl overflow-hidden">
               <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 mb-6 group-hover:rotate-12 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-bold text-white mb-2">Paix</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Stabilité économique et financière au service d'un climat de confiance.
                </p>
               </div>
               <div className="absolute bottom-0 right-0 p-2 opacity-5">
                <Heart className="w-12 h-12 text-yellow-500" />
               </div>
            </div>

            {/* Value: Travail */}
            <div className="group relative p-8 glass-card rounded-3xl overflow-hidden">
               <div className="relative z-10 text-center flex flex-col items-center">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 group-hover:-rotate-12 transition-transform">
                  <Hammer className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-serif font-bold text-white mb-2">Travail</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Encourager l'entrepreneuriat numérique et la création de valeur locale.
                </p>
               </div>
               <div className="absolute bottom-0 right-0 p-2 opacity-5">
                <Hammer className="w-12 h-12 text-green-500" />
               </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;