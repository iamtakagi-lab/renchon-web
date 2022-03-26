import { createCanvas, loadImage, registerFont } from "canvas";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import stream from "stream";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("X-Robots-Tag", "noindex");
  const { sentence } = req.query;
  if (!sentence || sentence === null || typeof sentence !== "string")
    return res.status(500);
  
  const fontPath = path.resolve("assets", "fonts", "NotoSansJP-Medium.otf")
  const fnt = registerFont(fontPath, {
    family: "NotoSansJP-Medium"
  })

  try {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext("2d");

    const imgSource = path.resolve("assets", "ogp_base.png")

    // Draw base image
    const ogpBaseImg = await loadImage(imgSource);
    ctx.drawImage(ogpBaseImg, 0, 0);
    
    // Draw sentence
     // 基本設定
     var originX = 385;// 矢印X座標
     var originY = 360;// 矢印Y座標
     var boxWidth = 750;
     var padding = 7;
     var radius = 40;// 円弧の半径
 
 
     var context = canvas.getContext("2d");
     context.fillStyle = "#d7ebfe";
 
     // テキスト設定
     var limitedWidth = boxWidth - (padding * 2);
     var size = 45;
     context.font = size + "px ''";
 
     // テキスト調整　行に分解
     var lineTextList = sentence.split("\n");
     var newLineTextList: string[] = [];
     lineTextList.forEach(function (lineText) {
         if (context.measureText(lineText).width > limitedWidth) {
             const characterList = lineText.split("");// 1文字ずつ分割
             var preLineText = "";
             var lineText = "";
             characterList.forEach(function (character) {
                 lineText += character;
                 if (context.measureText(lineText).width > limitedWidth) {
                     newLineTextList.push(preLineText);
                     lineText = character;
                 }
                 preLineText = lineText;
             });
         }
         newLineTextList.push(lineText);
     });
     var lineLength = newLineTextList.length;
 
       // 矢印
    var arrow = {
      "x" : originX,
      "y" : originY,
      "width" : 20,
      "height" : 10,
    }
     context.beginPath();
     context.moveTo(arrow.x, arrow.y);
     context.lineTo(arrow.x + arrow.width / 2, arrow.y + arrow.height);
     context.lineTo(arrow.x - arrow.width / 2, arrow.y + arrow.height);
     ctx.beginPath();
     ctx.moveTo(arrow.x, arrow.y)
     ctx.lineTo(arrow.x + 25, arrow.y + 25);
     ctx.lineTo(arrow.x + 25, arrow.y - 25);
     context.fill();

     
     // 角丸
     var width = boxWidth;// 枠の幅
     var height = (size * lineLength) + (padding * 5);// 枠の高さ
     var toRadianCoefficient = Math.PI / 180;// 角度からラジアンへの変換係数
     // 角丸原点（左上座標）
     var boxOrigin = {
         "x" : arrow.x + 8,
         "y" : arrow.y - 40,
     }
     // 円弧から円弧までの直線は自動で引かれます、角度は回り方によって変わります。
     // arc(中心x, 中心y, 半径, 開始角度, 終了角度, 反時計回り)
     context.beginPath();
     context.arc(boxOrigin.x + radius, boxOrigin.y + radius, radius, 180 * toRadianCoefficient, 270 * toRadianCoefficient, false);// 左上
     context.arc(boxOrigin.x + width - radius, boxOrigin.y + radius, radius, 270 * toRadianCoefficient, 0, false);// 右上
     context.arc(boxOrigin.x + width - radius, boxOrigin.y + height - radius, radius, 0, 90 * toRadianCoefficient, false);// 右下
     context.arc(boxOrigin.x + radius, boxOrigin.y + height - radius, radius, 90 * toRadianCoefficient, 180 * toRadianCoefficient, false);// 左下
     context.closePath();
     context.fill();
 
     // テキスト描画
     context.fillStyle = "#000000";
     newLineTextList.forEach(function (lineText, index) {
         context.fillText(lineText, boxOrigin.x + (padding + 20), boxOrigin.y + (padding + 3) + (size * (index + 1)));
     });

    const buffer = canvas.toBuffer()

    res.writeHead(200, {
      'Cache-Control': 'public, max-age=315360000, s_maxage=315360000',
      Expires: new Date(Date.now() + 315360000000).toUTCString(),
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
      "Content-DPR": "2.0"
    })
    res.end(buffer, 'binary')
  } catch (err) {
    console.log(err);
  }
};

export default handler;
