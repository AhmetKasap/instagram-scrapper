import { inject, injectable } from "inversify";
import * as puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import type { IConfig } from "../config";
import type { ILoginService } from "./login-service.interface";

dotenv.config();

@injectable()
export default class LoginService implements ILoginService {
	private readonly COOKIES_PATH = path.join(
		process.cwd(),
		"instagram_cookies.json",
	);
	private readonly DOWNLOADS_PATH = path.join(process.cwd(), "downloads");
	private readonly DOWNLOAD_SCRIPT_PATH = "instagram";

	private instagramUsername: string;
	private instagramPassword: string;

	constructor(
		@inject("IConfig")
		private readonly config: IConfig,
	) {
		this.instagramUsername = this.config.INSTAGRAM_USERNAME;
		this.instagramPassword = this.config.INSTAGRAM_PASSWORD;

		// Create downloads directory if it doesn't exist
		if (!fs.existsSync(this.DOWNLOADS_PATH)) {
			fs.mkdirSync(this.DOWNLOADS_PATH, { recursive: true });
		}

		// Create scripts directory if it doesn't exist
		const scriptDir = path.dirname(this.DOWNLOAD_SCRIPT_PATH);
		if (!fs.existsSync(scriptDir)) {
			fs.mkdirSync(scriptDir, { recursive: true });
		}
	}

	private delay(ms: number): Promise<void> {
		return new Promise((res) => setTimeout(res, ms));
	}

	/* Login Transactions */
	private async saveCookies(page: puppeteer.Page): Promise<void> {
		const cookies = await page.cookies();
		fs.writeFileSync(this.COOKIES_PATH, JSON.stringify(cookies, null, 2));
	}

	private async loadCookies(page: puppeteer.Page): Promise<boolean> {
		if (fs.existsSync(this.COOKIES_PATH)) {
			const cookies = JSON.parse(
				fs.readFileSync(this.COOKIES_PATH, "utf8"),
			);
			await page.setCookie(...cookies);
			return true;
		}
		return false;
	}

	async loginToInstagram(page: puppeteer.Page): Promise<boolean> {
		await page.goto("https://www.instagram.com/", {
			waitUntil: "networkidle2",
		});

		if (await this.loadCookies(page)) {
			await page.reload({ waitUntil: "networkidle2" });
			await this.delay(1000);

			try {
				await page.waitForSelector('svg[aria-label="Ana Sayfa"]', {
					timeout: 1000,
				});
				return true;
			} catch (e) {}
		}

		await page.goto("https://www.instagram.com/accounts/login/", {
			waitUntil: "networkidle2",
		});
		await page.waitForSelector('input[name="username"]');

		await page.type('input[name="username"]', this.instagramUsername, {
			delay: 100,
		});
		await page.type('input[name="password"]', this.instagramPassword, {
			delay: 100,
		});

		await page.click('button[type="submit"]');
		await page.waitForNavigation({ waitUntil: "networkidle2" });
		await this.delay(1000);

		// Handle "Not Now" buttons
		try {
			const notNowButtons = await page.$$(
				'::-p-xpath(//button[contains(text(), "Şimdi Değil")])',
			);
			if (notNowButtons && notNowButtons.length > 0) {
				for (const btn of notNowButtons) {
					await btn.click();
					await this.delay(1000);
				}
			}
		} catch (err) {}

		await this.saveCookies(page);
		return true;
	}
}
