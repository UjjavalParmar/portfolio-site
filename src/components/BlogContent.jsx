import React, { Children } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { safeImageSrc } from '../lib/blog-model'

function codeLabels() {
  return tree => {
    for (const node of tree.children) {
      if (node.type === 'code' && node.meta) node.data = { hProperties: { 'data-filename': node.meta.slice(0,160) } }
    }
  }
}

export function previewImageSrc(src, admin = false) {
  const safe = safeImageSrc(src)
  if (!safe || !admin || !safe.startsWith('/blog/media/')) return safe
  const [, , , slug, filename] = safe.split('/')
  return '/api/admin/posts/' + slug + '/media?filename=' + encodeURIComponent(filename)
}

export default function BlogContent({ body = '', mediaPreview = false }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm, codeLabels]} skipHtml components={{
    h1: ({children}) => <h2 className="h2 h2--sm">{children}</h2>,
    h2: ({children}) => <h2 className="h2 h2--sm">{children}</h2>,
    h3: ({children}) => <h3 className="h3-card">{children}</h3>,
    h4: ({children}) => <h4 className="h3-step">{children}</h4>,
    a: ({children,href}) => <a href={href} rel="noopener noreferrer">{children}</a>,
    img: ({src,alt,title}) => {
      const safe = previewImageSrc(src,mediaPreview)
      if (!safe) return null
      return <span className="blog-image"><img src={safe} alt={alt || ''} loading="lazy" referrerPolicy="no-referrer" />{title && <span className="caption">{title}</span>}</span>
    },
    pre: ({children}) => {
      const code = Children.toArray(children)[0]
      const filename = code?.props?.['data-filename']
      return <div className="blog-code">{filename && <div className="blog-code-label">{filename}</div>}<pre tabIndex={0} aria-label={filename ? 'Code: ' + filename : 'Code example'}>{children}</pre></div>
    },
    code: ({children,className,...props}) => <code className={className} data-filename={props['data-filename']}>{children}</code>,
  }}>{body}</ReactMarkdown>
}
