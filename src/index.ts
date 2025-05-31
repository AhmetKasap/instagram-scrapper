import type App from "./app";
import { container } from "./inversify.config";
const app = container.get<App>("IApp");
app.init().then(() => app.afterInit());
