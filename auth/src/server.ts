import configureDB from './config/database';
import { app } from './app'

const port = process.env.PORT || 4000;

configureDB();

app.listen(port, () => {
    console.log('LISTENING ON PORT -->',port);
})