import { Handler } from '@netlify/functions'

const handler: Handler = async (event) => {
  const target = new URL(event.queryStringParameters.url || 'https://google.com')
  const response = await fetch(target.toString(), {
    headers: {
      'User-Agent': event.headers['user-agent'] || 'Mozilla/5.0'
    }
  })
  
  const body = await response.text()
  
  // Basic HTML rewrite to make relative links work
  const html = body.replace(
    /href="\//g, `href="${target.origin}/`
  ).replace(/src="\//g, `src="${target.origin}/`)
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html
  }
}

export { handler }
