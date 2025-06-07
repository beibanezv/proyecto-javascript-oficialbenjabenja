// Datos de artículos para el blog
const articulos = [
    {
        id: 1,
        titulo: "Cuidados básicos para cachorros",
        categoria: "perros",
        fecha: "2024-06-01",
        popularidad: 95,
        imagen: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
        resumen: "Todo lo que necesitas saber para cuidar a tu nuevo cachorro desde el primer día.",
        contenido: "Los cachorros requieren cuidados especiales durante sus primeros meses de vida. Es importante establecer rutinas de alimentación, vacunación y socialización temprana para garantizar su desarrollo saludable."
    },
    {
        id: 2,
        titulo: "Alimentación saludable para gatos",
        categoria: "gatos",
        fecha: "2024-05-28",
        popularidad: 88,
        imagen: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
        resumen: "Guía completa sobre la nutrición felina y cómo elegir el mejor alimento.",
        contenido: "Una alimentación balanceada es clave para la salud de tu gato. Aprende sobre las necesidades nutricionales específicas de los felinos y cómo seleccionar alimentos de calidad."
    },
    {
        id: 3,
        titulo: "Entrenamiento básico para perros",
        categoria: "perros",
        fecha: "2024-05-25",
        popularidad: 92,
        imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
        resumen: "Técnicas efectivas para entrenar a tu perro desde casa.",
        contenido: "El entrenamiento consistente y positivo es fundamental para una buena convivencia. Descubre métodos efectivos para enseñar comandos básicos a tu perro."
    },
    {
        id: 4,
        titulo: "Cuidado de aves domésticas",
        categoria: "aves",
        fecha: "2024-05-20",
        popularidad: 75,
        imagen: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&h=300&fit=crop",
        resumen: "Tips esenciales para mantener a tus aves felices y saludables.",
        contenido: "Las aves requieren cuidados específicos incluyendo una dieta variada, espacio adecuado y estimulación mental. Aprende cómo crear el ambiente perfecto para tu ave."
    },
    {
        id: 5,
        titulo: "Acuarios: Guía para principiantes",
        categoria: "peces",
        fecha: "2024-05-15",
        popularidad: 70,
        imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
        resumen: "Cómo comenzar tu primer acuario paso a paso.",
        contenido: "Mantener peces puede ser muy gratificante. Esta guía te ayudará a configurar tu primer acuario de manera exitosa, desde la elección del tanque hasta el mantenimiento del agua."
    },
    {
        id: 6,
        titulo: "Salud dental en mascotas",
        categoria: "salud",
        fecha: "2024-05-10",
        popularidad: 85,
        imagen: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=300&fit=crop",
        resumen: "La importancia del cuidado dental para perros y gatos.",
        contenido: "La salud dental es crucial para el bienestar general de tu mascota. Aprende técnicas de limpieza y señales de alerta para mantener los dientes de tu mascota en perfecto estado."
    }
];

// Categorías de mascotas
const categorias = [
    { nombre: "Perros", icono: "🐕", cantidad: 15 },
    { nombre: "Gatos", icono: "🐱", cantidad: 12 },
    { nombre: "Aves", icono: "🐦", cantidad: 8 },
    { nombre: "Peces", icono: "🐠", cantidad: 6 }
];

// Consejos del día
const consejos = [
    "Mantén siempre agua fresca disponible para tu mascota.",
    "Los ejercicios regulares mantienen a tu mascota saludable y feliz.",
    "Visita al veterinario al menos una vez al año para chequeos.",
    "La socialización temprana es clave para el comportamiento de tu mascota.",
    "Cepilla regularmente a tu mascota para mantener su pelaje saludable.",
    "Establece rutinas consistentes para reducir el estrés de tu mascota.",
    "Los juguetes mentales ayudan a mantener activa la mente de tu mascota."
];

// Variables globales
let favoritosCount = 0;
let articulosFiltrados = [...articulos];
let articulosVisibles = 3;

// ===== FUNCIÓN 1: Inicialización del sitio =====
function inicializarSitio() {
    cargarArticulosDestacados();
    cargarCategorias();
    mostrarConsejoDelDia();
    configurarEventListeners();
    inicializarContadores();
    
    // Funciones específicas según la página
    if (document.getElementById('grid-articulos')) {
        cargarTodosLosArticulos();
    }
    
    if (document.getElementById('formulario-contacto')) {
        configurarFormularioContacto();
    }
}

// ===== FUNCIÓN 2: Validación de formularios =====
function validarFormulario(formulario) {
    let esValido = true;
    const errores = {};
    
    // Obtener todos los campos del formulario
    const campos = formulario.querySelectorAll('input[required], select[required], textarea[required]');
    
    campos.forEach(campo => {
        const valor = campo.value.trim();
        const nombre = campo.name || campo.id;
        
        // Limpiar errores previos
        const errorDiv = document.getElementById(`error-${nombre.replace('Contacto', '').replace('Completo', '').toLowerCase()}`);
        if (errorDiv) {
            errorDiv.classList.add('hidden');
            errorDiv.textContent = '';
        }
        
        // Validaciones específicas
        if (!valor) {
            errores[nombre] = 'Este campo es obligatorio';
            esValido = false;
        } else if (campo.type === 'email' && !validarEmail(valor)) {
            errores[nombre] = 'Por favor ingresa un email válido';
            esValido = false;
        } else if (nombre.includes('nombre') && valor.length < 2) {
            errores[nombre] = 'El nombre debe tener al menos 2 caracteres';
            esValido = false;
        }
    });
    
    // Mostrar errores
    Object.keys(errores).forEach(campo => {
        const errorDiv = document.getElementById(`error-${campo.replace('Contacto', '').replace('Completo', '').toLowerCase()}`);
        if (errorDiv) {
            errorDiv.textContent = errores[campo];
            errorDiv.classList.remove('hidden');
        }
    });
    
    return esValido;
}

// ===== FUNCIÓN 3: Mostrar/ocultar secciones =====
function toggleSeccion(elementoId, mostrar = null) {
    const elemento = document.getElementById(elementoId);
    if (!elemento) return;
    
    if (mostrar === null) {
        elemento.classList.toggle('hidden');
    } else if (mostrar) {
        elemento.classList.remove('hidden');
    } else {
        elemento.classList.add('hidden');
    }
}

// ===== FUNCIÓN 4: Filtrar y buscar artículos =====
function filtrarArticulos() {
    const busqueda = document.getElementById('entrada-busqueda')?.value.toLowerCase() || '';
    const categoria = document.getElementById('filtro-categoria')?.value || '';
    const orden = document.getElementById('selector-orden')?.value || 'reciente';
    
    // Filtrar artículos
    articulosFiltrados = articulos.filter(articulo => {
        const coincideBusqueda = articulo.titulo.toLowerCase().includes(busqueda) || 
                                articulo.resumen.toLowerCase().includes(busqueda);
        const coincideCategoria = !categoria || articulo.categoria === categoria;
        
        return coincideBusqueda && coincideCategoria;
    });
    
    // Ordenar artículos
    switch (orden) {
        case 'popular':
            articulosFiltrados.sort((a, b) => b.popularidad - a.popularidad);
            break;
        case 'alfabetico':
            articulosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 'categoria':
            articulosFiltrados.sort((a, b) => a.categoria.localeCompare(b.categoria));
            break;
        default: // reciente
            articulosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }
    
    // Actualizar visualización
    mostrarArticulos();
    actualizarContadorResultados();
}

// ===== FUNCIÓN 5: Cálculos dinámicos y contadores =====
function inicializarContadores() {
    const contadores = document.querySelectorAll('.elemento-contador [data-objetivo]');
    
    contadores.forEach(contador => {
        const objetivo = parseInt(contador.getAttribute('data-objetivo'));
        animarContador(contador, objetivo);
    });
}

function animarContador(elemento, objetivo) {
    let actual = 0;
    const incremento = objetivo / 100;
    const duracion = 2000; // 2 segundos
    const intervalo = duracion / 100;
    
    const timer = setInterval(() => {
        actual += incremento;
        if (actual >= objetivo) {
            actual = objetivo;
            clearInterval(timer);
        }
        elemento.textContent = Math.floor(actual);
    }, intervalo);
}

// ===== FUNCIONES AUXILIARES =====
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function cargarArticulosDestacados() {
    const container = document.getElementById('articulos-destacados');
    if (!container) return;
    
    const destacados = articulos.slice(0, 3);
    container.innerHTML = destacados.map(articulo => `
        <article class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img src="${articulo.imagen}" alt="${articulo.titulo}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center mb-2">
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">${articulo.categoria}</span>
                    <span class="text-gray-500 text-sm ml-2">${formatearFecha(articulo.fecha)}</span>
                </div>
                <h4 class="text-xl font-bold text-gray-800 mb-2">${articulo.titulo}</h4>
                <p class="text-gray-600 mb-4">${articulo.resumen}</p>
                <div class="flex justify-between items-center">
                    <button onclick="abrirModal(${articulo.id})" class="text-purple-600 hover:text-purple-800 font-semibold">
                        Leer más →
                    </button>
                    <button onclick="toggleFavorito(${articulo.id})" class="text-pink-500 hover:text-pink-700">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function cargarCategorias() {
    const container = document.getElementById('categorias-mascotas');
    if (!container) return;
    
    container.innerHTML = categorias.map(categoria => `
        <div class="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
            <div class="text-4xl mb-3">${categoria.icono}</div>
            <h4 class="text-lg font-semibold text-gray-800 mb-1">${categoria.nombre}</h4>
            <p class="text-gray-500">${categoria.cantidad} artículos</p>
        </div>
    `).join('');
}

function mostrarConsejoDelDia() {
    const consejoElemento = document.getElementById('texto-consejo');
    if (!consejoElemento) return;
    
    const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];
    consejoElemento.textContent = consejoAleatorio;
}

function cargarTodosLosArticulos() {
    const container = document.getElementById('grid-articulos');
    if (!container) return;
    
    mostrarArticulos();
}

function mostrarArticulos() {
    const container = document.getElementById('grid-articulos');
    if (!container) return;
    
    const articulosAMostrar = articulosFiltrados.slice(0, articulosVisibles);
    
    if (articulosAMostrar.length === 0) {
        toggleSeccion('sin-resultados', true);
        container.innerHTML = '';
        return;
    } else {
        toggleSeccion('sin-resultados', false);
    }
    
    container.innerHTML = articulosAMostrar.map(articulo => `
        <article class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
            <img src="${articulo.imagen}" alt="${articulo.titulo}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">${articulo.categoria}</span>
                    <span class="text-gray-500 text-sm">${formatearFecha(articulo.fecha)}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">${articulo.titulo}</h3>
                <p class="text-gray-600 mb-4">${articulo.resumen}</p>
                <div class="flex justify-between items-center">
                    <button onclick="abrirModal(${articulo.id})" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Leer Artículo
                    </button>
                    <button onclick="toggleFavorito(${articulo.id})" class="text-pink-500 hover:text-pink-700 text-xl">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function actualizarContadorResultados() {
    const contador = document.getElementById('numero-resultados');
    if (contador) {
        contador.textContent = articulosFiltrados.length;
    }
}

function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function abrirModal(articuloId) {
    const articulo = articulos.find(a => a.id === articuloId);
    if (!articulo) return;
    
    document.getElementById('titulo-modal').textContent = articulo.titulo;
    document.getElementById('contenido-modal').innerHTML = `
        <img src="${articulo.imagen}" alt="${articulo.titulo}" class="w-full h-48 object-cover rounded-lg mb-4">
        <p class="text-gray-700 leading-relaxed">${articulo.contenido}</p>
    `;
    document.getElementById('info-modal').innerHTML = `
        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mr-2">${articulo.categoria}</span>
        <span class="text-gray-500">${formatearFecha(articulo.fecha)}</span>
    `;
    
    const botonFavorito = document.getElementById('boton-favorito-modal');
    botonFavorito.onclick = () => toggleFavorito(articuloId);
    
    toggleSeccion('modal-articulo', true);
}

function toggleFavorito(articuloId) {
    favoritosCount++;
    document.getElementById('contador-favoritos').textContent = favoritosCount;
    
    // Mostrar notificación
    mostrarNotificacion('¡Artículo agregado a favoritos!', 'success');
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all transform translate-x-full ${
        tipo === 'success' ? 'bg-green-500 text-white' : 
        tipo === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notificacion.textContent = mensaje;
    
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.classList.remove('translate-x-full');
    }, 100);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.add('translate-x-full');
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    }, 3000);
}

function configurarFormularioContacto() {
    const formulario = document.getElementById('formulario-contacto');
    if (!formulario) return;
    
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormulario(formulario)) {
            // Simular envío del formulario
            const datos = new FormData(formulario);
            const nombre = datos.get('nombreCompleto');
            
            mostrarNotificacion(`¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente.`, 'success');
            formulario.reset();
        } else {
            mostrarNotificacion('Por favor, corrige los errores en el formulario.', 'error');
        }
    });
}

function configurarEventListeners() {
    // Menú móvil
    const botonMenuMovil = document.getElementById('boton-menu-movil');
    if (botonMenuMovil) {
        botonMenuMovil.addEventListener('click', () => {
            toggleSeccion('menu-movil');
        });
    }
    
    // Botón explorar (página principal)
    const botonExplorar = document.getElementById('boton-explorar');
    if (botonExplorar) {
        botonExplorar.addEventListener('click', () => {
            window.location.href = 'articulos.html';
        });
    }
    
    // Nuevo consejo
    const botonNuevoConsejo = document.getElementById('boton-nuevo-consejo');
    if (botonNuevoConsejo) {
        botonNuevoConsejo.addEventListener('click', mostrarConsejoDelDia);
    }
    
    // Newsletter
    const formularioNewsletter = document.getElementById('formulario-newsletter');
    if (formularioNewsletter) {
        formularioNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email-newsletter').value;
            const mensaje = document.getElementById('mensaje-newsletter');
            
            if (validarEmail(email)) {
                mensaje.textContent = '¡Gracias por suscribirte! Recibirás nuestros mejores consejos.';
                mensaje.className = 'mt-4 text-green-200';
                mensaje.classList.remove('hidden');
                formularioNewsletter.reset();
            } else {
                mensaje.textContent = 'Por favor, ingresa un email válido.';
                mensaje.className = 'mt-4 text-red-200';
                mensaje.classList.remove('hidden');
            }
        });
    }
    
    // Filtros de artículos
    const entradaBusqueda = document.getElementById('entrada-busqueda');
    const filtroCategoria = document.getElementById('filtro-categoria');
    const selectorOrden = document.getElementById('selector-orden');
    
    if (entradaBusqueda) {
        entradaBusqueda.addEventListener('input', filtrarArticulos);
    }
    if (filtroCategoria) {
        filtroCategoria.addEventListener('change', filtrarArticulos);
    }
    if (selectorOrden) {
        selectorOrden.addEventListener('change', filtrarArticulos);
    }
    
    // Limpiar filtros
    const botonLimpiarFiltros = document.getElementById('boton-limpiar-filtros');
    if (botonLimpiarFiltros) {
        botonLimpiarFiltros.addEventListener('click', () => {
            if (entradaBusqueda) entradaBusqueda.value = '';
            if (filtroCategoria) filtroCategoria.value = '';
            if (selectorOrden) selectorOrden.value = 'reciente';
            articulosVisibles = 3;
            filtrarArticulos();
        });
    }
    
    // Cargar más artículos
    const botonCargarMas = document.getElementById('boton-cargar-mas');
    if (botonCargarMas) {
        botonCargarMas.addEventListener('click', () => {
            articulosVisibles += 3;
            mostrarArticulos();
            
            if (articulosVisibles >= articulosFiltrados.length) {
                botonCargarMas.style.display = 'none';
            }
        });
    }
    
    // Cerrar modal
    const cerrarModal = document.getElementById('cerrar-modal');
    if (cerrarModal) {
        cerrarModal.addEventListener('click', () => {
            toggleSeccion('modal-articulo', false);
        });
    }
    
    // Cerrar modal al hacer clic fuera
    const modal = document.getElementById('modal-articulo');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                toggleSeccion('modal-articulo', false);
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarSitio);