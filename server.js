const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post('https://api.deepseek.com/v1/chat', {
            message: req.body.message,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
