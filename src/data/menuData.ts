import { MenuItem } from '../types';

export const RESTAURANT_IMAGES = {
  brandLogo: '/assets/aistudio/Al_Riaz_Food_Logo_a9ae0463.jpg',
  counterSign: '/assets/aistudio/Al_Riaz_Banner_b7f3c87a.jpg',
  storeFrontNight: '/assets/aistudio/Al_Riaz_Food_12f0ad7f.webp',
  royalBuffetSpread: '/assets/images/royal_buffet_spread_1794332119465.jpg',
  pizzaSpecial: '/assets/images/product_pizza_special_1794331377696.jpg',
  beefBurger: '/assets/images/product_beef_burger_1794331379289.jpg',
  bbqPlatter: '/assets/images/product_bbq_platter_1794331380474.jpg',
  crispyBroast: '/assets/images/product_crispy_broast_1794331380522.jpg',
};

export const MENU_CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'pizza', label: 'Pizzas' },
  { id: 'burger', label: 'Burgers' },
  { id: 'broast', label: 'Broast' },
  { id: 'bbq', label: 'BBQ' },
  { id: 'roll', label: 'Rolls' },
  { id: 'deals', label: 'Deals' },
  { id: 'beverages', label: 'Drinks' },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  // PIZZAS
  {
    id: 'pizza-tikka',
    name: 'Al Riaz Special Tikka Pizza',
    category: 'pizza',
    description: 'Fresh hand-tossed dough with marinated smoky chicken tikka chunks, capsicum, onions, and premium melted mozzarella cheese.',
    price: 950,
    image: RESTAURANT_IMAGES.pizzaSpecial,
    badge: 'Chef Special',
    spicyLevel: 2,
    sizes: [
      { name: 'Small (7")', priceDelta: -350 },
      { name: 'Medium (10")', priceDelta: 0 },
      { name: 'Large (13")', priceDelta: 550 },
      { name: 'Jumbo XL (16")', priceDelta: 1100 }
    ],
    isPopular: true,
    preparationTimeMinutes: 20
  },
  {
    id: 'pizza-fajita-sicilian',
    name: 'Fajita Sicilian Spicy Pizza',
    category: 'pizza',
    description: 'Spicy chicken fajita, jalapenos, sweet bell peppers, red onions, mushrooms, and double mozzarella cheese.',
    price: 1050,
    image: RESTAURANT_IMAGES.pizzaSpecial,
    badge: 'Spicy Favorite',
    spicyLevel: 3,
    sizes: [
      { name: 'Small (7")', priceDelta: -350 },
      { name: 'Medium (10")', priceDelta: 0 },
      { name: 'Large (13")', priceDelta: 550 }
    ],
    preparationTimeMinutes: 20
  },
  {
    id: 'pizza-cheese-lover',
    name: 'Cheese Lover Supreme Pizza',
    category: 'pizza',
    description: 'Loaded with a four-cheese blend of mozzarella, cheddar, and parmesan herb crust with rich tomato basil marinara sauce.',
    price: 900,
    image: RESTAURANT_IMAGES.pizzaSpecial,
    spicyLevel: 1,
    sizes: [
      { name: 'Small (7")', priceDelta: -350 },
      { name: 'Medium (10")', priceDelta: 0 },
      { name: 'Large (13")', priceDelta: 500 }
    ],
    preparationTimeMinutes: 18
  },
  {
    id: 'pizza-malai-boti',
    name: 'Creamy Malai Boti Pizza',
    category: 'pizza',
    description: 'Creamy charcoal malai boti chicken chunks with creamy garlic white base sauce, mushrooms, and mozzarella blend.',
    price: 1100,
    image: RESTAURANT_IMAGES.pizzaSpecial,
    badge: 'Creamy Crust',
    sizes: [
      { name: 'Small (7")', priceDelta: -350 },
      { name: 'Medium (10")', priceDelta: 0 },
      { name: 'Large (13")', priceDelta: 600 }
    ],
    preparationTimeMinutes: 22
  },

  // BURGERS
  {
    id: 'burger-smash-beef',
    name: 'Double Gourmet Smash Beef Burger',
    category: 'burger',
    description: 'Two pure grilled beef patties smashed on flat-top grill, melted cheddar cheese, caramelized onions, pickles, and secret house sauce in a soft brioche bun.',
    price: 680,
    image: RESTAURANT_IMAGES.beefBurger,
    badge: 'Bestseller',
    spicyLevel: 1,
    sizes: [
      { name: 'Single Patty', priceDelta: -180 },
      { name: 'Double Patty (Standard)', priceDelta: 0 },
      { name: 'Triple Monster Patty', priceDelta: 250 }
    ],
    isPopular: true,
    preparationTimeMinutes: 15
  },
  {
    id: 'burger-crispy-zinger',
    name: 'Crispy Supreme Zinger Burger',
    category: 'burger',
    description: 'Crispy deep-fried whole chicken breast fillet coated in spicy secret batter, fresh iceberg lettuce, and tangy garlic mayo sauce.',
    price: 490,
    image: RESTAURANT_IMAGES.beefBurger,
    badge: 'Hot Seller',
    spicyLevel: 2,
    sizes: [
      { name: 'Regular Zinger', priceDelta: 0 },
      { name: 'Double Cheese Zinger', priceDelta: 90 },
      { name: 'Jumbo Mighty Zinger (Double Fillet)', priceDelta: 280 }
    ],
    isPopular: true,
    preparationTimeMinutes: 15
  },
  {
    id: 'burger-grilled-chicken',
    name: 'Smokey BBQ Grilled Chicken Burger',
    category: 'burger',
    description: 'Tender charcoal-grilled chicken fillet glazed with smokey BBQ sauce, sliced cheddar cheese, tomato, and fresh crisp greens.',
    price: 450,
    image: RESTAURANT_IMAGES.beefBurger,
    spicyLevel: 1,
    preparationTimeMinutes: 15
  },
  {
    id: 'burger-club-sandwich',
    name: 'Al Riaz Triple Decker Club Sandwich',
    category: 'burger',
    description: 'Triple toasted bread layered with shredded chicken, fried egg, cheddar cheese slice, cucumber, tomato, served with crispy crinkle fries.',
    price: 480,
    image: RESTAURANT_IMAGES.beefBurger,
    preparationTimeMinutes: 15
  },

  // CRISPY BROAST
  {
    id: 'broast-quarter-chest',
    name: 'Crispy Golden Chicken Broast (Chest Piece)',
    category: 'broast',
    description: 'Juicy chicken breast piece with ultra-crispy seasoned outer skin, served with garlic mayo dip, hot crinkle-cut fries, and dinner bun.',
    price: 520,
    image: RESTAURANT_IMAGES.crispyBroast,
    badge: 'Crispy Gold',
    spicyLevel: 2,
    sizes: [
      { name: 'Regular Spicy', priceDelta: 0 },
      { name: 'Extra Hot Masala', priceDelta: 40 }
    ],
    isPopular: true,
    preparationTimeMinutes: 18
  },
  {
    id: 'broast-quarter-leg',
    name: 'Crispy Golden Chicken Broast (Leg Piece)',
    category: 'broast',
    description: 'Tender chicken leg & thigh piece fried under pressure for ultimate juiciness, served with seasoned fries, bun, and signature garlic dip.',
    price: 480,
    image: RESTAURANT_IMAGES.crispyBroast,
    spicyLevel: 2,
    isPopular: true,
    preparationTimeMinutes: 18
  },
  {
    id: 'broast-hot-wings',
    name: 'Crispy Spicy Chicken Wings (8 Pcs)',
    category: 'broast',
    description: 'Eight pieces of crunchy fried chicken wings tossed in mild chilli sauce, served with cool ranch dip.',
    price: 440,
    image: RESTAURANT_IMAGES.crispyBroast,
    spicyLevel: 3,
    preparationTimeMinutes: 14
  },

  // BBQ SPECIALTIES
  {
    id: 'bbq-mix-platter',
    name: 'Al Riaz Grand BBQ Sizzler Platter',
    category: 'bbq',
    description: 'Complete family feast: 1 Chicken Tikka piece, 4 Beef Seekh Kababs, 6 Chicken Malai Boti cubes, grilled tomatoes, green chillies, 3 hot tandoori parathas, and mint raita.',
    price: 1850,
    image: RESTAURANT_IMAGES.bbqPlatter,
    badge: 'Family Special',
    spicyLevel: 2,
    sizes: [
      { name: 'Platter for 2 Persons', priceDelta: -450 },
      { name: 'Platter for 4 Persons', priceDelta: 0 },
      { name: 'Mega Feast for 6 Persons', priceDelta: 950 }
    ],
    isPopular: true,
    preparationTimeMinutes: 25
  },
  {
    id: 'bbq-chicken-tikka-breast',
    name: 'Charcoal Chicken Tikka (Breast Piece)',
    category: 'bbq',
    description: 'Juicy chicken breast piece marinated in authentic Karachi spices and yoghurt, grilled over real red-hot wood embers. Served with onion rings and lemon.',
    price: 420,
    image: RESTAURANT_IMAGES.bbqPlatter,
    badge: 'Charcoal Smoked',
    spicyLevel: 2,
    preparationTimeMinutes: 20
  },
  {
    id: 'bbq-chicken-tikka-leg',
    name: 'Charcoal Chicken Tikka (Leg Piece)',
    category: 'bbq',
    description: 'Flavorful tender chicken leg marinated in traditional spices, char-grilled to golden perfection with smoky aroma.',
    price: 390,
    image: RESTAURANT_IMAGES.bbqPlatter,
    spicyLevel: 2,
    preparationTimeMinutes: 20
  },
  {
    id: 'bbq-beef-seekh-kabab',
    name: 'Special Beef Seekh Kabab (4 Skewers)',
    category: 'bbq',
    description: 'Finely minced seasoned beef with fresh coriander, ginger, garlic, and crushed spices, roasted on long metal skewers over embers.',
    price: 540,
    image: RESTAURANT_IMAGES.bbqPlatter,
    spicyLevel: 2,
    preparationTimeMinutes: 20
  },
  {
    id: 'bbq-chicken-malai-boti',
    name: 'Creamy Chicken Malai Boti (Plate)',
    category: 'bbq',
    description: 'Melt-in-mouth boneless chicken cubes marinated in heavy fresh cream, white pepper, and green chillies, charcoal grilled.',
    price: 650,
    image: RESTAURANT_IMAGES.bbqPlatter,
    badge: 'Kid Friendly',
    spicyLevel: 1,
    preparationTimeMinutes: 20
  },

  // PARATHA ROLLS
  {
    id: 'roll-chicken-tikka',
    name: 'Chicken Tikka Paratha Roll',
    category: 'roll',
    description: 'Charcoal grilled chicken tikka chunks wrapped inside a crispy pan-fried puri paratha with onions and tangy mint tamarind sauce.',
    price: 240,
    image: RESTAURANT_IMAGES.bbqPlatter,
    badge: 'Street Hit',
    spicyLevel: 2,
    sizes: [
      { name: 'Standard Roll', priceDelta: 0 },
      { name: 'Cheese Stuffed Roll', priceDelta: 80 },
      { name: 'Double Meat Roll', priceDelta: 110 }
    ],
    preparationTimeMinutes: 12
  },
  {
    id: 'roll-zinger-crunch',
    name: 'Crispy Zinger Mayo Roll',
    category: 'roll',
    description: 'Crispy sliced chicken zinger fillet rolled in hot layered paratha with shredded lettuce and generous garlic mayo.',
    price: 280,
    image: RESTAURANT_IMAGES.beefBurger,
    spicyLevel: 2,
    preparationTimeMinutes: 12
  },
  {
    id: 'roll-beef-kabab',
    name: 'Beef Seekh Kabab Roll',
    category: 'roll',
    description: 'Juicy charcoal beef seekh kabab rolled inside golden paratha with seasoned sliced onions and house green chutney.',
    price: 250,
    image: RESTAURANT_IMAGES.bbqPlatter,
    spicyLevel: 2,
    preparationTimeMinutes: 12
  },

  // VALUE DEALS
  {
    id: 'deal-student-combo',
    name: 'Value Deal 1: Single Crunch',
    category: 'deals',
    description: '1 Crispy Zinger Burger + 1 Regular Fries + 1 Chilled Cold Drink (345ml).',
    price: 620,
    image: RESTAURANT_IMAGES.beefBurger,
    badge: 'Best Value',
    isPopular: true,
    preparationTimeMinutes: 15
  },
  {
    id: 'deal-pizza-lovers',
    name: 'Value Deal 2: Pizza & Zinger Feast',
    category: 'deals',
    description: '1 Medium Tikka Pizza (10") + 2 Crispy Zinger Burgers + 1 Regular Fries + 1 Liter Cold Drink.',
    price: 1950,
    image: RESTAURANT_IMAGES.pizzaSpecial,
    badge: 'Save Rs. 350',
    isPopular: true,
    preparationTimeMinutes: 25
  },
  {
    id: 'deal-bbq-night',
    name: 'Value Deal 3: BBQ Night Feast',
    category: 'deals',
    description: '1 Chicken Tikka (Chest) + 2 Beef Seekh Kababs + 2 Hot Parathas + Mint Raita + 2 Cold Drinks (345ml).',
    price: 990,
    image: RESTAURANT_IMAGES.bbqPlatter,
    badge: 'Trending',
    preparationTimeMinutes: 22
  },

  // BEVERAGES
  {
    id: 'bev-cold-drink-can',
    name: 'Chilled Cold Drink (345ml)',
    category: 'beverages',
    description: 'Choice of Pepsi, 7Up, Mirinda, or Mountain Dew served ice cold.',
    price: 100,
    image: RESTAURANT_IMAGES.crispyBroast,
    sizes: [
      { name: 'Can (345ml)', priceDelta: 0 },
      { name: 'Bottle (1.5 Liter)', priceDelta: 160 }
    ],
    preparationTimeMinutes: 2
  },
  {
    id: 'bev-water',
    name: 'Mineral Water (500ml)',
    category: 'beverages',
    description: 'Purified bottled drinking water.',
    price: 60,
    image: RESTAURANT_IMAGES.crispyBroast,
    sizes: [
      { name: 'Regular (500ml)', priceDelta: 0 },
      { name: 'Large (1.5 Liter)', priceDelta: 50 }
    ],
    preparationTimeMinutes: 2
  }
];
