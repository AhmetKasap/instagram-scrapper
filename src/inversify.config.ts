import { Container } from "inversify";
import type { IRouter } from "./interfaces/router.interface";
import AppRouter from "./app-router";
import App from "./app";
import Config, { type IConfig } from "./config";

import type { IProfileService } from "./services/profile-service.interface";
import ProfileService from "./services/profile-service";
import type { IReelsService } from "./services/reels-service.interface";
import ReelsService from "./services/reels.service";
import { ProfileController } from "./controllers/profile.controller";
import type { IProfileController } from "./controllers/profile-controller.interface";
import type { IReelsController } from "./controllers/reels-controller.interface";
import { ReelsController } from "./controllers/reels.controller";
import ProfileRouter from "./routers/profile.router";
import ReelsRouter from "./routers/reels-router";
import LoginService from "./services/login.service";
import { ILoginService } from "./services/login-service.interface";
import UserRepository from "./database/repositories/user.repository";
import { IUserRepository } from "./database/repositories/user.repository";
import RoleRepository from "./database/repositories/role.repository";
import { IRoleRepository } from "./database/repositories/role.repository";


const container = new Container({ defaultScope: "Singleton" });

// Config
container.bind<IConfig>("IConfig").to(Config).inSingletonScope();

// Repositories
container.bind<IUserRepository>("IUserRepository").to(UserRepository).inSingletonScope();
container.bind<IRoleRepository>("IRoleRepository").to(RoleRepository).inSingletonScope();

// Services
container
	.bind<IProfileService>("IProfileService")
	.to(ProfileService)
	.inSingletonScope();

container
	.bind<IReelsService>("IReelsService")
	.to(ReelsService)
	.inSingletonScope();

container
	.bind<ILoginService>("ILoginService")
	.to(LoginService)
	.inSingletonScope();

// Controllers
container
	.bind<IProfileController>("IProfileController")
	.to(ProfileController)
	.inSingletonScope();

container
	.bind<IReelsController>("IReelsController")
	.to(ReelsController)
	.inSingletonScope();

//api
container.bind<IRouter>("IRouter").to(ProfileRouter);
container.bind<IRouter>("IRouter").to(ReelsRouter);

container.bind("IAppRouter").to(AppRouter).inSingletonScope();
container.bind("IApp").to(App).inSingletonScope();

export { container };
