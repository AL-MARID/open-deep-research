declare module 'duckduckgo-search' {
  interface DuckDuckGoSearchResult {
    href: string;
    title: string;
    body: string;
    date?: string;
  }

  interface DuckDuckGoSearchOptions {
    max_results?: number;
  }

  export default function duckduckgo_search(
    query: string,
    options?: DuckDuckGoSearchOptions
  ): Promise<DuckDuckGoSearchResult[]>;
}