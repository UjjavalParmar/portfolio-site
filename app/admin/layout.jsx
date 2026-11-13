import './admin.css'

export const metadata = { title: 'Writing desk', robots: { index:false, follow:false } }
export default function AdminLayout({children}) { return <div className="blog-admin">{children}</div> }
