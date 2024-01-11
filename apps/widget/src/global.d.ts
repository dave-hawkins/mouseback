export interface Config {
  apiKey: string;
}

declare global {
  interface Window {
    mountMouseback: (config: Config) => void;
  }
}
