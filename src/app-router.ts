import { injectable, multiInject } from "inversify";
import type { Express } from "express";
import type { IRouter } from "./interfaces/router.interface";
@injectable()
class AppRouter {
	constructor(@multiInject("IRouter") private readonly routers: IRouter[]) {}
	run(app: Express) {
		this.routers.forEach((router) => {
			router.setupRoutes();
			app.use(router.path, router.router);
		});
	}
}
export default AppRouter;
