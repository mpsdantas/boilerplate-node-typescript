import os from "os";
import app from "./modules/commom/config/app.config";

app.listen(process.env.PORT, () => {
  console.log(
    `\n➡➡ The server is online: http://${os.hostname()}:${
      process.env.PORT
    }/, OS: ${os.type()} ${os.release()}. Environment: ${
      process.env.NODE_ENV
    }, with Node.js v${process.versions.node}.`
  );
});
