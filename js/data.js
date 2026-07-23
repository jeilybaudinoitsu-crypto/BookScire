// ==========================================
// BASE DE DATOS MOCK (Estructura Firestore)
// ==========================================

// 1. categories: Para listar y filtrar
const dbCategories = [
    { id: 'cat1', name: 'Matemáticas', slug: 'matematicas', icon: 'ph-math-operations' },
    { id: 'cat2', name: 'Programación', slug: 'programacion', icon: 'ph-code' },
    { id: 'cat3', name: 'Física', slug: 'fisica', icon: 'ph-atom' },
    { id: 'cat4', name: 'Medicina', slug: 'medicina', icon: 'ph-first-aid' },
    { id: 'cat5', name: 'Derecho', slug: 'derecho', icon: 'ph-scales' },
    { id: 'cat6', name: 'Diseño', slug: 'diseno', icon: 'ph-bezier-curve' },
    { id: 'cat7', name: 'Entretenimiento', slug: 'entretenimiento', icon: 'ph-game-controller' }
];

// 2. users: Información de perfiles (Mock)
const currentUserMock = {
    id: 'user123',
    name: 'Estudiante Anónimo',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
};

// 3. products: Publicaciones (Mock inicial)
let dbProducts = [
    {
        id: 'prod1',
        title: 'Cálculo de Stewart 8va Edición',
        type: 'Libro',
        price: 15.00,
        categoryId: 'cat1',
        image: 'https://placehold.co/400x300/1e293b/3b82f6?text=Cálculo+Stewart',
        sellerPhone: '584120000000',
        sellerName: 'Carlos M.',
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 'prod2',
        title: 'Apuntes Completos Algoritmos y Estructuras',
        type: 'Apunte',
        price: 0,
        categoryId: 'cat2',
        image: '',
        sellerPhone: '584140000000',
        sellerName: 'Ana P.',
        createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
        id: 'prod3',
        title: 'Física Universitaria Vol 1',
        type: 'Libro',
        price: 20.00,
        categoryId: 'cat3',
        image: 'https://placehold.co/400x300/1e293b/ef4444?text=Física+Univ',
        sellerPhone: '584240000000',
        sellerName: 'Luis F.',
        createdAt: new Date().toISOString()
    },
    {
        id: 'prod4',
        title: 'Guía Anatomía Práctica',
        type: 'Apunte',
        price: 5.00,
        categoryId: 'cat4',
        image: '',
        sellerPhone: '584160000000',
        sellerName: 'María G.',
        createdAt: new Date().toISOString()
    },
    {
        id: 'prod5',
        title: 'Dune - Frank Herbert',
        type: 'Libro',
        price: 12.00,
        categoryId: 'cat7',
        image: 'https://placehold.co/400x300/1e293b/f59e0b?text=Dune',
        sellerPhone: '584121234567',
        sellerName: 'Pedro P.',
        createdAt: new Date().toISOString()
    }
];

// Estado de la UI
let activeCategoryId = null;
let searchQuery = '';
