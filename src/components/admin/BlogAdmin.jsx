'use client'
import { useEffect, useRef, useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import Articles from './Articles'
import ArticleEditor from './ArticleEditor'
import { previewImageSrc } from '../BlogContent'
import { imageType, safeImageSrc, validateSlug, validateSnapshot } from '../../lib/blog-model'

const emptyDraft = () => ({title:'',author:'Ujjaval Parmar',metaDescription:'',tags:[],body:'',featuredImage:null})
const fingerprint = (slug,draft) => JSON.stringify({slug,draft})

async function api(path,options={}) {
  const response=await fetch(path,{...options,cache:'no-store'})
  const data=await response.json().catch(()=>({error:'The request could not be completed. Please try again.'}))
  if(!response.ok) throw new Error(data.error || 'The request could not be completed.')
  return data
}

export default function BlogAdmin({authenticated,missing,initialPosts,initialError,authError}) {
  const [posts,setPosts]=useState(initialPosts)
  const [view,setView]=useState(authenticated?'articles':'login')
  const [record,setRecord]=useState(null)
  const [draft,setDraft]=useState(emptyDraft)
  const [slug,setSlug]=useState('')
  const [slugEdited,setSlugEdited]=useState(false)
  const [baseline,setBaseline]=useState(fingerprint('',emptyDraft()))
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState(initialError)
  const [toast,setToast]=useState('')
  const [confirm,setConfirm]=useState(null)
  const [upload,setUpload]=useState(null)
  const dialog=useRef(null)
  const dirty=fingerprint(slug,draft)!==baseline

  useEffect(()=>{
    function warn(event){if(dirty){event.preventDefault();event.returnValue=''}}
    window.addEventListener('beforeunload',warn)
    return ()=>window.removeEventListener('beforeunload',warn)
  },[dirty])
  useEffect(()=>{if(!toast)return;const timeout=setTimeout(()=>setToast(''),5500);return()=>clearTimeout(timeout)},[toast])
  useEffect(()=>{
    if((confirm||upload)&&!dialog.current.open)dialog.current.showModal()
    if(!confirm&&!upload&&dialog.current.open)dialog.current.close()
  },[confirm,upload])

  function leave(action) {
    if(busy)return
    if(dirty&&!window.confirm('You have unsaved edits. Leave this view without saving them?'))return
    action();setError('')
  }
  function openEditor(next=null) {
    const content=next?structuredClone(next.document.draft):emptyDraft()
    const nextSlug=next?.document.slug||''
    setRecord(next);setDraft(content);setSlug(nextSlug);setSlugEdited(false)
    setBaseline(fingerprint(nextSlug,content));setView('editor');setError('')
    window.scrollTo({top:0})
  }
  function change(field,value) {
    setDraft(current=>({...current,[field]:value}))
    if(field==='title'&&!record&&!slugEdited)setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,96))
  }
  function acceptRecord(saved) {
    setRecord(saved);setDraft(saved.document.draft);setSlug(saved.document.slug)
    setBaseline(fingerprint(saved.document.slug,saved.document.draft))
    setPosts(current=>[saved,...current.filter(item=>item.document.slug!==saved.document.slug)])
  }
  async function refresh() {
    setBusy(true);setError('')
    try{setPosts(await api('/api/admin/posts'))}
    catch(e){setError(e.message)}
    finally{setBusy(false)}
  }
  async function save(action) {
    setConfirm(null);setBusy(true);setError('')
    try {
      validateSlug(slug)
      const clean=validateSnapshot({...draft,tags:draft.tags.map(tag=>tag.trim()).filter(Boolean)})
      if(action==='publish')validateSnapshot({...clean,publishedAt:new Date().toISOString(),updatedAt:new Date().toISOString()},true)
      const saved=await api('/api/admin/posts/'+slug,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({draft:clean,action,sha:record?.sha||null})})
      acceptRecord(saved)
      setToast(action==='publish'?'Article published. Public caches may take up to a minute to update.':action==='unpublish'?'Article unpublished. Your draft is still here.':'Draft saved. The live article is unchanged.')
    } catch(e){setError(e.message)}
    finally{setBusy(false)}
  }
  async function reload() {
    if(dirty&&!window.confirm('Replace your unsaved edits with the version stored in GitHub?'))return
    setBusy(true);setError('')
    try{openEditor(await api('/api/admin/posts/'+slug))}
    catch(e){setError(e.message)}
    finally{setBusy(false)}
  }
  async function importOriginal() {
    if(!window.confirm('Copy the published Bitbucket article into your private content repository? Existing content will not be overwritten.'))return
    setBusy(true);setError('')
    try {
      const saved=await api('/api/admin/import',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})
      acceptRecord(saved);setToast('The Bitbucket article is ready to edit.')
    } catch(e){setError(e.message)}
    finally{setBusy(false)}
  }
  function requestUpload(file,mode) {
    setError('')
    if(!record){setError('Save this article as a draft before uploading images.');return}
    setUpload({file,mode,alt:''})
  }
  async function uploadImage(event) {
    event.preventDefault()
    if(!upload?.file||!upload.alt.trim()){setError('Choose an image and add its alt text.');return}
    setBusy(true);setError('')
    try {
      imageType(new Uint8Array(await upload.file.arrayBuffer()),upload.file.type)
      const form=new FormData();form.set('image',upload.file)
      const image=await api('/api/admin/posts/'+record.document.slug+'/media',{method:'POST',body:form})
      if(upload.mode==='cover')change('featuredImage',{src:image.src,alt:upload.alt.trim()})
      else change('body',draft.body+'\n\n!['+upload.alt.trim().replace(/[\[\]\\\n\r]/g,' ')+']('+image.src+')\n')
      setUpload(null);setToast('Image uploaded. Save the draft to keep this edit.')
    } catch(e){setError(e.message)}
    finally{setBusy(false)}
  }
  function mediaImages() {
    const map=new Map()
    for(const item of posts) {
      const content=item.document.draft
      const sources=[content.featuredImage?.src,...(content.body.match(/\/blog\/[a-zA-Z0-9/_-]+\.(?:webp|png|jpg|jpeg|svg)/g)||[])]
      for(const src of sources)if(safeImageSrc(src))map.set(src,{src,record:item})
    }
    return [...map.values()]
  }
  const navigate=next=>leave(()=>setView(next))
  return <>
    <div className="notice"><strong>WRITING DESK</strong><span className="divide">/</span><span>A private place for your engineering notes.</span></div>
    <div className="app">
      <aside className="sidebar" aria-label="Workspace navigation">
        <button className="brand" aria-label="Writing desk home" onClick={()=>navigate(authenticated?'articles':'login')}><span className="brand-mark">u/p</span><span className="brand-name">Ujjaval<br />Parmar</span></button>
        <div className="sidebar-label">Your workspace</div>
        <nav className="sidenav">{[['articles','▤','Articles'],['media','▧','Media']].map(([value,icon,label])=><button key={value} className={'navitem '+((view===value||(view==='editor'&&value==='articles'))?'active':'')} aria-current={view===value?'page':undefined} disabled={!authenticated||busy} onClick={()=>navigate(value)}><span aria-hidden="true">{icon}</span>{label}{value==='articles'&&authenticated&&<span className="navcount">{String(posts.length).padStart(2,'0')}</span>}</button>)}</nav>
        <div className="sidebar-bottom"><a className="external" href="/blog" target="_blank" rel="noopener noreferrer">View portfolio<span>↗</span></a><div className="profile"><img src="/ujjaval-parmar.jpeg" alt="" /><div><strong>Ujjaval Parmar</strong><small>{authenticated?'Owner workspace':'Sign-in required'}</small></div></div></div>
      </aside>
      <div className="workspace"><header className="topbar"><div className="crumb"><span>Writing desk</span><span>/</span><b>{{articles:'Articles',editor:'Article editor',media:'Media',login:'Sign in'}[view]}</b></div><div className="top-actions"><span className="private">♧ Private workspace</span>{authenticated&&<button className="top-button" disabled={busy} onClick={()=>leave(()=>signOut({callbackUrl:'/admin'}))}>Sign out ↗</button>}</div></header>
        <main className="content" id="main">
          {error&&<div className="desk-error" role="alert">{error}</div>}
          {authError&&view==='login'&&<div className="desk-error" role="alert">{authError==='AccessDenied'?'Only the owner GitHub account can open this workspace.':'Sign-in did not complete. Please try again.'}</div>}
          {view==='login'&&<section className="fade"><div className="login"><p className="eyebrow">[ a quiet place to write ]</p><span className="brand-mark">u/p</span><h1>Your writing.<br />Your workspace.</h1><p>A private desk for your engineering notes.<br />Sign in, pick up a draft, and publish when it’s ready.</p><button className="button primary" disabled={busy||missing.length>0} onClick={async()=>{setBusy(true);try{await signIn('github',{callbackUrl:'/admin'})}catch{setError('Sign-in could not start. Please try again.');setBusy(false)}}}>Continue with GitHub <span>↗</span></button><small>Only your GitHub account has access.</small>{missing.length>0&&<div className="desk-setup"><h2>Finish the editor setup</h2><p>Add these server environment variables in Vercel, then redeploy. The public portfolio remains available.</p><ul>{missing.map(name=><li key={name}><code>{name}</code></li>)}</ul><p>The README includes the GitHub app, private repository, and local setup steps.</p></div>}</div></section>}
          {authenticated&&view==='articles'&&<Articles posts={posts} onEdit={item=>leave(()=>openEditor(item))} onNew={()=>leave(()=>openEditor())} onImport={importOriginal} onRefresh={refresh} busy={busy} />}
          {authenticated&&view==='editor'&&<ArticleEditor record={record} draft={draft} slug={slug} dirty={dirty} busy={busy} onChange={change} onSlug={value=>{setSlugEdited(true);setSlug(value)}} onSave={action=>action==='save'?save(action):setConfirm(action)} onUpload={requestUpload} onBack={()=>navigate('articles')} onReload={reload} />}
          {authenticated&&view==='media'&&<section className="fade"><p className="eyebrow">[ proof, in pictures ]</p><div className="heading-row"><div><h1 className="display">The visual bits.</h1><p className="intro">Images and diagrams referenced by your articles.</p></div><button className="button" disabled={busy} onClick={()=>{if(record){setView('editor');requestUpload(null,'inline')}else if(posts[0]){openEditor(posts[0]);setUpload({file:null,mode:'inline',alt:''})}else setToast('Create and save an article to add images.')}}>Add image to article ＋</button></div><div className="media-grid">{mediaImages().map(image=><article className="media-card" key={image.src}><img src={previewImageSrc(image.src,true)} alt={image.record.document.draft.featuredImage?.src===image.src?image.record.document.draft.featuredImage.alt:'Article illustration'} /><div className="media-info">{image.src.split('/').pop()}<p>{image.record.document.draft.title}</p><button className="text-button" onClick={()=>leave(()=>openEditor(image.record))}>Open article ↗</button></div></article>)}</div>{!mediaImages().length&&<p className="empty">Upload an image from an article to see it here.</p>}</section>}
        </main>
      </div>
    </div>
    <dialog ref={dialog} aria-labelledby="editor-dialog-title" onCancel={event=>{if(busy){event.preventDefault();return}setConfirm(null);setUpload(null)}}>
      {upload?<form onSubmit={uploadImage}><h2 id="editor-dialog-title">Add an image</h2><p>For {record?.document.draft.title}. Images stay private until included in a published article.</p><label className="field"><span className="field-label">PNG, JPEG, or WebP · up to 2 MB</span><input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e=>setUpload(current=>({...current,file:e.target.files?.[0]||null}))} />{upload.file&&<span className="hint">{upload.file.name}</span>}</label><label className="field"><span className="field-label">Alt text</span><input type="text" value={upload.alt} maxLength={500} required disabled={busy} placeholder="Describe the image." onChange={e=>setUpload(current=>({...current,alt:e.target.value}))} /></label>{error&&<p role="alert" className="danger">{error}</p>}<div className="dialog-actions"><button className="button" type="button" disabled={busy} onClick={()=>setUpload(null)}>Cancel</button><button className="button primary" type="submit" disabled={busy||!upload.file}>{busy?'Uploading…':'Upload image ↗'}</button></div></form>:<><h2 id="editor-dialog-title">{confirm==='publish'?'Ready to publish?':'Unpublish this article?'}</h2><p>{confirm==='publish'?'Your current draft will replace the article readers see. Saved edits stay private until you publish them.':'The article will disappear from the public blog. Your draft stays in the writing desk.'}</p><div className="dialog-actions"><button className="button" disabled={busy} onClick={()=>setConfirm(null)}>Keep writing</button><button className="button primary" disabled={busy} onClick={()=>save(confirm)}>{confirm==='publish'?'Publish article ↗':'Unpublish article'}</button></div></>}
    </dialog>
    {toast&&<div className="toast" role="status">{toast}</div>}
  </>
}
