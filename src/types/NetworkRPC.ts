import { Token } from "./token";

export type NetworkRPC = {
  name: string;
  rpc: string;
  chainID: string;
  tokens: Token[];
  blockExplorer: string;
};
