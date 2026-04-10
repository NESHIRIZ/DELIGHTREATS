# Delight Treats

A static web application for a homemade dessert shop built with HTML, CSS, and vanilla JavaScript.

## Features

- Browse delicious homemade treats (cakes, cupcakes, cookies, pastries)
- Add products to cart with customizable options (size, flavor, quantity)
- Save favorite products
- View order history
- Explore dessert recipes from TheMealDB API
- Responsive design with CSS animations

## Technologies Used

- HTML5
- CSS3 (Tailwind CSS framework)
- Vanilla JavaScript (ES Modules)
- External APIs: TheMealDB, Unsplash

## Getting Started

1. Open `index.html` in your web browser
2. Navigate through the site using the menu
3. Add products to cart and proceed to checkout
4. View recipes and save favorites

## Project Structure

```
├── index.html              # Home page
├── products.html           # Products listing
├── product-detail.html     # Individual product page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout form
├── orders.html            # Order history
├── favorites.html         # Favorite products
├── recipes.html           # Dessert recipes
├── signin.html            # Sign in page
├── signup.html            # Sign up page
├── css/
│   └── styles.css         # Styles and animations
├── js/
│   ├── app.js             # Main application logic
│   ├── components.js      # UI components
│   ├── products.js        # Product data
│   └── utils.js           # Utility classes and functions
└── .eslintrc.js           # ESLint configuration
```

## APIs Used

1. **TheMealDB API** - Provides dessert recipes
2. **Unsplash** - Supplies product images

## Development

To check for code errors:
```bash
npm run lint
```

To auto-fix linting issues:
```bash
npm run lint:fix
```

## Standards Compliance

This project meets the WDD Frontend Development Standards:
- Semantic HTML with proper heading hierarchy
- Valid HTML and CSS
- Accessible design with alt attributes
- Responsive layout
- Clean, organized JavaScript code
- No console output in production
- Optimized images
- Proper SEO meta tags
```

### Linting

```bash
pnpm lint
```

## Project Structure

```
app/
├── api/          # API routes (auth, etc.)
├── components/   # Reusable UI components
├── cart/         # Shopping cart page
├── checkout/     # Order checkout
├── favorites/    # Wishlist page
├── orders/       # Order history
├── products/     # Product catalog and details
├── recipes/      # Dessert recipes from API
└── ...

lib/
├── products.ts   # Product data
└── ...

types/
└── product.ts    # TypeScript interfaces
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
