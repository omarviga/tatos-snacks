import { Product, QuizQuestion } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'caramel',
    name: 'Caramel Palomitas',
    price: 4.50,
    description: 'Sweet, salty, and golden. Each kernel is hand-glazed for that perfect mahogany caramel crunch.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh8tm5YA-NxNcvGbTX3Z6wRUR0OEG3xvUfo2KInB7T6LvMQQfjCQOPUQQHAGMdgvX68uIq2ousQIxAVjqz3KC042WJjhULHWo65qzBqMDY7FUiYfE6A7oxPgBX-4s2uUMIDlsPmFrczXg3x114_-PE8WjLcGb4_hratwjWfzre-Ur_2jpQwxvgGvvXAulCqtDlhnR8EdOUet-AnOgSUUeP0EqWWd6Lm-WG74BRiQ56vibWR2sgd5OQwjuZAa1YdxU_jLGPG7imRpFf',
    category: 'individual',
    flavorNote: 'SWEET!',
    bgColorClass: 'bg-surface-container-low',
    borderHoverClass: 'hover:border-primary-container',
    badgeText: 'CARAMEL GLAZE',
    badgeBgClass: 'bg-primary-container text-on-primary-container border-tatos-dark',
    iconName: 'bakery_dining',
    iconColorClass: 'text-primary'
  },
  {
    id: 'flamin',
    name: 'Flamin\' Hot Palomitas',
    price: 4.50,
    description: 'Spicy, bold, and highly addictive. For those who live life on the very edge of the heat scale.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzrLsJ9taU8rK2ldyQgUuJJNpDJ0jJHrxqYwMMoSLDcai8AzxIcH0LgPhkEMvPu70ogaAAF49U4Ggmq-87P-df33w9CMOMWaNyfUFiP1C2lRLTXxkbsJ1jdo432PPlHP8WGP2KFWVM3XaXkW0ZkH8vQX_SVnDDWnWms6KlnP8OuAeoPvzS71EtBhVgNPx42RHa3Enc_EUGEMvOC5SJDbZ37iD5VFEZnSJn2tKqYXbb4ajzkClddZzpx0u4faygcDLv7BsjTt_-_dRR',
    category: 'individual',
    flavorNote: 'SPICY AS HELL',
    bgColorClass: 'bg-secondary-fixed',
    borderHoverClass: 'hover:border-flamin-orange',
    badgeText: 'SABOR EXPLOSIVO!',
    badgeBgClass: 'bg-flamin-orange text-white border-tatos-dark',
    iconName: 'local_fire_department',
    iconColorClass: 'text-flamin-orange'
  },
  {
    id: 'butter',
    name: 'Butter Palomitas',
    price: 4.50,
    description: 'Classic, creamy, and movie-night ready. Crafted with 100% real butter for that nostalgic soul-pop.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJUyzRKGn64DG7cJ-5ZPsGcnNTZERyykTcMZdcLE11qrGVw1xlYDUuAHkPu5xNmuQAazYtG6AjsXzflOb1qxwr_58zLdwQYgS75Az-5U2cVeZI7lATNU4dvNMnXxNyfHmxQkgARvIDLclhrWqRnLJAjKoY1-YCxkSdcAm1VcBZAtOOaOvDVsO5myhP9XCFfg2DGQ-eJx19Fn34yVeDo_S5xjUstaKNoAvOoeNwWufZSATn3Sduh5YEglOpogTPCfNOuBGQ7VC9ErKJ',
    category: 'individual',
    flavorNote: 'CLASSIC',
    bgColorClass: 'bg-surface-container-highest',
    borderHoverClass: 'hover:border-tertiary',
    badgeText: '100% REAL BUTTER',
    badgeBgClass: 'bg-butter-cream text-primary border-tatos-dark',
    iconName: 'opacity',
    iconColorClass: 'text-tertiary'
  },
  {
    id: 'party-pack',
    name: 'The Party Pack',
    price: 18.99,
    description: 'One of everything, plus two additional bags of our absolute customer favorites. The ultimate crowd-pleaser for any gathering.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQo4oI1_BQl3axSceqn5wf5KO9yLB7scyBdfS93qRQj5cZcrNOXZcgZKLZvilVMZvEtQAkuF8s8-x-5pIKc7iku1TXAALYstGuopfCvJrZJLZP1V6JbSFsjCwluI4iuHaZswynQe6Rau0ZOicIJ352KyI_-yCsSZH2xMzJSkpj_TPBL0lnwtaMQlwA6eniop3kXnAVIMCHC_qnHjgEmTe6YmEfFzVARoUibFFZqpjuGNqcD9HiHVVYVG1XBEq_b1JSN_zd8qCpFiHM', // central bag (Flamin Hot)
    category: 'bundle',
    bgColorClass: 'bg-surface-container',
    borderHoverClass: 'hover:border-primary',
    badgeText: 'POPULAR CHOICE',
    badgeBgClass: 'bg-primary-container text-on-primary-container'
  },
  {
    id: 'heat-seeker',
    name: 'The Heat Seeker',
    price: 14.99,
    description: 'For the brave at heart. Three jumbo bags of our signature Flamin\' Hot popcorn to keep the temperature burning red hot.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQo4oI1_BQl3axSceqn5wf5KO9yLB7scyBdfS93qRQj5cZcrNOXZcgZKLZvilVMZvEtQAkuF8s8-x-5pIKc7iku1TXAALYstGuopfCvJrZJLZP1V6JbSFsjCwluI4iuHaZswynQe6Rau0ZOicIJ352KyI_-yCsSZH2xMzJSkpj_TPBL0lnwtaMQlwA6eniop3kXnAVIMCHC_qnHjgEmTe6YmEfFzVARoUibFFZqpjuGNqcD9HiHVVYVG1XBEq_b1JSN_zd8qCpFiHM',
    category: 'bundle',
    bgColorClass: 'bg-surface-container',
    borderHoverClass: 'hover:border-flamin-orange',
    badgeText: 'SPICY BUNDLE',
    badgeBgClass: 'bg-secondary-container text-on-secondary-container'
  },
  {
    id: 'sweet-salty',
    name: 'The Sweet & Salty Duo',
    price: 15.99,
    description: 'The perfect sensory balance. Two bags of hand-glazed Caramel and two bags of rich Butter for the ultimate cinematic movie night.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJlY99b283g9GEQ263m3eJl-Ii0lFIU266qi3PTUJgN2gm49waXRyBBOHUbJSU-ZAaJU7grqR63x0csYb50QQGq32597PVaZBQOyMGZlTtuEL4rc4Yh2WQqVwArQynaNqsogxB_OD9sXjV6hbLEOdd_vBi0q7bjFIJikcqdHB7e17slvbqWXB8x3YLOFTS38kvgaXdERDmqnYiNqyacevxj_6CR1lyTavYVbbkm-xYp3iNAgyy97xC8oi6LgdsmJ_PKrjhMUj6hUXA',
    category: 'bundle',
    bgColorClass: 'bg-surface-container',
    borderHoverClass: 'hover:border-tertiary',
    badgeText: 'BEST VALUE',
    badgeBgClass: 'bg-butter-cream text-primary'
  }
];

export const TESTIMONIALS = [
  {
    handle: '@CrunchyKate',
    quote: 'Best movie night ever! 🍿🔥 Flamin Hot brings the fire, and my friends literally fought over the bag!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDb086pVV5U7W5a-Ipc-NNXouhAXlYRdVyhwNq5tspHDuzsUlErR_BoY_KnUSeob9NDuttbrFXxp9Lt9kql7Cw7qcmipBZ1gNTRevUbTz7t2HfNi9_U2D8X-z-n--OVjJcHh7EvF0f1oYE90eWWFKjPiTwPkFJWagr6pUeImVFLljS3d7kw_-CkX_rUZPrCalOXP2n-XW8_g0SRVS8mGSRJKSGLiJ-PPmHHmL9Yy4P41AR_1VGQ1HQqxJkIafJZw8bn1prBrlsq033'
  },
  {
    handle: '@FilmFanatic_',
    quote: 'The Caramel glaze is absolute perfection. Golden, crispy, and doesn\'t stick to your teeth. Unbelievable!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDZatJQ56Zikl_mGa07LMQs78gETNDpZbKO_4beskkFaM1wUw2BIsjzfGBxN2mImb0GxSdjIV_gsoe0VtMJRO5BYgpdSkpphoWBi2_f3WSRd0q-6A4jzqSgoJszmoc9FL5_xS50GQ2uyJkgsFGdpKwU6pKtFsFFOtrVesrjGPd1DQjvL4W_NZQbfLo8oWT5agtOXjKNC3q_wUiROrOsz53blSbjR0X5T8XSpCNR0d-ddx9ZnZ9SQc9HVeZ6YfimmsV9yi8EDwbmtvX'
  },
  {
    handle: '@HealthyIsh',
    quote: 'Butter flavor is suspiciously good. Feels completely rich and sinful but leaves you wanting another bag.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGEkrxlGmXzvrOZr4YzaXRTfKpN7yzljIyIfRijohIi6oGXQeAB-Zs0B11xJT8I68FNQlEs5qGp2oBZV45x5nUR8WlIH9APzyvFngH57m9_nByaA-VLTTafh28UKurXEPpFKZ2rSKGuxCj4X_ifUxyKHJFj2Qn9zaf7xh2-UP0nIM7jBiqYP6seC5mbNSQhOflmhZi1bGPZzxz4KZUOXB3mDssJ7keAEAMepN1mVk4ECucOX3cQzCGVqLqhuVdeasbm00eS7hoaWQV'
  },
  {
    handle: '@SpiceLord',
    quote: 'Finally, a Flamin\' Hot snack that delivers genuine punch and heat. The spice layers build and pop!',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuXMNBWCxgvNGL_KoMUdBE8Qp-Jmf54qURyecvjE64X7o2RaPvvSxpC-nBTpFMh_6H5kkMteluZOgx7GlLQGqthDtCT3V6waFexSVhNI1y9RxOSMjVr7_9XTzS7k7taMzdQGd-YvK768XGh4YS5gIUnhLhCzTGVVmFC30gkud9E_YuxNOEmQ1iVDow4BrOYPZ9XtSMCgr0c01aV9x28lzCArbIR9tx5zQCWZ0ckr2g01kwVgxr7gmCQGLrcSQFiU5oy3NEWzRsI2lH'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Choose your ideal movie night environment:',
    options: [
      { text: 'A cozy blanket with a warm herbal tea', score: { butter: 3, caramel: 1, flamin: 0 } },
      { text: 'Under the stars, campfire roar, playing folk music', score: { caramel: 3, butter: 1, flamin: 0 } },
      { text: 'A wild, neon-lit room with pulse-pounding surround sound', score: { flamin: 3, caramel: 0, butter: 1 } }
    ]
  },
  {
    id: 2,
    question: 'How do you handle direct feedback context?',
    options: [
      { text: 'Soft, creamy, smooth, polite, and reassuring', score: { butter: 3, caramel: 1, flamin: 0 } },
      { text: 'Direct, explosive, sharp, and brutally honest', score: { flamin: 3, butter: 0, caramel: 1 } },
      { text: 'Rich, layered, sweet, and wonderfully delightful', score: { caramel: 3, flamin: 1, butter: 1 } }
    ]
  },
  {
    id: 3,
    question: 'Your favorite sensory visual texture is:',
    options: [
      { text: 'Silky dripping gold structures & glowing ambers', score: { caramel: 3, butter: 1, flamin: 0 } },
      { text: 'Crackling electric fire embers and crimson sparks', score: { flamin: 3, caramel: 0, butter: 0 } },
      { text: 'Warm, soft, fluffy, pillow-like velvet clouds', score: { butter: 3, caramel: 1, flamin: 1 } }
    ]
  }
];
