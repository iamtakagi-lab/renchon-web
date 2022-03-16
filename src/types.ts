type SentenceRensponse = {
    sentence: string;
};
  
enum Sender {
    Me,
    Renchon
}
  
type Message = {
    sender: Sender;
    text: string;
};

export {
    SentenceRensponse,
    Sender,
    Message
}