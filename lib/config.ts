export const CONFIG = {
  // Search settings
  search: {
    resultsPerPage: 10,
    maxSelectableResults: 3,
    provider: 'duckduckgo' as const,
  },

  // AI Platform settings - Only Ollama models
  platforms: {
    ollama: {
      enabled: true,
      models: {
        'deepseek-v3.1:671b-cloud': {
          enabled: true,
          label: 'DeepSeek V3.1 671B Cloud',
        },
        'gpt-oss:20b-cloud': {
          enabled: true,
          label: 'GPT OSS 20B Cloud',
        },
        'gpt-oss:120b-cloud': {
          enabled: true,
          label: 'GPT OSS 120B Cloud',
        },
        'kimi-k2:1t-cloud': {
          enabled: true,
          label: 'Kimi K2 1T Cloud',
        },
        'qwen3-coder:480b-cloud': {
          enabled: true,
          label: 'Qwen3 Coder 480B Cloud',
        },
        'glm-4.6:cloud': {
          enabled: true,
          label: 'GLM-4.6 Cloud',
        },
        'minimax-m2:cloud': {
          enabled: true,
          label: 'MiniMax M2 Cloud',
        },
      },
    },
  },
} as const
