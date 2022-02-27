import React, { useEffect, FormEvent, useState } from "react";
import { doJanken, makeRenchonSentence, pickOmikuji } from "./common";
import { RENCHON_RESPONSE_DELAY } from "./consts";
import { Message } from "./types";

export const App: React.FC<{}> = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const initialize = () => {
    window.setTimeout(() => {
      setMessages([{text: "にゃんぱすー", sender: "れんちょん"}, ...messages])
    }, 500)
  }

  useEffect(() => {
    initialize()
  }, []);

  const addMessage = (message: Message) => setMessages((prevMessages) => [message, ...prevMessages])

  const addRenchonMessage = (message: Message) => window.setTimeout(() => {
    addMessage(message)
  }, RENCHON_RESPONSE_DELAY)

  const onSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //にゃんぱす
    if(chatInput.match(/にゃんぱす/)){
      addMessage({text: chatInput, sender: "自分" })
      setChatInput("");
      addRenchonMessage({text: "にゃんぱすー", sender: "れんちょん"})
      return
    }
    //占い
    if(chatInput.match(/(?:(?:うらな|占)って|おみくじ)/)){
      addMessage({text: chatInput, sender: "自分" })
      setChatInput("");
      addRenchonMessage({text: pickOmikuji(), sender: "れんちょん"})
      return
    }
    //じゃんけん
    if(chatInput.match(/(?:[ぐぱグパ]ー|ちょき|チョキ)/)){
      addMessage({ text: chatInput, sender: "自分" })
      setChatInput("");
      addRenchonMessage({text: doJanken(chatInput), sender: "れんちょん"})
      return
    }
    addMessage({ text: chatInput, sender: "自分" });
    const sentence = await makeRenchonSentence();
    setChatInput("");
    addRenchonMessage({text: sentence, sender: "れんちょん" })
  };

  return (
      <div id="chat">
        <form
          id="chat_form"
          method="GET"
          onSubmit={(e) => {
            onSend(e);
          }}
        >
          <input
            id="chat_input"
            value={chatInput}
            required={true}
            maxLength={300}
            placeholder="メッセージを入力してね"
            onChange={(event) => setChatInput(event.target.value)}
          />
          <button type="submit" className="btn" id="chat_send_btn">
            送信
          </button>
        </form>
        {
          messages.map((message, i) => {
            return (
              <div key={i} className="renchon_balloon">
                {message.sender === "れんちょん" && (
                  <div>
                    <div className="renchon_faceicon">
                      <img src="./renchon.jpg" />
                    </div>
                    <div className="renchon_chatting">
                      <div className="renchon_says">
                        <p>{message.text}</p>
                      </div>
                    </div>
                  </div>
                )}
                {message.sender === "自分" && (
                  <div className="my_balloon">
                    <p>{message.text}</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
  );
};
