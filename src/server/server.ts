import * as express from "express";
import apiRouter from "./routes";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();

type Application = express.Application;
type Request = express.Request;
type Response = express.Response;

const app: Application = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(apiRouter);

app.get("/root", (req: Request, res: Response) => {
  res.send("Express example route");
});

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

const port: string | number = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server listening on port ${port} in mode ${app.settings.env}`)
);