type SentenceRensponse = {
    sentence: string;
};
  
enum Sender {
    ME,
    RENCHON
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