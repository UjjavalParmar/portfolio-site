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
        parts.push(<span key={key} style={{ color: 'var(--code-dec)' }}>{token}</span>)
      }
      // f-strings
      else if (token.startsWith('f"') || token.startsWith("f'")) {
        parts.push(<span key={key} style={{ color: 'var(--code-str)' }}>{token}</span>)
      }
      // Strings
      else if (token.startsWith('"') || token.startsWith("'")) {
        parts.push(<span key={key} style={{ color: 'var(--code-str)' }}>{token}</span>)
      }
      // Keywords
      else if (keywords.includes(token)) {
        parts.push(<span key={key} style={{ color: 'var(--code-kw)' }}>{token}</span>)
      }
      // Builtins / known types
      else if (builtins.includes(token)) {
        parts.push(<span key={key} style={{ color: 'var(--code-type)' }}>{token}</span>)
      }
      // Function calls (word followed by paren in original)
      else if (/^\w+$/.test(token) && remaining.charAt(match.index + token.length) === '(') {
        parts.push(<span key={key} style={{ color: 'var(--code-fn)' }}>{token}</span>)
      }
      else {
        parts.push(<span key={key}>{token}</span>)
      }
    }

    if (comment) {
      parts.push(<span key={`${lineIdx}-comment`} style={{ color: 'var(--code-cmt)', fontStyle: 'italic' }}>{comment}</span>)
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
        <figure>
          <div
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              border: '1px solid var(--line)',
              overflow: 'hidden',
            }}
          >
            <Image
              src={url}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {value.caption && (
            <figcaption className="caption" style={{ marginTop: '10px' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    code: ({ value }) => (
      <div style={{ margin: '32px 0' }}>
        {value.filename && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--code-bg)',
              border: '1px solid var(--line)',
              borderBottom: 'none',
              padding: '10px 16px',
              font: '400 11px/1 var(--font-mono), monospace',
              letterSpacing: '.14em',
              color: 'var(--fg3)',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>{value.filename}</span>
            {value.language && (
              <span style={{ marginLeft: 'auto', textTransform: 'uppercase' }}>
                {value.language}
              </span>
            )}
          </div>
        )}
        <pre style={{ margin: 0 }}>
          <code
            style={{
              font: '400 13px/1.7 var(--font-mono), monospace',
              color: 'var(--code-fg)',
            }}
          >
            {highlightCode(value.code, value.language)}
          </code>
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
      <code
        style={{
          background: 'var(--panel)',
          border: '1px solid var(--line)',
          color: 'var(--fg)',
          padding: '2px 6px',
          fontSize: '.9em',
        }}
      >
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2
        className="h2 h2--sm"
        style={{
          color: 'var(--fg)',
          margin: '48px 0 16px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="h3-card" style={{ color: 'var(--fg)', margin: '36px 0 12px' }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="h3-step" style={{ color: 'var(--fg)', margin: '28px 0 10px' }}>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: '2px solid var(--accent)',
          background: 'var(--panel)',
          padding: '20px 24px',
          margin: '32px 0',
          color: 'var(--fg)',
        }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p style={{ margin: '0 0 20px' }}>{children}</p>,
  },
}

export default function PortableTextRenderer({ value }) {
  return <PortableText value={value} components={components} />
}
