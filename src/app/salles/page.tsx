export default function SallesPage() {
  // Données mockées pour afficher l'UI sans accès DB pour le moment
  const salles = [
    { id: 1, name: 'Salle 1 - IMAX', cinema: 'Ciné 92 Nanterre', capacity: 300, type: 'IMAX', disponible: true },
    { id: 2, name: 'Salle 2 - Standard', cinema: 'Ciné 92 Nanterre', capacity: 150, type: 'Standard', disponible: true },
    { id: 3, name: 'Salle Dolby', cinema: 'Ciné 92 Boulogne', capacity: 200, type: 'Dolby Atmos', disponible: true },
    { id: 4, name: 'Salle 4DX', cinema: 'Ciné 92 Levallois', capacity: 100, type: '4DX', disponible: true },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bebas text-[#e8b04b] mb-12 border-b border-white/10 pb-4">Nos Salles</h1>
        
        {salles.length === 0 ? (
          <div className="text-white/60 p-8 border border-white/10 bg-[#0f0f13] rounded-xl text-center">
             Aucune salle disponible pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {salles.map((salle) => (
                <div key={salle.id} className="bg-[#0f0f13] border border-white/10 rounded-xl overflow-hidden group hover:border-[#e8b04b]/50 transition">
                  <div className="h-32 bg-black/50 relative overflow-hidden flex items-center justify-center border-b border-white/10">
                    <span className="text-white/20 font-bebas text-3xl">{salle.type}</span>
                    <div className="absolute top-4 right-4 bg-white/10 text-white text-xs px-3 py-1 rounded">
                       {salle.capacity} places
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{salle.cinema}</h3>
                    <p className="text-[#e8b04b] font-bebas tracking-wide text-lg mb-4">{salle.name}</p>
                    <div className="flex items-center text-sm text-white/50">
                      <span className={`w-2 h-2 rounded-full mr-2 ${salle.disponible ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      {salle.disponible ? 'Disponible' : 'Indisponible'}
                    </div>
                  </div>
                </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
