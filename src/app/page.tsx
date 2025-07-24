import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Technologies from '@/components/sections/Technologies'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import PageLoader from '@/components/ui/PageLoader'
import ContentWrapper from '@/components/layout/ContentWrapper'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function Home() {
  return (
    <PageLoader>
      <ContentWrapper>
        <main>
          <Hero />
          <About />
          <Experience />
          <Technologies />
          <Projects />
          <Contact />
        </main>
        <ScrollToTop />
      </ContentWrapper>
    </PageLoader>
  )
}
