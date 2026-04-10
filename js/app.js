const STORAGE_KEYS = {
  cart: 'delight-treats-cart',
  favorites: 'delight-treats-favorites',
  orders: 'delight-treats-orders',
};

const PRODUCTS = [
  {
    id: '1',
    name: 'Vanilla Dream Cake',
    category: 'Cake',
    price: 32.0,
    description: 'Light vanilla sponge layered with creamy frosting and fresh berries.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    name: 'Salted Caramel Cupcake',
    category: 'Cupcake',
    price: 8.5,
    description: 'Rich caramel buttercream crowned with a sprinkle of sea salt.',
    image: 'https://images.unsplash.com/photo-1587080453948-2bd146f86f3f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    name: 'Chocolate Chip Cookies',
    category: 'Cookie',
    price: 6.0,
    description: 'Golden-baked cookies with gooey chocolate melting in every bite.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '4',
    name: 'Berry Tart Trio',
    category: 'Pastry',
    price: 26.0,
    description: 'A crisp, buttery shell filled with pastry cream and seasonal berries.',
    image: 'https://images.unsplash.com/photo-1535920527894-b8757b77b018?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '5',
    name: 'Espresso Cheesecake',
    category: 'Cheesecake',
    price: 34.0,
    description: 'Creamy coffee cheesecake with a crisp graham crust and mocha glaze.',
    image: 'https://images.unsplash.com/photo-1611871437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '6',
    name: 'Raspberry Macarons',
    category: 'Macaron',
    price: 16.0,
    description: 'Delicate almond shells filled with raspberry cream for a bright finish.',
    image: 'https://images.unsplash.com/photo-1569718212ef6c0f1cbab1ab7be06eaf6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '7',
    name: 'Lemon Meringue Pie',
    category: 'Pie',
    price: 28.0,
    description: 'Tangy lemon curd topped with toasted meringue on a tender crust.',
    image: 'https://images.unsplash.com/photo-1626082897917-2d5b1c6f6e44?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '8',
    name: 'Chocolate Ganache Brownie',
    category: 'Brownie',
    price: 10.0,
    description: 'Decadent fudge brownie finished with silky dark chocolate ganache.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1200&q=80',
  },
];

const RECIPE_FALLBACK = [
  {
    title: 'Strawberry Shortcake Delight',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80',
    url: 'https://www.themealdb.com',
  },
  {
    title: 'Decadent Chocolate Mousse',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    url: 'https://www.themealdb.com',
  },
  {
    title: 'Lemon Raspberry Tart',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1563805042-7684f7a11dc6?auto=format&fit=crop&w=1200&q=80',
    url: 'https://www.themealdb.com',
  },
];

function getCurrentPage() {
  const raw = window.location.pathname;
  const filename = raw.substring(raw.lastIndexOf('/') + 1) || 'index.html';
  return filename.toLowerCase();
}

function loadStore(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCart() {
  return loadStore(STORAGE_KEYS.cart);
}

function getFavorites() {
  return loadStore(STORAGE_KEYS.favorites);
}

function getOrders() {
  const orders = loadStore(STORAGE_KEYS.orders);
  return Array.isArray(orders) ? orders : [];
}

function updateCartBadge() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);
  const badge = document.querySelector('#cart-count');
  if (badge) badge.textContent = count;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2400);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function createNavLink(title, href) {
  const nav = document.createElement('a');
  nav.href = href;
  nav.textContent = title;
  return nav;
}

function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const current = getCurrentPage();
  const navItems = [
    { title: 'Home', href: 'index.html' },
    { title: 'Products', href: 'products.html' },
    { title: 'Recipes', href: 'recipes.html' },
    { title: 'Favorites', href: 'favorites.html' },
    { title: 'Orders', href: 'orders.html' },
  ];

  header.innerHTML = `
    <header>
      <div class="site-nav">
        <a class="brand" href="index.html"><span>D</span>Delight Treats</a>
        <nav></nav>
        <div class="header-actions">
          <a href="cart.html" class="btn btn-secondary" style="padding:0.85rem 1rem;">Cart <span id="cart-count" class="badge">0</span></a>
          <a href="signin.html" class="btn btn-secondary" style="padding:0.85rem 1rem;">Sign In</a>
        </div>
      </div>
    </header>
  `;

  const nav = header.querySelector('nav');
  if (!nav) return;

  navItems.forEach(link => {
    const anchor = createNavLink(link.title, link.href);
    if (current === link.href || (current === '' && link.href === 'index.html')) {
      anchor.classList.add('active');
    }
    nav.appendChild(anchor);
  });
}

function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer-content">
      <div class="grid" style="gap:1.5rem;">
        <div>
          <h2 style="margin:0 0 0.5rem;font-size:1.2rem;">Delight Treats</h2>
          <p>Handcrafted desserts made with premium ingredients, delivered with love.</p>
        </div>
        <div>
          <p style="margin:0 0 0.5rem;font-weight:700;">Quick Links</p>
          <p style="margin:0.35rem 0;"><a href="index.html">Home</a> · <a href="products.html">Products</a> · <a href="recipes.html">Recipes</a></p>
          <p style="margin:0.35rem 0;"><a href="favorites.html">Favorites</a> · <a href="cart.html">Cart</a> · <a href="orders.html">Orders</a></p>
        </div>
      </div>
      <p style="margin-top:1.5rem; color: #6b7280; font-size:0.95rem;">&copy; ${new Date().getFullYear()} Delight Treats. Crafted for every sweet moment.</p>
    </footer>
  `;
}

function makeCard(product) {
  return `
    <article class="card">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="card-body">
        <p class="text-gray-600" style="margin:0 0 0.35rem;font-size:0.95rem;">${product.category}</p>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-text">${product.description}</p>
        <div class="card-meta">
          <strong>${formatCurrency(product.price)}</strong>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <a class="btn btn-secondary" href="product-detail.html?id=${product.id}" style="font-size:0.95rem;">View</a>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}" type="button">Add to Cart</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderCards(containerId, list, emptyMessage) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `<p class="text-center" style="color:var(--text-soft);">${emptyMessage}</p>`;
    return;
  }
  container.innerHTML = list.map(makeCard).join('');
  container.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.id);
    });
  });
}

function addToCart(productId) {
  const cart = getCart();
  const product = PRODUCTS.find(item => item.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveStore(STORAGE_KEYS.cart, cart);
  updateCartBadge();
  showToast(`${product.name} added to cart.`);
}

function toggleFavorite(productId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);
  if (index === -1) {
    favorites.push(productId);
    saveStore(STORAGE_KEYS.favorites, favorites);
    showToast('Added to favorites.');
  } else {
    favorites.splice(index, 1);
    saveStore(STORAGE_KEYS.favorites, favorites);
    showToast('Removed from favorites.');
  }
  updateCartBadge();
  if (getCurrentPage() === 'favorites.html') {
    initFavorites();
  }
}

function renderFavoritesList() {
  const favorites = getFavorites();
  const list = PRODUCTS.filter(product => favorites.includes(product.id));
  const container = document.getElementById('favorites-grid');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `<p class="text-center" style="color:var(--text-soft);">No favorites yet. Browse products and tap the heart icon to save the ones you love.</p>`;
    return;
  }
  container.innerHTML = list.map(product => `
    <article class="card">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="card-body">
        <p class="text-gray-600" style="margin:0 0 0.35rem;font-size:0.95rem;">${product.category}</p>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-text">${product.description}</p>
        <div class="card-meta">
          <strong>${formatCurrency(product.price)}</strong>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <a class="btn btn-secondary" href="product-detail.html?id=${product.id}" style="font-size:0.95rem;">View</a>
            <button class="btn btn-primary" type="button" data-id="${product.id}">Remove</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');
  container.querySelectorAll('button[data-id]').forEach(button => {
    button.addEventListener('click', () => toggleFavorite(button.dataset.id));
  });
}

function renderCartPage() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  const cart = getCart();
  if (!cart.length) {
    container.innerHTML = `<p class="text-center" style="color:var(--text-soft);">Your cart is empty. Explore our products to start shopping.</p>`;
    document.getElementById('cart-total').textContent = formatCurrency(0);
    return;
  }

  const rows = cart.map(item => {
    const product = PRODUCTS.find(product => product.id === item.id);
    return product ? `
      <article class="card" style="display:grid; gap:1rem; grid-template-columns: 1fr;">
        <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
          <img src="${product.image}" alt="${product.name}" style="width:120px; height:120px; object-fit:cover; border-radius:1rem;" />
          <div style="flex:1; min-width:180px;">
            <p class="text-gray-600" style="margin:0 0 0.25rem;">${product.category}</p>
            <h3 class="card-title" style="margin:0 0 0.4rem; font-size:1.2rem;">${product.name}</h3>
            <p style="margin:0;color:var(--text-soft);">${product.description}</p>
          </div>
        </div>
        <div class="flex items-center justify-between" style="gap:1rem;">
          <p style="margin:0; font-weight:700;">${formatCurrency(product.price * item.quantity)}</p>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="btn btn-secondary" type="button" data-action="decrease" data-id="${product.id}">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-secondary" type="button" data-action="increase" data-id="${product.id}">+</button>
            <button class="btn btn-secondary" type="button" data-action="remove" data-id="${product.id}">Remove</button>
          </div>
        </div>
      </article>
    ` : '';
  }).join('');

  container.innerHTML = rows;

  container.querySelectorAll('button[data-action]').forEach(button => {
    const action = button.dataset.action;
    const id = button.dataset.id;
    button.addEventListener('click', () => updateCartItem(id, action));
  });

  const total = cart.reduce((sum, item) => {
    const product = PRODUCTS.find(prod => prod.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  document.getElementById('cart-total').textContent = formatCurrency(total);
}

function updateCartItem(productId, action) {
  const cart = getCart();
  const item = cart.find(entry => entry.id === productId);
  if (!item) return;

  if (action === 'increase') {
    item.quantity += 1;
  }
  if (action === 'decrease') {
    item.quantity = Math.max(1, item.quantity - 1);
  }
  if (action === 'remove') {
    const index = cart.findIndex(entry => entry.id === productId);
    cart.splice(index, 1);
  }

  saveStore(STORAGE_KEYS.cart, cart);
  updateCartBadge();
  renderCartPage();
}

function renderProductsPage() {
  renderCards('products-grid', PRODUCTS, 'No products available right now. Please check back later.');
}

function renderHomePage() {
  const featured = PRODUCTS.slice(0, 6);
  renderCards('featured-products', featured, 'No featured treats available at the moment.');
}

function renderProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');
  const container = document.getElementById('product-detail');
  if (!container) return;

  const product = PRODUCTS.find(item => item.id === productId);
  if (!product) {
    container.innerHTML = `<div class="text-center" style="width:100%;"><p style="color:var(--text-soft);">Product not found. <a href="products.html">Back to products</a>.</p></div>`;
    return;
  }

  const details = `
    <div class="card" style="overflow:visible;">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div>
      <p class="text-gray-600" style="margin:0 0 0.75rem;font-size:0.95rem;">${product.category}</p>
      <h1 class="text-4xl" style="margin:0 0 1rem;">${product.name}</h1>
      <p class="text-gray-700" style="margin:0 0 1.5rem; font-size:1.05rem; line-height:1.8;">${product.description}</p>
      <p style="font-size:1.3rem; font-weight:700; margin:0 0 1.25rem;">${formatCurrency(product.price)}</p>
      <div style="display:flex; flex-wrap:wrap; gap:1rem;">
        <button id="detail-add-button" class="btn btn-primary" type="button">Add to Cart</button>
        <button id="detail-favorite-button" class="btn btn-secondary" type="button">Save Favorite</button>
      </div>
    </div>
  `;

  container.innerHTML = details;
  document.getElementById('detail-add-button')?.addEventListener('click', () => addToCart(productId));
  document.getElementById('detail-favorite-button')?.addEventListener('click', () => toggleFavorite(productId));
}

function renderOrdersPage() {
  const container = document.getElementById('orders-list');
  if (!container) return;
  const orders = getOrders();
  if (!orders.length) {
    container.innerHTML = `<p class="text-center" style="color:var(--text-soft);">No orders yet. Place an order to see it here.</p>`;
    return;
  }

  container.innerHTML = orders.map(order => {
    const items = Array.isArray(order.items) ? order.items : [];
    const itemMarkup = items.length
      ? items.map(item => {
          const product = PRODUCTS.find(prod => prod.id === item.id);
          const quantity = Number(item.quantity) || 0;
          return `<div style="display:flex; justify-content:space-between; gap:1rem;"><span>${product ? product.name : 'Unknown item'} × ${quantity}</span><strong>${formatCurrency((product ? product.price : 0) * quantity)}</strong></div>`;
        }).join('')
      : '<p style="margin:0;color:var(--text-soft);">No order items available.</p>';

    return `
      <article class="card">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div>
            <p style="margin:0;color:var(--text-soft);">Order ID: ${order.id}</p>
            <h3 style="margin:0.5rem 0 0;font-size:1.2rem;">${order.name}</h3>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700;">${formatCurrency(order.total || 0)}</div>
            <p style="margin:0;color:var(--text-soft);font-size:0.95rem;">${new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div style="margin-top:1rem; display:grid; gap:0.75rem;">
          ${itemMarkup}
        </div>
      </article>
    `;
  }).join('');
}

function renderRecipesPage() {
  const container = document.getElementById('recipes-grid');
  if (!container) return;

  container.innerHTML = `<p class="text-center" style="color:var(--text-soft);">Loading recipes...</p>`;

  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=dessert')
    .then(response => response.json())
    .then(data => {
      const recipes = (data?.meals || []).slice(0, 6).map(meal => ({
        title: meal.strMeal,
        category: meal.strCategory || 'Dessert',
        image: meal.strMealThumb,
        url: meal.strSource || `https://www.themealdb.com/meal.php?c=${meal.idMeal}`,
      }));

      if (!recipes.length) {
        throw new Error('No recipes returned.');
      }
      renderRecipeCards(recipes);
    })
    .catch(() => {
      renderRecipeCards(RECIPE_FALLBACK);
    });
}

function renderRecipeCards(list) {
  const container = document.getElementById('recipes-grid');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = `<p class="text-center" style="color:var(--text-soft);">Could not load recipes. Please refresh or try again later.</p>`;
    return;
  }

  container.innerHTML = list.map(recipe => `
    <article class="card">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="card-body">
        <p class="text-gray-600" style="margin:0 0 0.35rem;font-size:0.95rem;">${recipe.category}</p>
        <h3 class="card-title">${recipe.title}</h3>
        <div style="margin-top:1rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
          <a class="btn btn-primary" href="${recipe.url}" target="_blank" rel="noopener noreferrer">View Recipe</a>
        </div>
      </div>
    </article>
  `).join('');
}

function renderCheckoutPage() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const cart = getCart();
    if (!cart.length) {
      showToast('Your cart is empty. Add items before checkout.');
      return;
    }

    const data = new FormData(form);
    const order = {
      id: `ORD-${Date.now()}`,
      name: data.get('name') || 'Guest',
      email: data.get('email') || '',
      phone: data.get('phone') || '',
      address: data.get('address') || '',
      date: new Date().toISOString(),
      total: cart.reduce((sum, item) => {
        const product = PRODUCTS.find(prod => prod.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0),
      items: cart,
    };

    const orders = getOrders();
    orders.unshift(order);
    saveStore(STORAGE_KEYS.orders, orders);
    saveStore(STORAGE_KEYS.cart, []);
    updateCartBadge();
    showToast('Order placed successfully! Redirecting to order history...');
    form.reset();
    setTimeout(() => {
      window.location.href = 'orders.html';
    }, 900);
  });
}

function renderAuthPages() {
  const page = getCurrentPage();
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const action = page === 'signin.html' ? 'signed in' : 'registered';
    showToast(`Successfully ${action}.`);
    if (page === 'signin.html') {
      window.location.href = 'index.html';
    } else {
      window.location.href = 'signin.html';
    }
  });
}

function initPage() {
  const page = getCurrentPage();
  updateCartBadge();

  switch (page) {
    case 'index.html':
    case '':
      renderHomePage();
      break;
    case 'products.html':
      renderProductsPage();
      break;
    case 'product-detail.html':
      renderProductDetailPage();
      break;
    case 'cart.html':
      renderCartPage();
      break;
    case 'checkout.html':
      renderCheckoutPage();
      break;
    case 'orders.html':
      renderOrdersPage();
      break;
    case 'favorites.html':
      renderFavoritesList();
      break;
    case 'recipes.html':
      renderRecipesPage();
      break;
    case 'signin.html':
    case 'signup.html':
      renderAuthPages();
      break;
    default:
      break;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  updateCartBadge();
  initPage();
});
