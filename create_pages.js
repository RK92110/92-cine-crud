const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'app');

const pagesToCreate = [
  // Admin
  { route: 'admin/films', title: 'Gestion des Films (Backoffice)' },
  { route: 'admin/seances', title: 'Gestion des Séances' },
  { route: 'admin/salles', title: 'Gestion des Salles' },
  { route: 'admin/utilisateurs', title: 'Utilisateurs & Rôles' },
  { route: 'admin/quotients', title: 'Validation des Quotients' },
  
  // Instructeur
  { route: 'instructeur/creer-seance', title: 'Créer une Séance / Atelier' },
  { route: 'instructeur/planning', title: 'Mon Planning Instructeur' },
  
  // Animateur
  { route: 'animateur/planning', title: 'Mon Planning Animateur' },
  
  // Adhérent / Mon espace
  { route: 'mon-espace/profil', title: 'Mon Profil Complet' },
  { route: 'mon-espace/quotient', title: 'Mon Quotient Familial' },
  { route: 'mon-espace/mes-inscriptions', title: 'Mes Inscriptions' },
  { route: 'mon-espace/mes-enfants', title: 'Mes Profils Enfants' },

  // Détails dynamiques
  { route: 'seances/[id]', title: 'Détails de la Séance' },
  { route: 'films/[id]', title: 'Détails du Film' }
];

const template = (title) => `
export default function PlaceholderPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-6 tracking-widest">${title}</h1>
        <div className="bg-[#0f0f13] border border-white/10 p-8 rounded-xl shadow-2xl inline-block mt-8">
           <svg className="w-16 h-16 text-[#e8b04b] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
           </svg>
           <h2 className="text-2xl font-bold text-white mb-2">Page en construction</h2>
           <p className="text-white/60 text-sm max-w-md mx-auto">
             Cette section de 92Ciné est actuellement en cours de développement. Les fonctionnalités seront bientôt disponibles.
           </p>
           <a href="javascript:history.back()" className="mt-8 inline-block px-6 py-3 bg-[#e8b04b] text-black font-bold uppercase rounded hover:bg-[#c99538] transition">
             Retour
           </a>
        </div>
      </div>
    </div>
  );
}
`;

pagesToCreate.forEach(page => {
  const dirPath = path.join(srcDir, page.route);
  const filePath = path.join(dirPath, 'page.tsx');
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template(page.title), 'utf8');
    console.log('Created:', filePath);
  }
});

console.log('All missing pages generated successfully!');
