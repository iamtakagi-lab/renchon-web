import { API_ENDPOINT, JANKEN, OMIKUJI } from "./consts";
import { SentenceRensponse } from "./types";

const randomPick = <T> (array: Array<T>) => array[Math.floor(Math.random() * array.length)]

const makeRenchonSentence = async () => {
    const { sentence } = (await fetch(`${API_ENDPOINT}/make_sentence`).then(
      (res) => res.json()
    )) as SentenceRensponse;
    return sentence;
};

const pickOmikuji = (): string => {
    const pick = randomPick(OMIKUJI)
    return `${pick}なん！`
}

const doJanken = (value: string): string => {
    const pick = randomPick(JANKEN)
    value = value.replace("ぐー", "グー").replace("ちょき", "チョキ").replace("ぱー", "パー")
    let response = ""
    // あいこ
    if (value.includes(pick)){ 
        response = `${pick}なん！あいこなん！`
    }
    // 勝ちパターン
    if (pick === "グー" && value.includes("チョキ") || pick === "チョキ" && value.includes("パー") || pick === "パー" && value.includes("グー")){
        response = `${pick}なん！うちの勝ちなん！`
    }
    // 負けパターン
    if (pick === "グー" && value.includes("パー") || pick === "チョキ" && value.includes("グー") || pick == "パー" && value.includes("チョキ")){
        response = `${pick}なん！うちの負けなん！`
    }
    console.log(response)
    return response
}

export { makeRenchonSentence, pickOmikuji, doJanken }
