export interface ICampus {

  [Symbol.iterator](): IterableIterator<ICampus>;
  id : number;
  nom? : string;
  //lstParticipants : IParticipant[]?;
}
