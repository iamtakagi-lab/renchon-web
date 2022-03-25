process.setMaxListeners(Infinity)

import { NextApiRequest, NextApiResponse } from "next";
import nodeHtmlToImage from "node-html-to-image";

const image = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("X-Robots-Tag", "noindex");
  const { sentence } = req.query;
  if (!sentence || sentence === null || typeof sentence !== "string")
    return res.status(500);

  const image = await nodeHtmlToImage({
      puppeteerArgs: {
        args: [ '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1200,630'],
        env: {
            ...process.env,
            LANG: "ja_JP.UTF-8"
        }
      },
    html: `
    <html>
    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style>
        @charset "UTF-8";
        @font-face {
            font-family: "NotoSansJP-Medium";
            src: url("/fonts/NotoSansJP-Medium.ttf") format("truetype");
        }
          
        html {
            font-family: "NotoSansJP-Medium", sans-serif;
        }

        body {
            width: 1160px;
            height: 590px;
            border: solid 20px #8ddafd;
        }
          
        #ogp_container {
            width: 100%;
            height: 100%;
            align-items: center;
            vertical-align: middle;
            margin: auto;
            display: flex;
            overflow: hidden;
            flex-direction: column;
          }
          
          #ogp_balloon {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: fit-content;
            margin: auto;
            padding: 1rem;
            padding-bottom: 5vh;
          }
          
          #ogp_balloon #ogp_faceicon {
            float: left;
            margin-right: -70px;
            width: 380px;
          }
          
          #ogp_balloon #ogp_faceicon img {
            width: 100%;
            height: auto;
            border: solid 3px #d7ebfe;
            border-radius: 50%;
          }
          
          #ogp_balloon #ogp_chatting {
            width: 100%;
          }
          
          #ogp_says {
            display: inline-block;
            position: relative;
            margin: 5px 0 0 105px;
            padding: 17px 13px;
            border-radius: 12px;
            background: #d7ebfe;
            font-size: 40px;
          }
          
          #ogp_says:after {
            content: "";
            display: inline-block;
            position: absolute;
            top: 18px;
            left: -24px;
            border: 12px solid transparent;
            border-right: 12px solid #d7ebfe;
          }
          
          #ogp_logo {
            align-items: center;
            padding: 0 auto;
            margin: 0 auto;
            margin-bottom: 100px;
          }
          
          #ogp_logo_username {
            font-size: 3.1rem;
          }
        </style>
    </head>
    <body>
        <div id="ogp_container">
            <div id="ogp_balloon">
                <div id="ogp_faceicon">
                    <img src="https://i.imgur.com/txA9vt8.jpeg" alt="renchon" />
                </div>
                <div id="ogp_chatting">
                    <div id="ogp_says">{{sentence}}</div>
                </div>
            </div>
            <div id="ogp_logo">
                <div id="ogp_logo_username">単語を覚えるれんちょんbot</div>
            </div>
        </div>
    </body>
    `,
    content: { sentence },
  });

  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-DPR", "2.0");
  res.setHeader("Cache-Control", "max-age=300, public, stale-while-revalidate");
  res.send(image);
};

export default image;
