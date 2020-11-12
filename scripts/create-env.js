const fs = require('fs');
fs.writeFileSync('./.env', `SENTRY_DSN=${process.env.SENTRY_DSN}\n`);
