import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from 'puppeteer'

const shot = async (sentence: string) => {
    const agent = await puppeteer.launch({
        args: [ '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1200,630'],
        defaultViewport: null,
        env: {
            ...process.env,
            LANG: "ja_JP.UTF-8"
        }
    })

    const page = await agent.newPage()
    await page.setViewport({
        width: 1200,
        height: 630,
    });
    await page.setDefaultNavigationTimeout(0);
    try {
        const targetElementSelector = '#ogp_container'
        await page.goto(`https://renchon.chat/ogp?sentence=${sentence}`)
        const clip = await page.evaluate((s: any) => {
            const el = document.querySelector(s)
            const { width, height, top: y, left: x } = el.getBoundingClientRect()
            return { width: width, height, x, y }
        }, targetElementSelector)
        return await page.screenshot({ clip, type: "png" })
    } finally {
        await page.close()
    }
}

const image = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("X-Robots-Tag", "noindex")
    const { sentence } = req.query
    if (!sentence || sentence === null || typeof sentence !== "string") return res.status(500)
    shot(sentence).then((img) => {
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Content-DPR", "2.0");
        res.setHeader("Cache-Control", "max-age=300, public, stale-while-revalidate")
        res.send(img);
    })
}

export default image