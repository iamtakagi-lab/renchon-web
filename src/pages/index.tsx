import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { makeSentence } from "../api";
import { Seo } from "../components/seo";
import { useCounter } from "../counter";

const IndexPage = () => {
  const [sentence, setSentence] = useState("");
  const { count, increment } = useCounter();

  const generateSentence = async () => {
    const newSentence = await makeSentence()
    setSentence(newSentence);
    increment();
    router.push(newSentence)
  }

  useEffect(() => {
    generateSentence();
  }, []);

  const router = useRouter()

  const onClickScreen = async () => {
    await generateSentence();
  };

  return (
    <div id="container" onClick={() => onClickScreen()}>
      {(sentence ? <Seo sentence={sentence} ogImageUrl={`https://renchon.chat/api/ogp?sentence=${sentence}`} /> : <Seo /> )}
      <div id="balloon">
        <div id="faceicon">
          <img src="./renchon.jpg" alt="renchon" />
        </div>
        <div id="chatting">
          <div id="says">{sentence}</div>
        </div>
      </div>
      <div id="footer">
        <div id="counter">{count}</div>
        <button
          className="btn"
          id="twitter_share_btn"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet?text=単語を覚えるれんちょんbot` +
                encodeURI(
                  `「${sentence}」&url=${`https://renchon.chat/${encodeURIComponent(
                    sentence
                  )}`}`
                ),
              "_blank",
              "noreferrer"
            )
          }
        >
          ツイート
        </button>
        <div>画面をタップするとセリフが生成されます</div>
        <div>
          単語を覚えるれんちょんbot{" "}
          <a
            href="https://twitter.com/nyanpassnanon"
            target="_blank"
            rel="noreferrer noopener"
          >
            @nyanpassnanon
          </a>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
