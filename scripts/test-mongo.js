const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

function getEnvVar(name) {
  const envPath = path.resolve(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const re = new RegExp('^\\s*' + name + '\\s*=\\s*(.*)$', 'm');
    const m = content.match(re);
    if (m && m[1]) {
      let val = m[1].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      return val;
    }
  }
  return process.env[name];
}

const uri = getEnvVar('MONGODB_URI');

if (!uri) {
  console.error('MONGODB_URI not found in .env or environment.');
  process.exit(1);
}

// Mask password for logging
const safeUri = uri.replace(/:(.+?)@/, ':***@');
console.log('Testing MongoDB connection to:', safeUri);

(async () => {
  try {
    // Use minimal options
    await mongoose.connect(uri, { bufferCommands: false });
    console.log('Connected to MongoDB ✅');
    await mongoose.disconnect();
    console.log('Disconnected cleanly');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed ❌');
    console.error(err && err.message ? err.message : err);
    process.exit(2);
  }
})();
