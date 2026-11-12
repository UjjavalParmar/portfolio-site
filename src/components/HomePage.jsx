import Nav from './Nav'
import Footer from './Footer'
import Hero from './home/Hero'
import Metrics from './home/Metrics'
import Work from './home/Work'
import Experience from './home/Experience'
import Stack from './home/Stack'
import ContactBlock from './home/ContactBlock'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        <Work />
        <Experience />
        <Stack />
        <ContactBlock />
      </main>
      <Footer />
    </>
  )
}
