
import { envs } from "./config";
import { MongoDatabase } from "./data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  await MongoDatabase.connect({
    dbname: envs.MONGO_DBNAME,
    mongoUrl: envs.MONGO_URL,
  });

  server.start();
};
