import crypto from "crypto";

export function generateServerSeed() {
  return crypto.randomBytes(32).toString("hex");
}

export function hash(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function getWinnerIndex(
  serverSeed: string,
  eventId: string,
  participantsHash: string,
  participantCount: number,
) {
  const input = `${serverSeed}:${eventId}:${participantsHash}`;

  const hashHex = hash(input);

  const randomNumber = BigInt(`0x${hashHex}`);

  return Number(randomNumber % BigInt(participantCount));
}
