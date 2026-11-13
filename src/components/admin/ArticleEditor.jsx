'use client'
import { useRef, useState } from 'react'
import BlogContent, { previewImageSrc } from '../BlogContent'
import { estimateReadingTime } from '../../lib/blog'

export default function ArticleEditor({ record, draft, slug, dirty, busy, onChange, onSlug, onSave, onUpload, onBack, onReload }) {
  const [pane,setPane] = useState('write')
  const [theme,setTheme] = useState('dark')
  const bodyRef = useRef(null)
  const uploadRef = useRef(null)
  const published = Boolean(record?.document.published)
  const image=previewImageSrc(draft.featuredImage?.src,true)
  function format(kind) {
    const field=bodyRef.current, start=field.selectionStart,end=field.selectionEnd
    const selected=field.value.slice(start,end)||'text', fence=String.fromCharCode(96).repeat(3)
    const insert={heading:'\n## '+selected+'\n',bold:'**'+selected+'**',italic:'*'+selected+'*',code:'\n'+fence+'bash\n'+selected+'\n'+fence+'\n',link:'['+selected+'](https://example.com)'}[kind]
    onChange('body',field.value.slice(0,start)+insert+field.value.slice(end))
    requestAnimationFrame(()=>{field.focus();field.setSelectionRange(start+insert.length,start+insert.length)})
  }
  const slugHint=slug||'your-article-slug'
  return <section className="fade" aria-busy={busy}>
    <div className="editor-top"><button className="back" onClick={onBack} disabled={busy}>← All articles</button><div className="editor-actions"><span className="save-state" aria-live="polite">{busy?'Saving…':dirty?'Unsaved changes':'All changes saved'}</span><button className="button" disabled={busy} onClick={()=>onSave('save')}>Save draft</button><button className="button primary" disabled={busy} onClick={()=>onSave('publish')}>{published?'Publish update':'Publish'} <span>↗</span></button></div></div>
    <div className="editor-heading"><h1>{record?'Edit article':'New article'}</h1><span className={'badge '+(published?'published':'draft')}>{published?'Published':'Draft'}</span></div>
    <div className="editor-meta">YOUR WORKSPACE / ARTICLES / {slugHint}</div>
    <div className="mobile-switch" role="group" aria-label="Editor view">{['write','preview'].map(value=><button key={value} className={pane===value?'active':''} aria-pressed={pane===value} onClick={()=>setPane(value)}>{value==='write'?'Write':'Preview'}</button>)}</div>
    <div className="editor-grid" data-pane={pane}>
      <div className="compose"><div className="pane-header"><strong>The draft</strong><span>Markdown</span></div><div className="editor-form">
        <label className="field"><span className="field-label">Article title <small>Make it specific.</small></span><textarea className="title-input" rows={2} maxLength={120} value={draft.title} placeholder="What did you figure out?" onChange={e=>onChange('title',e.target.value)} disabled={busy} /></label>
        <label className="field"><span className="field-label">URL slug</span><input type="text" value={slug} maxLength={96} readOnly={Boolean(record)} placeholder="a-useful-devops-note" onChange={e=>onSlug(e.target.value)} disabled={busy} /><span className="hint">/blog/{slugHint}{record?' · Existing article URLs stay fixed.':''}</span></label>
        <label className="field"><span className="field-label">Short description <small>{draft.metaDescription.length} / 160</small></span><textarea rows={3} maxLength={160} value={draft.metaDescription} placeholder="Give someone a good reason to read." onChange={e=>onChange('metaDescription',e.target.value)} disabled={busy} /></label>
        <div className="field"><label className="field-label" htmlFor="article-markdown">Article body <small>{draft.body.trim().split(/\s+/).filter(Boolean).length} words</small></label><div className="body-field"><div className="format-tools" role="group" aria-label="Markdown formatting">{[['heading','H₂','Add heading'],['bold','B','Bold'],['italic','I','Italic'],['code','〈/〉','Add code block'],['link','↗','Add link']].map(([kind,label,title])=><button type="button" key={kind} aria-label={title} title={title} disabled={busy} onClick={()=>format(kind)}>{label}</button>)}<span className="format-label">.MD</span></div><textarea id="article-markdown" ref={bodyRef} className="markdown" spellCheck={false} maxLength={64000} value={draft.body} onChange={e=>onChange('body',e.target.value)} placeholder="Start with the problem. Show how you solved it." disabled={busy} /></div></div>
        <div className="field"><label className="field-label" htmlFor="article-image">Cover image <small>PNG, JPG, WebP · up to 2 MB</small></label><div className="cover-field">{image&&<img src={image} alt="" />}<div className="cover-info"><strong>{draft.featuredImage?.src.split('/').pop()||'No cover selected'}</strong><small>{record?'Upload an image for this article.':'Save this draft once to upload images.'}</small><button className="text-button" disabled={busy||!record} onClick={()=>uploadRef.current.click()}>Choose image ↗</button>{image&&<button className="text-button" disabled={busy} onClick={()=>onChange('featuredImage',null)} style={{marginLeft:16}}>Remove cover</button>}<input ref={uploadRef} type="file" id="article-image" accept="image/png,image/jpeg,image/webp" hidden onChange={e=>{const file=e.target.files?.[0];if(file)onUpload(file,'cover');e.target.value=''}} /></div></div>{draft.featuredImage&&<input type="text" className="small-text" value={draft.featuredImage.alt} maxLength={500} aria-label="Cover image alt text" placeholder="Describe the image for someone who can’t see it." onChange={e=>onChange('featuredImage',{...draft.featuredImage,alt:e.target.value})} disabled={busy} />}</div>
        <div className="field"><span className="field-label">Inline image</span><button className="button" onClick={()=>onUpload(null,'inline')} disabled={busy||!record}>Insert image into article ＋</button><p className="hint">Choose an image and add alt text before inserting it.</p></div>
        <label className="field"><span className="field-label">Topics <small>Separate with commas</small></span><input type="text" value={draft.tags.join(', ')} onChange={e=>onChange('tags',e.target.value.split(',').map(tag=>tag.trimStart()))} placeholder="DevOps, Kubernetes" disabled={busy} /></label>
      </div></div>
      <div className="preview-pane"><div className="pane-header"><strong>Reader preview</strong><div className="preview-actions" role="group" aria-label="Preview theme">{['dark','light'].map(value=><button key={value} className={theme===value?'active':''} aria-pressed={theme===value} onClick={()=>setTheme(value)}>{value==='dark'?'Dark':'Light'}</button>)}</div></div><article className={'article-preview '+(theme==='light'?'preview-light':'')}>
        <div className="preview-tags">{draft.tags.filter(Boolean).map((tag,i)=><span key={i}>{tag}</span>)}</div><h2 className="preview-title">{draft.title||'Your next engineering note.'}</h2><p className="preview-description">{draft.metaDescription||'Your short description will appear here.'}</p><div className="byline">{draft.author} · Draft preview · {estimateReadingTime(draft.body)} min read</div>{image&&<img className="preview-cover" src={image} alt={draft.featuredImage.alt} />}<div className="article-body preview-body"><BlogContent body={draft.body} mediaPreview /></div>
      </article></div>
    </div>
    <div className="editor-note"><span>Save draft keeps your live article unchanged.<br />Publish updates what readers see.</span><span>{record&&<button className="text-button" onClick={onReload} disabled={busy} style={{marginRight:20}}>Reload saved version</button>}{published&&<button className="text-button danger" onClick={()=>onSave('unpublish')} disabled={busy}>Unpublish article</button>}</span></div>
  </section>
}
