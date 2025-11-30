import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { query, isTestQuery = false } = body

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    // Return dummy results for test queries
    if (query.toLowerCase() === 'test' || isTestQuery) {
      return NextResponse.json({
        webPages: {
          value: [
            {
              id: 'test-1',
              url: 'https://example.com/test-1',
              name: 'Test Result 1',
              snippet: 'This is a test search result for testing purposes.',
            },
            {
              id: 'test-2',
              url: 'https://example.com/test-2',
              name: 'Test Result 2',
              snippet: 'Another test result with different content.',
            },
            {
              id: 'test-3',
              url: 'https://example.com/test-3',
              name: 'Test Result 3',
              snippet: 'A third test result focusing on research.',
            },
          ],
        },
      })
    }

    try {
      // Use SerpAPI for better results (fallback to DuckDuckGo)
      const serpApiKey = process.env.SERPAPI_KEY
      
      let searchResults: any[] = []
      
      // Try SerpAPI first if available
      if (serpApiKey) {
        try {
          const serpResponse = await fetch(
            `https://serpapi.com/search.json?engine=duckduckgo&q=${encodeURIComponent(query)}&api_key=${serpApiKey}`,
            {
              headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            }
          )
          
          if (serpResponse.ok) {
            const serpData = await serpResponse.json()
            
            if (serpData.organic_results) {
              searchResults = serpData.organic_results.map((result: any, index: number) => ({
                href: result.link,
                title: result.title,
                body: result.snippet || '',
                id: `serp-${Date.now()}-${index}`
              }))
            }
          }
        } catch {
          console.log('SerpAPI failed, falling back to DuckDuckGo')
        }
      }
      
      // Fallback to DuckDuckGo
      if (searchResults.length === 0) {
        // Method 1: DuckDuckGo Instant Answer API
        const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1&show_redirects=0&no_cookie_redirects=1`
        
        const response = await fetch(searchUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          
          // Extract from Abstract
          if (data.AbstractURL && data.Heading) {
            searchResults.push({
              href: data.AbstractURL,
              title: data.Heading,
              body: data.AbstractText || '',
              id: `ddg-abstract-${Date.now()}`
            })
          }
          
          // Extract from RelatedTopics
          if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
            data.RelatedTopics.slice(0, 9).forEach((topic: any, index: number) => {
              if (topic.FirstURL && topic.Text) {
                searchResults.push({
                  href: topic.FirstURL,
                  title: topic.Text.split(' - ')[0] || topic.Text,
                  body: topic.Text,
                  id: `ddg-topic-${Date.now()}-${index}`
                })
              }
            })
          }
          
          // Extract from Results
          if (data.Results && Array.isArray(data.Results)) {
            data.Results.forEach((result: any, index: number) => {
              if (result.FirstURL && result.Text) {
                searchResults.push({
                  href: result.FirstURL,
                  title: result.Text.split(' - ')[0] || result.Text,
                  body: result.Text,
                  id: `ddg-result-${Date.now()}-${index}`
                })
              }
            })
          }
        }
      }
      
      // Method 2: DuckDuckGo HTML Search as ultimate fallback
      if (searchResults.length === 0) {
        try {
          const htmlUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}&kl=us-en`
          
          const htmlResponse = await fetch(htmlUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
              'Cache-Control': 'no-cache'
            }
          })
          
          if (htmlResponse.ok) {
            const html = await htmlResponse.text()
            
            // Enhanced regex patterns
            const patterns = [
              /<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/gi,
              /<h3[^>]*><a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a><\/h3>/gi,
              /<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a>/gi
            ]
            
            for (const pattern of patterns) {
              let match
              while ((match = pattern.exec(html)) !== null && searchResults.length < 10) {
                const href = match[1]
                const title = match[2]?.trim()
                
                if (href && title && 
                    !href.includes('duckduckgo.com') && 
                    !href.includes('reddit.com') &&
                    href.startsWith('http') &&
                    title.length > 10) {
                  
                  searchResults.push({
                    href,
                    title,
                    body: '',
                    id: `ddg-html-${Date.now()}-${searchResults.length}`
                  })
                }
              }
              if (searchResults.length > 0) break
            }
          }
        } catch (htmlError) {
          console.log('HTML search failed:', htmlError)
        }
      }
      
      // If still no results, return sample results
      if (searchResults.length === 0) {
        searchResults = [
          {
            href: 'https://www.google.com/search?q=' + encodeURIComponent(query),
            title: `Search for ${query}`,
            body: `Search results for ${query}`,
            id: `fallback-${Date.now()}`
          }
        ]
      }
      
      // Transform to expected format and limit to 10 results
      const transformedResults = {
        webPages: {
          value: searchResults.slice(0, 10).map((item: any, index: number) => ({
            id: item.id || `search-${Date.now()}-${index}`,
            url: item.href,
            name: item.title,
            snippet: item.body || '',
            publishedDate: undefined,
          })),
        },
      }

      return NextResponse.json(transformedResults)
    } catch (error: any) {
      console.error('Search error:', error)
      
      // Return basic fallback results
      return NextResponse.json({
        webPages: {
          value: [
            {
              id: 'fallback-1',
              url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
              name: `Search ${query} on Google`,
              snippet: `Unable to search DuckDuckGo. Click to search Google instead.`,
            },
            {
              id: 'fallback-2', 
              url: `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
              name: `Search ${query} on DuckDuckGo`,
              snippet: `Visit DuckDuckGo directly to search for ${query}.`,
            }
          ],
        },
      })
    }
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      {
        error: 'Search service temporarily unavailable',
      },
      { status: 500 }
    )
  }
}

