import dotenv from 'dotenv'
import db from "./db.ts"
import app from "./app.ts";

dotenv.config();

const start = async (): Promise<void> => {

  if(await db.connect() == -1) {
    console.log("Can't connect to the db");
    return;
  }

  app.init();
  app.listen();

};

start();