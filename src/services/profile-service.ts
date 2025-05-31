import { inject, injectable } from "inversify";
import * as puppeteer from "puppeteer";

import dotenv from "dotenv";
import { type IInstagramProfile } from "../dtos/instagram.dto";
import type { IProfileService } from "./profile-service.interface";
import type { ILoginService } from "./login-service.interface";
dotenv.config();

@injectable()
export default class ProfileService implements IProfileService {
	constructor(
		@inject("ILoginService")
		private readonly loginService: ILoginService,
	) {}

	private delay(ms: number): Promise<void> {
		return new Promise((res) => setTimeout(res, ms));
	}

	/* Profile  Parser */
	private async textParser(
		text: string,
	): Promise<{ fullName: string; bio: string }> {
		const ignoreWords = [
			"Takip Et",
			"Mesaj Gönder",
			"Gönderi",
			"takipçi",
			"takip",
			"Profili Düzenle",
			"Message",
			"Follow",
			"Following",
			"Edit Profile",
		];

		// Split by lines
		const lines = text
			.split("\n")
			.map((line) => line.trim())
			.filter(Boolean);
		// Filter out lines containing ignore words
		const filteredLines = lines.filter((line) => {
			return !ignoreWords.some((ignoreWord) =>
				line.toLowerCase().includes(ignoreWord.toLowerCase()),
			);
		});

		const fullName = filteredLines[1] || "";
		const bio = filteredLines.slice(2).join(" ") || "";

		return { fullName, bio };
	}

	/* Get Profile and Reels */
	async getProfile(username: string): Promise<IInstagramProfile> {
		const browser = await puppeteer.launch({
			headless: false,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			defaultViewport: null,
		});

		const page = await browser.newPage();
		const userData: any = { username };

		try {
			await this.loginService.loginToInstagram(page);

			await page.goto(`https://www.instagram.com/${username}/`, {
				waitUntil: "networkidle2",
			});
			await this.delay(2000);

			const headerText = await page.$eval("header", (el) => el.innerText);

			const { fullName, bio } = await this.textParser(headerText);

			let profilePic = "";
			try {
				profilePic = await page.$eval("header img", (img) => img.src);
			} catch (e) {}

			Object.assign(userData, {
				profilePicUrl: profilePic,
				fullName: fullName,
				bio: bio,
			});

			return userData;
		} catch (err: any) {
			console.error("Error:", err.message);
			throw new Error(
				`Failed to fetch Instagram profile: ${err.message}`,
			);
		} finally {
			await browser.close();
		}
	}
}
