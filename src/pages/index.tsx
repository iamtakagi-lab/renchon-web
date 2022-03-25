import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { Seo } from "../components/seo";
import { API_BASE_URL } from "../consts";
import { SentenceRensponse } from "../types";

type Props = {
  querySentence?: string;
  error?: {
    status: number;
    message: string;
  };
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { sentence } = ctx.query;

  if (sentence && sentence !== null && typeof sentence === "string")
    return {
      props: {
        querySentence: sentence,
      },
    };

  return { props: {} };
};

const useCounter = (init: number = 0) => {
  const [count, setCount] = useState(init);

  const increment = () => setCount((prevValue: number) => prevValue + 1);
  const decrement = () => setCount((prevValue: number) => prevValue - 1);

  return { count, increment, decrement };
};

const makeSentence = async () => {
  const { sentence } = (await fetch(`${new URL(API_BASE_URL).href}make_sentence`).then(
    (res) => res.json()
  )) as SentenceRensponse;
  return sentence;
};

const Index = ({ querySentence }: Props) => {
  const [sentence, setSentence] = useState("");
  const { count, increment } = useCounter();

  useEffect(() => {
    if (querySentence) {
      return setSentence(querySentence);
    }
    if (!querySentence) {
      const initialize = async () => {
        setSentence(await makeSentence());
      };
      initialize();
    }
  }, []);

  const onClickScreen = async () => {
    setSentence(await makeSentence());
    increment();
    console.log(encodeURIComponent(`https://twitter.com/intent/tweet?text=単語を覚えるれんちょんbot「${sentence}」&url=${encodeURIComponent(`https://renchon.chat/?sentence=${sentence}`)}`))
  };

  return (
    <div className="container" onClick={() => onClickScreen()}>
      {(sentence && <Seo sentence={sentence} />) ||
        (querySentence && <Seo sentence={querySentence} ogImageUrl={`https://renchon.chat/api/ogp?sentence=${querySentence}`} />)}

      <div id="balloon">
        <div id="faceicon">
          <img src="./renchon.jpg" alt="renchon" />
        </div>
        <div id="chatting">
          <div id="says">{sentence}</div>
        </div>
      </div>
      <div className="footer">
        <div id="counter">{count}</div>
          <button
            className="btn"
            id="twitter_share_btn"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=単語を覚えるれんちょんbot` +
                encodeURI(`「${sentence}」&url=${`https://renchon.chat/?sentence=${encodeURIComponent(sentence)}`}`),
                "_blank",
                "noreferrer"
              )
            }
          >
            ツイート
          </button>
          <div>
            画面をタップするとセリフが生成されます
          </div>
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

export default Index;
