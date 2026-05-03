const express = require('express');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const app = express();
const DATA_FILE = path.join(__dirname, 'data', 'restaurants.json');
const PORT = process.env.PORT || 3000;

const SEED_DATA = {
  restaurants: [
    {
      id: randomUUID(),
      name: 'Udon Yasan',
      address: '186 Bourke St, Melbourne VIC 3000',
      deal: 'Cheap and Tasty: Hot noodles, curry and rice bowls starting from $6.90 and all about or around $10.',
      cuisine: 'Japanese',
      lat: -37.814,
      lng: 144.9689,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'The Joint Bar',
      address: 'Level 1/35 Elizabeth St, Melbourne VIC 3000',
      deal: 'Bottomless Baos: $45pp for 90 minutes of fluffy, Asian-fusion bottomless baos + free-flowing cocktails and juicy sides.',
      cuisine: 'Asian',
      lat: -37.8101,
      lng: 144.9637,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Rice Paper Scissors CBD',
      address: '15 Hardware Ln, Melbourne VIC 3000',
      deal: 'Express Lunch: $49pp 4 dish express lunch banquet — be in and out within an hour.',
      cuisine: 'Vietnamese',
      lat: -37.8128,
      lng: 144.9626,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Tokui Sushi',
      address: '260 Lonsdale St, Melbourne VIC 3000',
      deal: '$3 Sushi Rolls: $3 sushi rolls always. Best spot in the CBD.',
      cuisine: 'Japanese',
      lat: -37.8111,
      lng: 144.9675,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: "Father's Office",
      address: '249 Little Lonsdale Street, Melbourne VIC 3000',
      deal: "Lunch Specials: $28 lunch with FREE schooner, beer, cider or wine. Menu includes steak, burgers, schnitzels, fish n' chips + salad.",
      cuisine: 'Pub',
      lat: -37.8121,
      lng: 144.9674,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Rice Workshop Chinatown',
      address: '238 Little Bourke St, Melbourne VIC 3000',
      deal: 'Always Cheap Japanese: Cheap Japanese rice bowls from $15.50',
      cuisine: 'Japanese',
      lat: -37.8127,
      lng: 144.9677,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Bali Hai Thai',
      address: 'Shop 2, 32 Bourke St, Melbourne VIC 3000',
      deal: 'Endless Bao + Fried Chicken: $45pp endless bao buns and fried chicken for 90 minutes.',
      cuisine: 'Thai',
      lat: -37.8141,
      lng: 144.9604,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Goldilocks Rooftop Bar',
      address: '264 Swanston Street, Melbourne VIC 3000',
      deal: 'Three Bears Boozy Brunch: $79pp for 2 hours of free-flowing beer, cider, wine & cocktails paired with Asian-inspired bites.',
      cuisine: 'Bar',
      lat: -37.8113,
      lng: 144.9664,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Taxi Kitchen',
      address: 'Level 1, Transport Hotel, Federation Square, Melbourne VIC 3000',
      deal: 'Feed Me Lunch: $55 Feed Me Lunch — choice of 3 small plates from bites & noodles + 1 main to share.',
      cuisine: 'European',
      lat: -37.8178,
      lng: 144.969,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Fonda Mexican',
      address: '31 Flinders Ln, Melbourne VIC 3000',
      deal: 'Fonda Lunch Club: $25 burrito or quesadilla + house chips + house soda. Every weekday until 4pm.',
      cuisine: 'Mexican',
      lat: -37.8176,
      lng: 144.9615,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Asian Beer Cafe',
      address: '211 La Trobe St, Melbourne VIC 3000',
      deal: '$22 Lunches: $22 meal + free house drink. Menu includes chicken parmigiana, schnitzel, steak n\' fries, pork scotch + fish n\' chips. Mon–Fri 12pm–3pm.',
      cuisine: 'Pub',
      lat: -37.8098,
      lng: 144.9637,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'BKK Melbourne',
      address: 'Level 5, PEX, 275 Lonsdale Street, Melbourne VIC 3000',
      deal: '$15 Noodles: $15 noodle dishes with vegetarian option. Tue–Fri 11:30am–3pm.',
      cuisine: 'Thai',
      lat: -37.8111,
      lng: 144.968,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'CQ Bar',
      address: '113 Queen Street, Melbourne VIC 3000',
      deal: 'Lunchtime Drink Specials: $8 house wines, $8 Mt Colah lager pints + $10 pints of Kaiju Crush Tropical. Mon–Fri 11am–3pm.',
      cuisine: 'Bar',
      lat: -37.8152,
      lng: 144.9619,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'HER BAR',
      address: 'Ground Floor, 275 Lonsdale St, Melbourne VIC 3000',
      deal: 'Lunchtime Pasta Specials: $20 lunch time pasta specials. Menu changes often — prawn, pork & fennel sausage, tomato & basil options. Mon/Wed/Thu 11:30am–2:30pm.',
      cuisine: 'Italian',
      lat: -37.811,
      lng: 144.968,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Nanyang Express',
      address: 'Shop 1, 380 Little Bourke St, Melbourne VIC 3000',
      deal: '$10 Malaysian Meals: $10 authentic Malaysian meals! 7 days a week.',
      cuisine: 'Malaysian',
      lat: -37.8128,
      lng: 144.9707,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Ceylon Wok',
      address: 'Shop 9, 108 Bourke St, Melbourne VIC 3000',
      deal: 'Curry Dishes: Selection of rice, vegetables and curry dishes. All dishes under $15. Mon–Sat 11:30am–2pm.',
      cuisine: 'Sri Lankan',
      lat: -37.814,
      lng: 144.9621,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Rozzis State Library',
      address: 'Shop T-A1, 1 La Trobe St, Melbourne VIC 3000',
      deal: 'Pizza Lunch: $10 traditional pizza slice + 600ml Pepsi. Mon–Fri 8am–4pm.',
      cuisine: 'Italian',
      lat: -37.8092,
      lng: 144.9665,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: "Father's Office Downtown",
      address: '131 Flinders Ln, Melbourne VIC 3000',
      deal: "Lunch w/ Bev: $28 lunch with FREE schooner, beer, cider or wine. Steak, burgers, schnitzels, fish n' chips + salad. Thu–Fri only.",
      cuisine: 'Pub',
      lat: -37.8175,
      lng: 144.9647,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Cafe Court',
      address: '100 Lonsdale St, Melbourne VIC 3000',
      deal: 'Lunch Special: $10 for wrap or sandwich + side of crispy chips or fresh salad + coffee or cool drink. Mon–Fri 12pm–3pm.',
      cuisine: 'Cafe',
      lat: -37.8111,
      lng: 144.9635,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Brick Lane Market',
      address: '466 Queen St, Melbourne VIC 3000',
      deal: '$39 T-Bone & Pint: $39 for 400g T-Bone + pint 12pm–3pm. PLUS happy hour: $9.50 pints from 1pm–3pm. THURSDAY ONLY.',
      cuisine: 'Pub',
      lat: -37.811,
      lng: 144.9617,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    }
  ]
};

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_DATA, null, 2));
}

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/restaurants', (_req, res) => {
  const { restaurants } = readData();
  res.json(restaurants);
});

app.post('/api/restaurants', (req, res) => {
  const { name, address, deal, cuisine, lat, lng } = req.body;
  if (!name?.trim() || !address?.trim()) {
    return res.status(400).json({ error: 'Name and address are required' });
  }
  const data = readData();
  const restaurant = {
    id: randomUUID(),
    name: name.trim(),
    address: address.trim(),
    deal: deal?.trim() || '',
    cuisine: cuisine || 'Other',
    lat: lat || null,
    lng: lng || null,
    ratings: [],
    comments: [],
    createdAt: new Date().toISOString()
  };
  data.restaurants.push(restaurant);
  writeData(data);
  res.status(201).json(restaurant);
});

app.patch('/api/restaurants/:id', (req, res) => {
  const { lat, lng, cuisine } = req.body;
  const data = readData();
  const r = data.restaurants.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  if (lat != null) r.lat = lat;
  if (lng != null) r.lng = lng;
  if (cuisine) r.cuisine = cuisine;
  writeData(data);
  res.json(r);
});

app.delete('/api/restaurants/:id', (req, res) => {
  const data = readData();
  const idx = data.restaurants.findIndex(r => r.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  data.restaurants.splice(idx, 1);
  writeData(data);
  res.json({ ok: true });
});

app.post('/api/restaurants/:id/rate', (req, res) => {
  const { user, score } = req.body;
  const s = parseInt(score);
  if (!user?.trim() || isNaN(s) || s < 1 || s > 5) {
    return res.status(400).json({ error: 'Valid user and score (1-5) required' });
  }
  const data = readData();
  const r = data.restaurants.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  const entry = { user: user.trim(), score: s, date: new Date().toISOString() };
  const existing = r.ratings.findIndex(x => x.user === user.trim());
  if (existing >= 0) r.ratings[existing] = entry;
  else r.ratings.push(entry);
  writeData(data);
  res.json(r);
});

app.post('/api/restaurants/:id/comment', (req, res) => {
  const { user, text } = req.body;
  if (!user?.trim() || !text?.trim()) {
    return res.status(400).json({ error: 'User and text required' });
  }
  const data = readData();
  const r = data.restaurants.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  const comment = { id: randomUUID(), user: user.trim(), text: text.trim(), date: new Date().toISOString() };
  r.comments.push(comment);
  writeData(data);
  res.json(r);
});

app.delete('/api/restaurants/:id/comments/:commentId', (req, res) => {
  const data = readData();
  const r = data.restaurants.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  const idx = r.comments.findIndex(c => c.id === req.params.commentId);
  if (idx === -1) return res.status(404).json({ error: 'Comment not found' });
  r.comments.splice(idx, 1);
  writeData(data);
  res.json(r);
});

app.listen(PORT, () => {
  console.log(`🍜 Lunch Picker running at http://localhost:${PORT}`);
});
