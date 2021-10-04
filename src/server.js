import express from "express";

const PORT = 4000;

const app = express();

const handleListening = () => {
    console.log(`Server listening on http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

export default app;