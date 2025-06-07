import { inject, injectable } from "inversify";
import * as puppeteer from "puppeteer";
import type { ILoginService } from "./login-service.interface";
import type { IReelsService } from "./reels-service.interface";
import { IReelsResponse, ISaveReelsData } from "../dtos/reels.dto";
import  { IProfileRepository } from "../database/repositories/profile.repository";
import { IReelsRepository } from "../database/repositories/reels.repository";

@injectable()
export default class ReelsService implements IReelsService {
	constructor(
		@inject("ILoginService")
		private readonly loginService: ILoginService,
		@inject("IProfileRepository")
		private readonly profileRepository: IProfileRepository,
		@inject("IReelsRepository")
		private readonly reelsRepository: IReelsRepository,
	) {}

	private delay(ms: number): Promise<void> {
		return new Promise((res) => setTimeout(res, ms));
	}

	async getReelsByUsername(
		username: string,
		postCount: number,
	): Promise<IReelsResponse[]> {
		const reelsDataIsExist = await this.getReelsDataIsExist(username);
		if (reelsDataIsExist !== null) return reelsDataIsExist;

		const browser = await puppeteer.launch({
			headless: false,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			defaultViewport: null,
		});

		const page = await browser.newPage();
		const reelsData: IReelsResponse[] = [];

		try {
			await this.loginService.loginToInstagram(page);

			const reelsUrl = `https://www.instagram.com/${username}/reels/`;
			await page.goto(reelsUrl, { waitUntil: "networkidle2" });
			await this.delay(5000);

			// Scroll down to load more reels if needed
			for (let i = 0; i < Math.min(5, Math.ceil(postCount / 8)); i++) {
				await page.evaluate(() => {
					window.scrollBy(0, window.innerHeight);
				});
				await this.delay(5000);
			}

			// Tüm reels linklerini topla
			const reelLinks = await page.evaluate(() => {
				const links = Array.from(
					document.querySelectorAll('a[href*="/reel/"]'),
				);
				return links.map((link: any) => link.href);
			});

			const selectedReels = reelLinks.slice(0, postCount);

			// Her reel linkine git ve tarih bilgisini al
			for (let i = 0; i < selectedReels.length; i++) {
				const reelUrl = selectedReels[i];

				const reelPage = await browser.newPage();
				try {
					await reelPage.goto(reelUrl, { waitUntil: "networkidle2" });
					await this.delay(2000);

					const pubDate = await reelPage.evaluate(() => {
						const timeElement = document.querySelector("time");
						return timeElement
							? timeElement.getAttribute("datetime")
							: null;
					});

					reelsData.push({
						reelsUrl: reelUrl,
						pubDate: pubDate ? new Date(pubDate) : new Date(),
					});
				} catch (err: any) {
					console.error(`Reel işleme hatası: ${err.message}`);
					reelsData.push({
						reelsUrl: reelUrl,
					});
				} finally {
					await reelPage.close();
				}
			}
		} catch (err: any) {
			console.error("Genel hata:", err.message);
		} finally {
			await browser.close();
		}

		const reelsDataToSave = reelsData.map((reel) => {
			return {
				reelsUrl: reel.reelsUrl,
				pubDate: reel.pubDate,
				username: username,
			};
		});

		await this.saveReelsData(reelsDataToSave as ISaveReelsData[]);

		return reelsData as IReelsResponse[];
	}

	private async getReelsDataIsExist(username: string): Promise<IReelsResponse[] | null> {
		const reelsByUsername = await this.profileRepository.getModel().aggregate([
			{
				$match: { username },
			},
			{
				$lookup: {
					from: "reels",
					localField: "_id",
					foreignField: "username",
					as: "reels",
				},
			},
		]);
		if (reelsByUsername[0].reels.length !== 0) {
			return reelsByUsername as IReelsResponse[];
		}
		return null;
	}

	private async saveReelsData(saveReelsData: ISaveReelsData[]): Promise<void> {
		const reelsData = saveReelsData.map((reel) => {
			return {
				reelsUrl: reel.reelsUrl,
				pubDate: reel.pubDate,
				username: reel.username,
			};
		});

		await this.reelsRepository.getModel().create(reelsData as any);
	
	}
}
