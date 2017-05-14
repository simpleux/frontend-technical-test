const Express     = require('express');
const path        = require('path');
const hbs         = require('hbs');
const http        = require('http');
const compression = require('compression');
const PORT        = 9988;

const app = new Express();

app.disable('x-powered-by');
app.use(compression());

app.set('view engine', 'html');
app.engine('html', hbs.__express); // eslint-disable-line
app.set('views', path.join(__dirname, './views'));

app.use(Express.static(path.join(__dirname, './dist')));
app.use('/images', Express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/vehicle', (req, res) => {
    const vehicles = require('./server_api/vehicles.js');
    res.json(vehicles);
});

app.get('/api/vehicle/:id', (req, res) => {
    const vehicle = require('./server_api/vehicle_' + req.params.id + '.js');
    res.json(vehicle);
});

app.get('*', (req, res) => {
    res.render('index');
});

try {
    const server = http.createServer(app);

    server.listen(PORT, () => {
        console.log(`Here you go, Open localhost:${PORT} and see your app running`);
    });

} catch (err) {
    throw new Error(err);
}
