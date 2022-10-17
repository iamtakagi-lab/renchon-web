import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { makeSentence } from "../api";
import { Seo } from "../components/seo";
import { useCounter } from "../counter";

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

const SentencePage = ({ querySentence }: Props) => {
  const [sentence, setSentence] = useState("");
  const { count, increment } = useCounter();
  const router = useRouter();

  const generateSentence = async () => {
    const newSentence = await makeSentence();
    setSentence(newSentence);
    increment();
    router.push(newSentence, undefined, { shallow: true });
  };

  useEffect(() => {
    if (querySentence) {
      setSentence(querySentence);
      increment();
      return;
    }
    if (!querySentence) {
      generateSentence();
    }
  }, []);

  const onClickScreen = async () => {
    await generateSentence();
  };

  return (
    <div id="container" onClick={() => onClickScreen()}>
      {(sentence && (
        <Seo
          pageSubTitle={`「${sentence}」`}
          ogImageUrl={`https://renchon.iamtakagi.vercel.app/api/ogp?sentence=${sentence}`}
        />
      )) ||
        (querySentence && (
          <Seo
            pageSubTitle={`「${querySentence}」`}
            ogImageUrl={`https://renchon.iamtakagi.vercel.app/api/ogp?sentence=${querySentence}`}
          />
        ))}

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
                  `「${sentence}」&url=${`https://renchon.iamtakagi.vercel.app/${encodeURIComponent(
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
        <a
          href="https://renchon.iamtakagi.vercel.app/privacy_policy"
          target="_blank"
          rel="noreferrer noopener"
        >
          プライバシーポリシー
        </a>
      </div>
    </div>
  );
};

export default SentencePage;
