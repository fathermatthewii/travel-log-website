'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const citations = [
  'Aristotle. The Athenian Constitution. Translated by H. Rackham, Harvard University Press, 1935. Loeb Classical Library, no. 285.',
  'Beard, Mary. The Parthenon. Harvard University Press, 2003. Wonders of the World.',
  'Camp, John McK. The Athenian Agora: Site Guide. 5th ed., American School of Classical Studies at Athens, 2010.',
  'Easterling, P. E., editor. The Cambridge Companion to Greek Tragedy. Cambridge University Press, 1997.',
  'Finley, M. I., and H. W. Pleket. The Olympic Games: The First Thousand Years. Viking Press, 1976.',
  'Miller, Stephen G. Ancient Greek Athletics. Yale University Press, 2004.',
  'Pausanias. Description of Greece. Vol. 4, Books 8.22–10, translated by W. H. S. Jones, Harvard University Press, 1935. Loeb Classical Library, no. 297.',
  'Pickard-Cambridge, Arthur. The Dramatic Festivals of Athens. 2nd ed., Clarendon Press, 1968.',
  'Pindar. Olympian Odes. Translated by Diane Arnson Svarlien, Perseus Digital Library, 1990. Accessed 5 Nov. 2025.',
  'Plutarch. "Pericles." Lives. Vol. 3, Pericles and Fabius Maximus. Nicias and Crassus, translated by Bernadotte Perrin, Harvard University Press, 1916. Loeb Classical Library, no. 65.',
  'Scott, Michael. Delphi: A History of the Center of the Ancient World. Princeton University Press, 2014.',
  'Sophocles. Antigone. Translated by Robert Fagles, introduction and notes by Bernard Knox. The Three Theban Plays, Penguin Classics, 1984.',
]

export default function WorksCited() {
  return (
    <div className="min-h-screen bg-sand-50">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest">Back to Journey</span>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 mb-4">
              Works Cited
            </h1>
            <div className="w-24 h-px bg-sage-400 mx-auto" />
          </div>

          {/* Citations List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {citations.map((citation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="pl-8 border-l-2 border-sage-200 hover:border-sage-400 transition-colors"
              >
                <p className="text-slate-700 leading-relaxed text-lg hanging-indent">
                  {citation}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-24 text-center"
          >
            <p className="text-sm text-slate-500 tracking-wide">
              Five Days in Ancient Greece • 441 B.C.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <style jsx global>{`
        .hanging-indent {
          text-indent: -2rem;
          padding-left: 2rem;
        }
      `}</style>
    </div>
  )
}
