export const URL_DEBUG: string = import.meta.env.VITE_URL_DEBUG || 'http://134.209.32.159';
export const API_BASE: string = ':8080/v1/';
export const TESTNET_SEED_NODES = 'https://raw.githubusercontent.com/0LNetworkCommunity/seed-peers/main/fullnode_seed_playlist_testnet.json';

export const makeUrl = (): string => {
  return URL_DEBUG.concat(API_BASE);
};