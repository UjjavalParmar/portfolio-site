import Nav from './Nav'
import Footer from './Footer'
import Hero from './home/Hero'
import Metrics from './home/Metrics'
import Work from './home/Work'
import HowIWork from './home/HowIWork'
import Shift from './home/Shift'
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
        <HowIWork />
        <Shift />
        <Stack />
        <ContactBlock />
      </main>
      <Footer />
    </>
  )
}
