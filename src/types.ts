type SentenceRensponse = {
    sentence: string;
};
  
type Me = "自分";
  
type Renchon = "れんちょん";
  
type Sender = Me | Renchon;
  
type Message = {
    sender: Sender;
    text: string;
};

export {
    SentenceRensponse,
    Me,
    Renchon,
    Sender,
    Message
}