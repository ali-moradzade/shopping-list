import {APP_CONFIG, DB_CONFIG} from "./config";
import {connectToDb} from "./services/db";
import {app} from "./app";

(async () => {
    await connectToDb();
    console.log(`Connected to database at: ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.name}`);

    app.listen(APP_CONFIG.port);
    console.log(`Server listening on port ${APP_CONFIG.port} ..`);
})();

