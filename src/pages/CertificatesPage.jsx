import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { LESSONS } from '../data/lessons';
import PageWrapper from '../components/layout/PageWrapper';
import { FiLock, FiAward, FiPrinter, FiX, FiCheck } from 'react-icons/fi';

const CERT_CRITERIA = [
  {
    id: 'cert_beginner',
    title: 'Python Foundations Certificate',
    description: 'Awarded upon finishing all Beginner lessons.',
    icon: '🌱',
    check: (completedLessons, level) => {
      const beginnerIds = LESSONS.filter(l => l.pathId === 'beginner').map(l => l.id);
      return beginnerIds.length > 0 && beginnerIds.every(id => completedLessons.includes(id));
    },
    criteriaText: 'Complete all 7 Beginner lessons.'
  },
  {
    id: 'cert_intermediate',
    title: 'Intermediate Python Certificate',
    description: 'Awarded upon finishing all Intermediate lessons.',
    icon: '🚀',
    check: (completedLessons, level) => {
      const intermediateIds = LESSONS.filter(l => l.pathId === 'intermediate').map(l => l.id);
      return intermediateIds.length > 0 && intermediateIds.every(id => completedLessons.includes(id));
    },
    criteriaText: 'Complete all 7 Intermediate lessons.'
  },
  {
    id: 'cert_advanced',
    title: 'Advanced Python Certificate',
    description: 'Awarded upon finishing all Advanced lessons.',
    icon: '⚡',
    check: (completedLessons, level) => {
      const advancedIds = LESSONS.filter(l => l.pathId === 'advanced').map(l => l.id);
      return advancedIds.length > 0 && advancedIds.every(id => completedLessons.includes(id));
    },
    criteriaText: 'Complete all 8 Advanced lessons.'
  },
  {
    id: 'cert_legend',
    title: 'CreoLab Python Legend',
    description: 'Awarded to master coders reaching Level 15.',
    icon: '🏆',
    check: (completedLessons, level) => level >= 15,
    criteriaText: 'Reach Level 15 on the platform.'
  }
];

export default function CertificatesPage() {
  const { user } = useAuth();
  const { state: gameState } = useGame();
  const [selectedCert, setSelectedCert] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageWrapper className="flex flex-col gap-8 pb-16 text-left print:p-0">
      {/* Header (hidden during print) */}
      <div className="text-left print:hidden">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          🏅 Python Certifications
        </h2>
        <p className="text-text-secondary mt-1">
          Complete courses and master objectives to claim custom official student certificates.
        </p>
      </div>

      {/* Grid of Certs (hidden during print) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:hidden">
        {CERT_CRITERIA.map((cert) => {
          const isUnlocked = cert.check(gameState.completedLessons, gameState.level);
          return (
            <div
              key={cert.id}
              className={`stat-card flex flex-col justify-between gap-6 relative overflow-hidden ${
                isUnlocked
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-border-color bg-bg-secondary/40'
              }`}
            >
              <div className="flex gap-4 items-start">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md ${
                  isUnlocked ? 'bg-emerald-500 text-white' : 'bg-bg-secondary text-text-muted border border-border-color'
                }`}>
                  {isUnlocked ? cert.icon : <FiLock />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-primary">{cert.title}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{cert.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border-color/50 pt-4 mt-2">
                {isUnlocked ? (
                  <>
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                      <FiCheck /> Unlocked
                    </span>
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="btn-primary py-2 px-5 text-xs rounded-xl font-bold flex items-center gap-1.5"
                    >
                      <FiAward /> View Certificate
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-text-muted italic">{cert.criteriaText}</span>
                    <span className="text-xs font-bold text-red-500 flex items-center gap-1 bg-red-500/10 px-2.5 py-1 rounded-full">
                      <FiLock size={12} /> Locked
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Printable Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md print:static print:bg-white print:p-0">
          <div className="relative w-full max-w-3xl bg-white border-8 border-amber-600/40 p-10 text-center shadow-2xl text-slate-800 rounded-2xl print:border-none print:shadow-none print:p-0 print:rounded-none select-none flex flex-col gap-6">
            {/* Close Button (hidden during print) */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none print:hidden"
            >
              <FiX size={20} />
            </button>

            {/* Certificate Branding */}
            <div>
              <p className="font-serif tracking-widest text-xs uppercase text-amber-700 font-bold">
                Official Certification of Achievement
              </p>
              <h3 className="font-serif font-black text-3xl text-slate-900 mt-2">
                CreoLabPyLearn Academy
              </h3>
              <div className="w-24 h-0.5 bg-amber-600/40 mx-auto mt-3" />
            </div>

            {/* Student Name */}
            <div className="my-2">
              <p className="text-sm font-sans italic text-slate-500">This certifies that</p>
              <h4 className="font-serif font-bold text-4xl text-slate-800 underline decoration-amber-600/50 underline-offset-8 mt-2">
                {user?.username || 'CreoLab Learner'}
              </h4>
            </div>

            {/* Achievement Text */}
            <p className="text-sm font-sans leading-relaxed text-slate-600 max-w-xl mx-auto">
              has successfully completed all milestones and course requirements to obtain the official title of
              <br />
              <strong className="text-lg text-amber-800 block mt-2 font-serif font-black">
                {selectedCert.title}
              </strong>
            </p>

            <p className="text-xs font-mono text-slate-400 mt-2">
              Certification ID: CLP-{selectedCert.id.toUpperCase()}-{Date.now().toString().slice(-6)}
            </p>

            {/* Stamp and Signatures */}
            <div className="flex justify-around items-center mt-6 border-t border-slate-100 pt-6">
              <div className="text-center font-serif">
                <div className="w-24 h-0.5 bg-slate-300 mx-auto" />
                <p className="text-[10px] text-slate-500 font-bold mt-1">Guido van Rossum</p>
                <p className="text-[8px] text-slate-400">Honorary Mentor</p>
              </div>

              {/* Gold seal */}
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border-4 border-amber-500 flex items-center justify-center text-amber-600 font-serif font-black text-base shadow-md select-none transform rotate-12">
                SEAL
              </div>

              <div className="text-center font-serif">
                <div className="w-24 h-0.5 bg-slate-300 mx-auto" />
                <p className="text-[10px] text-slate-500 font-bold mt-1">CreoLab Board</p>
                <p className="text-[8px] text-slate-400">Verify Certification</p>
              </div>
            </div>

            {/* Action buttons (hidden during print) */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-6 mt-4 print:hidden">
              <button
                onClick={() => setSelectedCert(null)}
                className="py-2 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="py-2 px-5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5"
              >
                <FiPrinter /> Print Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
