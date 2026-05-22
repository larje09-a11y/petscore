interface Props {
  breedName: string;
  score: number;
  url: string;
}

export default function ShareButtons({ breedName, score, url }: Props) {
  const text = encodeURIComponent(
    `J'ai découvert le PetScore™ du ${breedName} : ${score}/100 🐾 Risques héréditaires et coûts vétérinaires au Québec.`,
  );
  const encodedUrl = encodeURIComponent(url);

  const buttons = [
    {
      label: 'Facebook',
      emoji: '📘',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700',
    },
    {
      label: 'X / Twitter',
      emoji: '🐦',
      href: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
      color: 'hover:bg-sky-50 hover:border-sky-200 hover:text-sky-700',
    },
    {
      label: 'WhatsApp',
      emoji: '💬',
      href: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`,
      color: 'hover:bg-green-50 hover:border-green-200 hover:text-green-700',
    },
    {
      label: 'Copier le lien',
      emoji: '🔗',
      href: null, // handled by JS
      color: 'hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700',
    },
  ];

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('copy-btn');
      if (btn) {
        btn.textContent = '✅ Copié !';
        setTimeout(() => { if (btn) btn.textContent = '🔗 Copier le lien'; }, 2000);
      }
    });
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-3 text-sm font-semibold text-gray-700">
        📤 Partager la fiche {breedName}
      </p>
      <div className="flex flex-wrap gap-2">
        {buttons.map(btn => (
          btn.href ? (
            <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all ${btn.color}`}>
              <span>{btn.emoji}</span>
              <span>{btn.label}</span>
            </a>
          ) : (
            <button key={btn.label} id="copy-btn" onClick={copyLink}
              className={`inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all ${btn.color}`}>
              <span>🔗</span>
              <span>Copier le lien</span>
            </button>
          )
        ))}
      </div>
    </div>
  );
}
