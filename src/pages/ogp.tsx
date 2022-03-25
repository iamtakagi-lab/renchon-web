import { GetServerSidePropsContext } from "next";

type Props = {
  sentence?: string;
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
        sentence
      },
    };
  return { props: {} };
};

const Ogp = ({ sentence }: Props) => {
  return (
    <div id="ogp_container">
      <div id="ogp_balloon">
        <div id="ogp_faceicon">
          <img src="./renchon.jpg" alt="renchon" />
        </div>
        <div id="ogp_chatting">
          <div id="ogp_says">{sentence}</div>
        </div>
      </div>
      <div id="ogp_logo">
        <div id="ogp_logo_username">単語を覚えるれんちょんbot</div>
      </div>
    </div>
  );
};

export default Ogp