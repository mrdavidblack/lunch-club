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
      name: "Pellegrini's Espresso Bar",
      address: '66 Bourke St, Melbourne VIC 3000',
      deal: 'Classic Italian pasta & coffee — an iconic Melbourne institution since 1954',
      cuisine: 'Italian',
      lat: -37.8143,
      lng: 144.9697,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Stalactites Restaurant',
      address: '177-183 Lonsdale St, Melbourne VIC 3000',
      deal: 'Authentic Greek lunch specials, open 24 hours',
      cuisine: 'Greek',
      lat: -37.8110,
      lng: 144.9665,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Chin Chin',
      address: '125 Flinders Lane, Melbourne VIC 3000',
      deal: 'Modern Southeast Asian — walk-ins only at lunch',
      cuisine: 'Asian',
      lat: -37.8174,
      lng: 144.9651,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Mamasita',
      address: '11 Collins St, Melbourne VIC 3000',
      deal: 'Mexican street food & margaritas for lunch',
      cuisine: 'Mexican',
      lat: -37.8130,
      lng: 144.9741,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'The Hardware Club',
      address: '1 Hardware Lane, Melbourne VIC 3000',
      deal: 'European bistro — French and Italian lunch classics',
      cuisine: 'European',
      lat: -37.8143,
      lng: 144.9629,
      ratings: [],
      comments: [],
      createdAt: new Date().toISOString()
    },
    {
      id: randomUUID(),
      name: 'Flower Drum',
      address: '17 Market Lane, Melbourne VIC 3000',
      deal: 'Legendary Cantonese dim sum and lunch',
      cuisine: 'Chinese',
      lat: -37.8157,
      lng: 144.9648,
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
