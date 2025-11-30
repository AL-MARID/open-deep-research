import ollama from 'ollama'

export async function generateWithOllama(
  systemPrompt: string,
  model: string
): Promise<string> {
  const response = await ollama.chat({
    model: model.replace('ollama__', ''),
    messages: [{ role: 'user', content: systemPrompt }],
  })
  const content = response.message.content
  if (!content) {
    throw new Error('No response content from Ollama')
  }
  return content
}

export async function generateWithModel(
  systemPrompt: string,
  platformModel: string
): Promise<string> {
  const [platform, model] = platformModel.split('__')

  switch (platform) {
    case 'ollama':
      return generateWithOllama(systemPrompt, model)
    default:
      throw new Error('Invalid platform specified')
  }
}
