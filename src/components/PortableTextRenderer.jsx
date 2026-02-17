import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { sanityImageUrl } from '../lib/sanity'

// Simple syntax highlighting for Python code (no external deps)
function highlightCode(code, language) {
  if (!code) return code
  if (language !== 'python') {
    return <span>{code}</span>
  }

  const keywords = ['from', 'import', 'def', 'async', 'await', 'return', 'class', 'if', 'else', 'elif', 'for', 'in', 'not', 'and', 'or', 'is', 'None', 'True', 'False', 'raise', 'try', 'except', 'finally', 'with', 'as', 'pass', 'break', 'continue', 'lambda', 'yield']
  const builtins = ['str', 'int', 'float', 'bool', 'list', 'dict', 'set', 'tuple', 'print', 'len', 'range', 'type', 'isinstance', 'BaseModel', 'FastAPI', 'HTTPException', 'Depends', 'subprocess']

  const lines = code.split('\n')
  return lines.map((line, lineIdx) => {
    const parts = []
    let remaining = line
    let partIdx = 0

    // Comments
    const commentIdx = remaining.indexOf('#')
    let comment = ''
    if (commentIdx !== -1) {
      comment = remaining.slice(commentIdx)
      remaining = remaining.slice(0, commentIdx)
    }

    // Tokenize
    const tokenRegex = /(@\w+(?:\.\w+)*(?:\([^)]*\))?)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(f"(?:[^"\\]|\\.)*"|f'(?:[^'\\]|\\.)*')|(\b\w+\b)|([^\w\s]+|\s+)/g
    let match
    while ((match = tokenRegex.exec(remaining)) !== null) {
      const token = match[0]
      const key = `${lineIdx}-${partIdx++}`

      // Decorators
      if (token.startsWith('@')) {
        parts.push(<span key={key} className="text-[#f9e2af]">{token}</span>)
      }
      // f-strings
      else if (token.startsWith('f"') || token.startsWith("f'")) {
        parts.push(<span key={key} className="text-[#a6e3a1]">{token}</span>)
      }
      // Strings
      else if (token.startsWith('"') || token.startsWith("'")) {
        parts.push(<span key={key} className="text-[#a6e3a1]">{token}</span>)
      }
      // Keywords
      else if (keywords.includes(token)) {
        parts.push(<span key={key} className="text-[#cba6f7]">{token}</span>)
      }
      // Builtins / known types
      else if (builtins.includes(token)) {
        parts.push(<span key={key} className="text-[#89b4fa]">{token}</span>)
      }
      // Function calls (word followed by paren in original)
      else if (/^\w+$/.test(token) && remaining.charAt(match.index + token.length) === '(') {
        parts.push(<span key={key} className="text-[#89dceb]">{token}</span>)
      }
      else {
        parts.push(<span key={key}>{token}</span>)
      }
    }

    if (comment) {
      parts.push(<span key={`${lineIdx}-comment`} className="text-[#6c7086] italic">{comment}</span>)
    }

    return (
      <span key={lineIdx}>
        {parts}
        {lineIdx < lines.length - 1 ? '\n' : ''}
      </span>
    )
  })
}

const components = {
  types: {
    image: ({ value }) => {
      const url = sanityImageUrl(value)
      if (!url) return null

      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src={url}
              alt={value.alt || 'Blog image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-text-secondary mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-[#1e1e2e] rounded-t-lg px-4 py-2 text-xs text-gray-400 font-mono border border-[#313244] border-b-0 flex items-center gap-2">
            <span className="text-primary">{value.filename}</span>
            {value.language && (
              <span className="ml-auto text-gray-500 uppercase text-[10px] tracking-wider">{value.language}</span>
            )}
          </div>
        )}
        <pre
          className={`bg-[#1e1e2e] border border-[#313244] ${
            value.filename ? 'rounded-b-lg' : 'rounded-lg'
          } p-4 overflow-x-auto`}
        >
          <code className="text-sm font-mono text-[#cdd6f4] leading-relaxed">{
            highlightCode(value.code, value.language)
          }</code>
        </pre>
      </div>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const target = value?.blank ? '_blank' : undefined
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      return (
        <a href={value.href} target={target} rel={rel}>
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="text-primary bg-surface px-1.5 py-0.5 rounded text-sm">{children}</code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl font-semibold text-white mt-8 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-text-secondary">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
}

export default function PortableTextRenderer({ value }) {
  return <PortableText value={value} components={components} />
}
