import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, FileText, CheckCircle, AlertCircle, TrendingUp, Users, Award, Shield } from 'lucide-react';

interface Proposal {
  id: number;
  title: string;
  category: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected';
  proposer: string;
}

const DaoGovernance: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: "Financement Micro-finance Mobile Kinshasa",
      category: "Inclusion financière",
      description: "Allouer 15% de la réserve du projet pour financer des micro-crédits à taux zéro pour 500 femmes entrepreneures de Kinshasa, remboursables en CDF.",
      votesFor: 84200,
      votesAgainst: 12100,
      status: 'active',
      proposer: "0x8F5...3E9"
    },
    {
      id: 2,
      title: "Bourses Web3 Universités Goma & Bukavu",
      category: "Éducation & Formation",
      description: "Création d'un programme de bourses d'excellence et d'ateliers de formation certifiants sur la blockchain pour 1000 étudiants du Kivu.",
      votesFor: 92150,
      votesAgainst: 5400,
      status: 'active',
      proposer: "0x4A2...1C8"
    },
    {
      id: 3,
      title: "Partenariat Agro-Tech Province de l'Équateur",
      category: "Développement Local",
      description: "Financement d'une plateforme d'approvisionnement agricole utilisant le jeton CDF pour assurer des prix justes aux producteurs de café.",
      votesFor: 76400,
      votesAgainst: 14900,
      status: 'active',
      proposer: "0x9D3...5B2"
    }
  ]);

  const [votedIds, setVotedIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'proposals' | 'stats'>('proposals');

  // Load votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('fc_user_votes');
    if (savedVotes) {
      try {
        setVotedIds(JSON.parse(savedVotes));
      } catch (e) {
        console.error("Error reading saved votes", e);
      }
    }
  }, []);

  const handleVote = (id: number, type: 'for' | 'against') => {
    if (votedIds.includes(id)) return;

    const updatedProposals = proposals.map(p => {
      if (p.id === id) {
        return {
          ...p,
          votesFor: type === 'for' ? p.votesFor + 500 : p.votesFor,
          votesAgainst: type === 'against' ? p.votesAgainst + 500 : p.votesAgainst
        };
      }
      return p;
    });

    setProposals(updatedProposals);
    const newVotedIds = [...votedIds, id];
    setVotedIds(newVotedIds);
    localStorage.setItem('fc_user_votes', JSON.stringify(newVotedIds));
  };

  const calculatePercentage = (votesFor: number, votesAgainst: number, type: 'for' | 'against') => {
    const total = votesFor + votesAgainst;
    if (total === 0) return 50;
    const value = type === 'for' ? votesFor : votesAgainst;
    return Math.round((value / total) * 100);
  };

  const totalVotesCast = proposals.reduce((acc, p) => acc + p.votesFor + p.votesAgainst, 0);

  return (
    <section id="governance" className="py-32 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Abstract Grid Elements */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-bold tracking-widest uppercase font-serif"
          >
            <Vote className="w-3.5 h-3.5" /> CDF DAO (Gouvernance)
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white font-serif mb-6"
          >
            Décidez de l'Avenir de la <span className="text-gradient-gold">Nation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto font-serif italic"
          >
            "Justice – Paix – Travail. Le CDF redéfinit la démocratie participative en permettant à chaque citoyen d'orienter les fonds de la réserve nationale."
          </motion.p>

          {/* Toggle Tabs */}
          <div className="flex justify-center mt-10">
            <div className="inline-flex p-1 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <button
                onClick={() => setActiveTab('proposals')}
                className={`px-6 py-2.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  activeTab === 'proposals'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Propositions Actives ({proposals.length})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-2.5 rounded-xl text-xs font-serif font-bold transition-all ${
                  activeTab === 'stats'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Statistiques Globales
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'proposals' ? (
            <motion.div
              key="proposals-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {proposals.map((proposal) => {
                const isVoted = votedIds.includes(proposal.id);
                const percentFor = calculatePercentage(proposal.votesFor, proposal.votesAgainst, 'for');
                const percentAgainst = calculatePercentage(proposal.votesFor, proposal.votesAgainst, 'against');

                return (
                  <motion.div
                    key={proposal.id}
                    className="glass-card rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Meta */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest font-serif">
                          {proposal.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Proposé par {proposal.proposer}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-serif text-white mb-4 leading-tight">
                        {proposal.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed font-sans mb-8">
                        {proposal.description}
                      </p>
                    </div>

                    {/* Voting Metrics / Actions */}
                    <div className="space-y-6 pt-6 border-t border-white/5">
                      {isVoted ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-green-400 text-xs font-serif font-bold justify-center bg-green-500/10 py-2 rounded-xl border border-green-500/20">
                            <CheckCircle className="w-4 h-4" /> Vote Enregistré !
                          </div>
                          
                          {/* Progress bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono text-slate-300">
                              <span>Pour ({percentFor}%)</span>
                              <span>Contre ({percentAgainst}%)</span>
                            </div>
                            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentFor}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                              />
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentAgainst}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-red-500 to-pink-600"
                              />
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                              <span>{(proposal.votesFor).toLocaleString()} Votes</span>
                              <span>{(proposal.votesAgainst).toLocaleString()} Votes</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="text-xs text-slate-500 font-serif italic text-center">
                            Vous n'avez pas encore voté sur cette proposition.
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <button
                              onClick={() => handleVote(proposal.id, 'for')}
                              className="py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-blue-900/10"
                            >
                              Pour
                            </button>
                            <button
                              onClick={() => handleVote(proposal.id, 'against')}
                              className="py-3 bg-slate-900 hover:bg-slate-800 text-white border border-white/5 hover:border-white/10 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-95"
                            >
                              Contre
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="stats-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Stat Card 1 */}
              <div className="glass-card rounded-3xl p-8 border border-white/5 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-serif uppercase tracking-widest text-slate-500 mb-2">Total des Votants</h3>
                <p className="text-4xl font-mono font-bold text-white mb-2">
                  {(totalVotesCast).toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 font-serif italic">Nombre cumulé de jetons CDF engagés dans le consensus.</p>
              </div>

              {/* Stat Card 2 */}
              <div className="glass-card rounded-3xl p-8 border border-white/5 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center text-yellow-500 mb-6">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-serif uppercase tracking-widest text-slate-500 mb-2">Taux de Participation</h3>
                <p className="text-4xl font-mono font-bold text-white mb-2">28.4%</p>
                <p className="text-xs text-slate-400 font-serif italic">En hausse constante depuis le déploiement du smart contract.</p>
              </div>

              {/* Stat Card 3 */}
              <div className="glass-card rounded-3xl p-8 border border-white/5 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-serif uppercase tracking-widest text-slate-500 mb-2">Consensus Requis</h3>
                <p className="text-4xl font-mono font-bold text-white mb-2">66.7%</p>
                <p className="text-xs text-slate-400 font-serif italic">Seuil de super-majorité pour valider les décisions budgétaires.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Informative footer */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-between p-8 bg-slate-900/40 border border-white/5 rounded-3xl backdrop-blur-md text-center sm:text-left gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-serif font-bold text-sm">Comment participer ?</h4>
              <p className="text-slate-400 text-xs">Il vous suffit d'avoir des jetons CDF dans votre portefeuille pour soumettre ou voter.</p>
            </div>
          </div>
          <a
            href="#technical"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all shrink-0"
          >
            Acheter des Jetons CDF
          </a>
        </div>
      </div>
    </section>
  );
};

export default DaoGovernance;
