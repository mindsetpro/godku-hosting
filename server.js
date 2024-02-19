// server.js

const express = require('express');
const { exec } = require('child_process');

const app = express();

// Route to start the bot
app.get('/start-bot', (req, res) => {
    exec('docker run -d my_discord_bot', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting bot: ${error.message}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (stderr) {
            console.error(`Error starting bot: ${stderr}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(`Bot started successfully: ${stdout}`);
        res.status(200).json({ message: 'Bot started successfully' });
    });
});

// Route to stop the bot
app.get('/stop-bot', (req, res) => {
    exec('docker stop $(docker ps -q --filter ancestor=my_discord_bot)', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error stopping bot: ${error.message}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (stderr) {
            console.error(`Error stopping bot: ${stderr}`);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log(`Bot stopped successfully: ${stdout}`);
        res.status(200).json({ message: 'Bot stopped successfully' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
