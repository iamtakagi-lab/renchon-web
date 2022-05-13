import { API_BASE_URL } from "./consts";
import { SentenceRensponse } from "./types";

export const makeApiUrl = (path: string) => new URL(`${API_BASE_URL}${path}`).href;

export const makeSentence = async () => {
    const { sentence } = (await fetch(
      `${new URL(API_BASE_URL).href}/make_sentence`
    ).then((res) => res.json())) as SentenceRensponse;
    return sentence;
};