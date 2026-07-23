// ==========================================
// LÓGICA DE UI Y RENDERIZADO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderCategorySelectOptions();
    renderProducts();
    
    // Listeners
    document.getElementById('search-input').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderProducts();
    });

    document.getElementById('publish-form').addEventListener('submit', handlePublish);
});

function renderCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    // Botón "Todas"
    const allBtn = document.createElement('button');
    allBtn.className = `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${activeCategoryId === null ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-slate-800 text-slate-300'}`;
    allBtn.innerHTML = `<i class="ph ph-squares-four text-lg"></i> Todas las materias`;
    allBtn.onclick = () => setCategory(null);
    container.appendChild(allBtn);

    // Botones de categorías
    dbCategories.forEach(cat => {
        const btn = document.createElement('button');
        const isActive = activeCategoryId === cat.id;
        btn.className = `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left mt-1 ${isActive ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-slate-800 text-slate-300'}`;
        btn.innerHTML = `<i class="ph ${cat.icon} text-lg"></i> ${cat.name}`;
        btn.onclick = () => setCategory(cat.id, cat.name);
        container.appendChild(btn);
    });
}

function renderCategorySelectOptions() {
    const select = document.getElementById('p-category');
    dbCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        select.appendChild(option);
    });
}

function setCategory(id, name = 'Todos los Artículos') {
    activeCategoryId = id;
    document.getElementById('current-category-title').textContent = id ? `Materia: ${name}` : 'Todos los Artículos';
    renderCategories();
    renderProducts();
}

function clearFilters() {
    document.getElementById('search-input').value = '';
    searchQuery = '';
    setCategory(null);
}

function getCategoryName(id) {
    const cat = dbCategories.find(c => c.id === id);
    return cat ? cat.name : 'Desconocida';
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');
    grid.innerHTML = '';

    // Filtrar productos
    let filteredProducts = dbProducts.filter(p => {
        const matchCategory = activeCategoryId ? p.categoryId === activeCategoryId : true;
        const matchSearch = p.title.toLowerCase().includes(searchQuery);
        return matchCategory && matchSearch;
    });

    // Ordenar por más reciente
    filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (filteredProducts.length === 0) {
        grid.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        grid.classList.remove('hidden');

        filteredProducts.forEach(prod => {
            const isFree = parseFloat(prod.price) === 0;
            const priceDisplay = isFree ? '¡Gratis!' : `$${parseFloat(prod.price).toFixed(2)}`;
            const priceClass = isFree ? 'text-green-400 font-bold' : 'text-white font-bold';
            
            const catName = getCategoryName(prod.categoryId);
            const typeIcon = prod.type === 'Libro' ? 'ph-book-open' : 'ph-file-text';
            
            // Fallback image based on type and category if not provided
            const imageUrl = prod.image || `https://placehold.co/400x300/1e293b/94a3b8?text=${encodeURIComponent(prod.title.substring(0, 15))}`;

            const whatsappUrl = `https://wa.me/${prod.sellerPhone}?text=Hola!%20Me%20interesa%20tu%20publicación%20en%20ApuntesMarket:%20"${encodeURIComponent(prod.title)}"`;

            const card = document.createElement('div');
            card.className = 'bg-darkCard border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col group';
            
            card.innerHTML = `
                <!-- Imagen -->
                <div class="relative h-48 bg-slate-800 overflow-hidden">
                    <img src="${imageUrl}" alt="${prod.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.src='https://placehold.co/400x300/1e293b/94a3b8?text=Error+Imagen'">
                    <div class="absolute top-3 left-3 bg-darkCard/80 backdrop-blur text-xs px-2 py-1 rounded-md font-medium text-slate-200 border border-slate-600 flex items-center gap-1">
                        <i class="ph ${typeIcon}"></i> ${prod.type}
                    </div>
                </div>
                
                <!-- Contenido -->
                <div class="p-5 flex flex-col flex-grow">
                    <div class="text-xs text-primary font-medium mb-1">${catName}</div>
                    <h3 class="text-lg font-semibold text-white leading-tight mb-2 line-clamp-2" title="${prod.title}">${prod.title}</h3>
                    
                    <div class="mt-auto pt-4 flex items-end justify-between">
                        <div>
                            <span class="text-xs text-slate-400 block mb-0.5">Precio</span>
                            <span class="${priceClass} text-lg">${priceDisplay}</span>
                        </div>
                        
                        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" 
                           class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-green-900/20">
                            <i class="ph ph-whatsapp-logo text-lg"></i>
                            Contactar
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
}

// ==========================================
// MANEJO DE MODALES Y FORMULARIO
// ==========================================

const modal = document.getElementById('publish-modal');
const modalContent = document.getElementById('publish-modal-content');

function openPublishModal() {
    modal.classList.remove('hidden');
    // Trigger reflow for animation
    void modal.offsetWidth;
    modalContent.classList.remove('modal-exit');
    modalContent.classList.add('modal-enter-active');
    
    // Set default category if one is active
    if(activeCategoryId) {
        document.getElementById('p-category').value = activeCategoryId;
    }
}

function closePublishModal() {
    modalContent.classList.remove('modal-enter-active');
    modalContent.classList.add('modal-exit-active');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modalContent.classList.remove('modal-exit-active');
        document.getElementById('publish-form').reset();
    }, 200);
}

function handlePublish(e) {
    e.preventDefault();

    const title = document.getElementById('p-title').value;
    const price = document.getElementById('p-price').value;
    const categoryId = document.getElementById('p-category').value;
    const phone = document.getElementById('p-phone').value;
    let image = document.getElementById('p-image').value;
    const type = document.querySelector('input[name="type"]:checked').value;

    // Limpieza básica de inputs
    if(!title || !categoryId || !phone || price === '') {
        showToast('Por favor completa los campos requeridos', 'error');
        return;
    }

    // Crear nuevo producto Mock
    const newProduct = {
        id: 'prod_' + Math.random().toString(36).substr(2, 9),
        title: title,
        type: type,
        price: parseFloat(price),
        categoryId: categoryId,
        image: image,
        sellerPhone: phone,
        sellerName: currentUserMock.name,
        createdAt: new Date().toISOString()
    };

    // Simular guardado en DB
    dbProducts.unshift(newProduct);

    // Actualizar UI
    closePublishModal();
    renderProducts();
    showToast('¡Artículo publicado con éxito!');
    
    // Si estaba filtrando por otra categoría, llevarlo a "Todas" para que vea su producto
    if(activeCategoryId !== null && activeCategoryId !== categoryId) {
        setCategory(null);
    }
}

// ==========================================
// UTILIDADES (Toast)
// ==========================================

let toastTimeout;
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    toastMsg.textContent = message;
    
    if (type === 'success') {
        toastIcon.className = 'ph ph-check-circle text-green-400 text-xl';
        toast.classList.remove('border-red-500/50');
    } else {
        toastIcon.className = 'ph ph-warning-circle text-red-400 text-xl';
        toast.classList.add('border-red-500/50');
    }

    toast.classList.remove('translate-y-20', 'opacity-0');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

function renderHome() {
    clearFilters();
}
