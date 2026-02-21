import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DATA_DIR = path.join(__dirname, 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const STADIUMS_FILE = path.join(DATA_DIR, 'stadiums.json');

app.use(cors());
app.use(express.json());

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Initialize files if they don't exist
const initFile = (file, defaultData) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultData, null, 2));
  }
};

const defaultStadiums = [
  {
    id: 'stad-1',
    name: 'Narendra Modi Stadium',
    city: 'Ahmedabad',
    area: 'Motera',
    location: 'Ahmedabad, Gujarat',
    price: 45,
    sport: 'Cricket',
    capacity: 132000,
    facilities: { parking: true, changingRoom: true, floodLights: true, equipment: false },
    description: 'The world\'s largest cricket stadium. Grandeur at its peak.',
    image: '/images/narendra-modi.png'
  },
  {
    id: 'stad-2',
    name: 'Salt Lake Stadium',
    city: 'Kolkata',
    area: 'Bidhannagar',
    location: 'Kolkata, WB',
    price: 35,
    sport: 'Football',
    capacity: 85000,
    facilities: { parking: true, changingRoom: true, floodLights: true, equipment: true },
    description: 'A legendary football ground with electric atmosphere.',
    image: '/images/salt-lake.png'
  },
  {
    id: 'stad-3',
    name: 'Indira Gandhi Arena',
    city: 'New Delhi',
    area: 'IP Estate',
    location: 'New Delhi, Delhi',
    price: 25,
    sport: 'Badminton',
    capacity: 14000,
    facilities: { parking: true, changingRoom: true, floodLights: true, equipment: true },
    description: 'Elite indoor facility for badminton and more.',
    image: 'https://www.shashiprabhu.com/images/projects/sports/indira-gandhi-indoor-stadium/img1.jpg'
  },
  {
    id: 'stad-4',
    name: 'DY Patil Stadium',
    city: 'Navi Mumbai',
    area: 'Nerul',
    location: 'Navi Mumbai, MH',
    price: 40,
    sport: 'Football',
    capacity: 55000,
    facilities: { parking: true, changingRoom: true, floodLights: true, equipment: false },
    description: 'Premium multi-purpose stadium for world-class events.',
    image: 'https://www.cricwindow.com/images/stadiums/dy-patil-stadium-navi-mumbai.jpg'
  },
  {
    id: 'stad-5',
    name: 'Eden Gardens',
    city: 'Kolkata',
    area: 'Maidan',
    location: 'Kolkata, WB',
    price: 50,
    sport: 'Cricket',
    capacity: 66000,
    facilities: { parking: false, changingRoom: true, floodLights: true, equipment: false },
    description: 'The Mecca of Indian Cricket. Historic and hallowed.',
    image: '/images/eden-gardens.png'
  },
  {
    id: 'stad-6',
    name: 'Wankhede Stadium',
    city: 'Mumbai',
    area: 'Churchgate',
    location: 'Mumbai, MH',
    price: 55,
    sport: 'Cricket',
    capacity: 33000,
    facilities: { parking: false, changingRoom: true, floodLights: true, equipment: true },
    description: 'Sea breeze and historic wins at this iconic venue.',
    image: '/images/wankhede.png'
  },
  {
    id: 'stad-7',
    name: 'M. Chinnaswamy Stadium',
    city: 'Bengaluru',
    area: 'MG Road',
    location: 'Bengaluru, KA',
    price: 40,
    sport: 'Cricket',
    capacity: 40000,
    facilities: { parking: true, changingRoom: true, floodLights: true, equipment: false },
    description: 'Electric atmosphere in the garden city.',
    image: 'https://graph.facebook.com/MChinnaswamyStadium/picture?type=large&width=800'
  },
  {
    id: 'stad-8',
    name: 'Jawaharlal Nehru Stadium',
    city: 'Kochi',
    area: 'Kaloor',
    location: 'Kochi, KL',
    price: 30,
    sport: 'Football',
    capacity: 60000,
    facilities: { parking: true, changingRoom: true, floodLights: true, equipment: true },
    description: 'A massive hub for football fans in the south.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Jawaharlal_Nehru_Stadium_Aerial_View_%28Chennai%29.jpg'
  }
];





initFile(BOOKINGS_FILE, []);
initFile(USERS_FILE, []);
initFile(STADIUMS_FILE, defaultStadiums);

// --- Auth Routes ---
app.post('/api/auth/signup', (req, res) => {
  const { name, mobile, email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = { id: Date.now().toString(), name, mobile, email, password };
  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({ message: 'User created', user: userWithoutPassword });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  
  // Permissive Login: Find user by email, ignore password mismatch if user exists
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ error: 'User not found. Please Sign Up first.' });
  }

  // Any password works as long as user exists
  const { password: _, ...userWithoutPassword } = user;
  res.json({ message: 'Login successful', user: userWithoutPassword });
});


// --- Stadium Routes ---
app.get('/api/stadiums', (req, res) => {
  const stadiums = JSON.parse(fs.readFileSync(STADIUMS_FILE, 'utf8'));
  res.json(stadiums);
});

// --- Booking Routes ---
app.post('/api/bookings', (req, res) => {
  const { 
    userId, stadiumId, date, sport, 
    startTime, endTime, numPlayers, 
    paymentMethod 
  } = req.body;
  const bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'));

  // Conflict Check (Simulated: Check for same stadium, date, and overlapping time)
  const isConflict = bookings.find(b => 
    b.stadiumId === stadiumId && 
    b.date === date &&
    ((startTime >= b.startTime && startTime < b.endTime) || 
     (endTime > b.startTime && endTime <= b.endTime))
  );

  if (isConflict) {
    return res.status(409).json({ error: 'This time slot is already booked!' });
  }

  const amount = 100; // Simulated amount calculation
  const paymentStatus = paymentMethod === 'Cash' ? 'Pending' : 'Paid';
  const transactionId = paymentMethod === 'Cash' ? null : 'TXN' + Math.random().toString(36).substring(7).toUpperCase();

  const newBooking = { 
    id: Date.now().toString(), 
    userId, 
    stadiumId, 
    date, 
    sport, 
    startTime, 
    endTime, 
    numPlayers,
    paymentMethod,
    paymentStatus,
    transactionId,
    amount,
    bookedAt: new Date() 
  };
  
  bookings.push(newBooking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  
  res.status(201).json({ message: 'Booking successful', booking: newBooking });
});


app.get('/api/bookings/:userId', (req, res) => {
  const { userId } = req.params;
  const bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8'));
  const userBookings = bookings.filter(b => b.userId === userId);
  res.json(userBookings);
});

app.listen(PORT, () => {
  console.log(`ArenaReserve Backend running on http://localhost:${PORT}`);
});
