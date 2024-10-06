import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let gridData = Array(400).fill('#FFFFFF');

app.get('/grid', (req, res) => {
    res.json(gridData);
});

app.post('/grid', (req, res) => {
    const gridColors = req.body;
    if (Array.isArray(gridColors) && gridColors.length === 400) {
        gridData = gridColors;
        res.status(200).json({ message: 'Data saved succesfully!' });
    } else {
        res.status(400).json({ message: 'Invalid grid data!' });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});