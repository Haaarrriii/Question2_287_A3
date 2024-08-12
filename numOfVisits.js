const express = require('express');
const cookieParser = require('cookie-parser');
const moment = require('moment-timezone');

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    let visitCounter = req.cookies.visitCounter ? parseInt(req.cookies.visitCounter) : 0;
    visitCounter += 1;

    let message = '';
    if (visitCounter === 1) {
        message = 'Welcome to my webpage! It is your first time that you are here.';
    } else {
        const lastVisit = req.cookies.lastVisit;
        
        const lastVisitMessage = `Last time you visited my webpage on: ${lastVisit}`;
        message = `Hello, this is the ${visitCounter} time that you are visiting my webpage.\n${lastVisitMessage}`;
    }

    const now = moment().tz("America/New_York");
    const currentTimeInEST = now.format('ddd MMM D HH:mm:ss') + ' EST ' + now.format('YYYY');
    res.cookie('visitCounter', visitCounter, { maxAge: 86400000 * 365 }); 
    res.cookie('lastVisit', currentTimeInEST, { maxAge: 86400000 * 365 });

    res.send(message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

