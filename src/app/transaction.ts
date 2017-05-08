export class Transaction {
  id: number;             // Internal ID for database tracking purposes
  txId: string;           // TransactionID on the blockchain
  dateInitiated: Date;    // Time and Date the purchase was initiatied
  dateConfirmed: Date;    // Time and Date the purchase was confirmed
  mcPurchased: number;    // Number of Musicoins that the payment purchased
  btcSent: number;        // Number of Bitcoins sent by the user 
  mcPriceBtc: number;     // Price in BTC of MC at the time of the transaction
  btcAddress: string;     // Address that the BTC was sent to
  status: string;         // Status of the Transaction (pending, confirmed, refused, refunded, etc)
}
