import express, { Router } from "express";
import path from "path";
import cors from "cors"; 

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  public readonly app = express();
  public readonly routes: Router;
  private readonly publicPath: string;
  private readonly port: number;
  private serverListener?: any;

  constructor(options: Options) {
    const { port, routes, publicPath = "public" } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    
    this.app.use(cors( origin: "http://localhost:5173"))


    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.static(this.publicPath));

    this.app.use(this.routes);

    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public close() {
    if (this.serverListener) {
      this.serverListener.close();
    }
  }
}
