const API = 'https://thesimpsonsapi.com/api/characters';
const CDN = 'https://cdn.thesimpsonsapi.com/500';

const gallery = document.getElementById('gallery');
const statusEl = document.getElementById('status');
const search = document.getElementById('search');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pageInfo = document.getElementById('page-info');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

let page = 1;
let totalPages = 1;
let characters = [];

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]));

async function loadPage(n) {
  statusEl.textContent = 'Cargando...';
  gallery.innerHTML = '';
  try {
    const res = await fetch(`${API}?page=${n}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    page = n;
    totalPages = data.pages;
    characters = data.results;
    search.value = '';
    render();
  } catch (err) {
    statusEl.textContent = `No se pudo cargar: ${err.message}`;
  }
  updatePager();
}

function render() {
  const q = search.value.trim().toLowerCase();
  const list = characters.filter((c) => c.name.toLowerCase().includes(q));
  statusEl.textContent = list.length ? '' : 'Sin resultados en esta página.';
  gallery.innerHTML = list.map((c) => `
    <article class="card" data-id="${c.id}">
      <img src="${CDN}${esc(c.portrait_path)}" alt="${esc(c.name)}" loading="lazy">
      <h2>${esc(c.name)}</h2>
      <p>${esc(c.occupation || 'Sin ocupación conocida')}</p>
    </article>`).join('');
}

function updatePager() {
  pageInfo.textContent = `Página ${page} de ${totalPages}`;
  prev.disabled = page <= 1;
  next.disabled = page >= totalPages;
}

function showDetail(id) {
  const c = characters.find((x) => x.id === id);
  if (!c) return;
  const phrases = (c.phrases || []).slice(0, 8)
    .map((p) => `<li>${esc(p)}</li>`).join('');
  modalBody.innerHTML = `
    <img src="${CDN}${esc(c.portrait_path)}" alt="${esc(c.name)}">
    <h2>${esc(c.name)}</h2>
    <p><strong>Ocupación:</strong> ${esc(c.occupation || '—')}</p>
    <p><strong>Edad:</strong> ${esc(c.age ?? '—')} ·
       <strong>Género:</strong> ${esc(c.gender || '—')} ·
       <strong>Estado:</strong> ${esc(c.status || '—')}</p>
    ${phrases ? `<h3>Frases</h3><ul>${phrases}</ul>` : ''}`;
  modal.showModal();
}

prev.addEventListener('click', () => loadPage(page - 1));
next.addEventListener('click', () => loadPage(page + 1));
search.addEventListener('input', render);
gallery.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (card) showDetail(Number(card.dataset.id));
});
document.getElementById('close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });

loadPage(1);
