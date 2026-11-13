'use client'
import { useState } from 'react'
import { previewImageSrc } from '../BlogContent'

export default function Articles({ posts, onEdit, onNew, onImport, onRefresh, busy }) {
  const [filter,setFilter] = useState('all')
  const [search,setSearch] = useState('')
  const live = posts.filter(record=>record.document.published).length
  const visible = posts.filter(({document}) => (filter === 'all' || Boolean(document.published) === (filter === 'published')) && document.draft.title.toLowerCase().includes(search.toLowerCase()))
  return <section className="fade">
    <p className="eyebrow">[ your words, your corner of the web ]</p>
    <div className="heading-row"><div><h1 className="display">Engineering notes.</h1><p className="intro">Write it down. Make it useful. Ship when it’s ready.</p></div><button className="button primary" onClick={onNew} disabled={busy}>New article <span className="arrow">＋</span></button></div>
    <div className="overview"><div className="overview-item"><b>{String(posts.length).padStart(2,'0')}</b>Articles</div><div className="overview-item"><b>{String(live).padStart(2,'0')}</b>Published</div><div className="overview-item"><b>{String(posts.length-live).padStart(2,'0')}</b>Drafts</div><div className="overview-note"><span className="dot" />Your drafts stay private.</div></div>
    <div className="list-tools"><div className="tabs" role="group" aria-label="Filter articles">{[['all','All articles'],['published','Published'],['draft','Drafts']].map(([value,label])=><button key={value} className={'tab '+(filter===value?'active':'')} aria-pressed={filter===value} onClick={()=>setFilter(value)}>{label}{value==='all'&&<span>{posts.length}</span>}</button>)}</div><label className="search"><span aria-hidden="true">⌕</span><input aria-label="Search articles" placeholder="Find an article…" value={search} onChange={e=>setSearch(e.target.value)} /></label></div>
    <div className="articles-head"><span>Article</span><span>Status</span><span>Updated</span><span /></div>
    <div>{visible.map(record=>{
      const doc=record.document
      const image=previewImageSrc(doc.draft.featuredImage?.src,true)
      return <button className="article-row" key={doc.slug} onClick={()=>onEdit(record)} style={{width:'100%',textAlign:'left'}} aria-label={'Edit '+doc.draft.title}><span className="article-main">{image?<img className="thumbnail" src={image} alt="" />:<span className="thumbnail draft-thumb" aria-hidden="true">[ / ]</span>}<span><span className="article-title" style={{display:'block'}}>{doc.draft.title}</span><span className="article-sub" style={{display:'block'}}>{doc.draft.tags.join(', ')}</span></span></span><span className={'badge '+(doc.published?'published':'draft')}>{doc.published?'● Published':'◌ Draft'}</span><span className="date">{new Date(doc.updatedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span><span className="row-arrow">↗</span></button>
    })}</div>
    {!visible.length&&<div className="empty">{posts.length?'No articles match. Try another search.':<><p>Your writing desk is ready.</p><button className="button" onClick={onImport} disabled={busy}>Import the Bitbucket article ↗</button></>}</div>}
    <div className="section-foot"><span>Showing {visible.length} {visible.length===1?'article':'articles'}</span><span>Only published articles appear on your site.</span></div>
    <footer className="workspace-footer"><span>U/P — WRITING DESK</span><button className="text-button" onClick={onRefresh} disabled={busy}>Refresh articles ↻</button></footer>
  </section>
}
