const app = require('express')();
const wrap = require('express-async-error-wrapper');

// Will catch the error and go through the express error handler.
app.use('/with', wrap(async () => {
    throw new Error('Oh noes.')
}));

// Will crash the server and cause timeout in the client.
app.use('/without', async () => {
    throw new Error('Oh noes.')
});

console.log('Starting server on port 8000')
app.listen(8000);
