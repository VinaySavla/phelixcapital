import Link from 'next/link'
import legalDocuments from '../content/legal-documents.json'

function TextWithBreaks({ text }) {
  const lines = text.split('\n')

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ))
}

export default function LegalPage({ documentKey }) {
  const document = legalDocuments[documentKey]
  const content = []
  let listItems = []

  const flushList = (key) => {
    if (!listItems.length) return

    content.push(
      <ul key={`list-${key}`} className="mb-6 space-y-2.5 pl-5 text-[15px] leading-7 text-[#455363] marker:text-[#B47A22]">
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}><TextWithBreaks text={item} /></li>
        ))}
      </ul>
    )
    listItems = []
  }

  document.blocks.forEach((block, index) => {
    if (block.type === 'listItem') {
      listItems.push(block.text)
      return
    }

    flushList(index)

    if (block.type === 'heading') {
      content.push(
        <h2 key={index} className="mb-4 mt-11 scroll-mt-28 font-['DM_Serif_Display'] text-2xl font-normal leading-tight text-[#09223D] first:mt-0">
          {block.text}
        </h2>
      )
    } else if (block.type === 'subheading') {
      content.push(
        <h3 key={index} className="mb-3 mt-7 text-[17px] font-semibold text-[#15314D]">
          {block.text}
        </h3>
      )
    } else {
      content.push(
        <p key={index} className="mb-5 text-[15px] leading-7 text-[#455363]">
          <TextWithBreaks text={block.text} />
        </p>
      )
    }
  })
  flushList(document.blocks.length)

  return (
    <main className="min-h-screen bg-[#FAF6F1] font-['DM_Sans'] text-[#09223D]">
      <header className="border-b border-[#B47A22]/15 bg-[#FAF7F1]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/" aria-label="Phelix Capital home">
            <img src="/phelixcapitallogo.png" alt="Phelix Capital" className="h-14 w-auto" />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#455363] transition-colors hover:text-[#B47A22]">
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </div>
      </header>

      <section className="border-b border-[#B47A22]/10 bg-[linear-gradient(135deg,#F3EBDD_0%,#FBF8F2_60%,#F5EEDF_100%)] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#A66D18]">Phelix Capital</p>
          <h1 className="max-w-3xl font-['DM_Serif_Display'] text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-[#09223D] sm:text-5xl md:text-6xl">
            {document.title}
          </h1>
          <div className="mt-7 h-0.5 w-20 bg-[#B47A22]" />
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16">
        <article className="mx-auto max-w-4xl rounded-[28px] border border-[#B47A22]/15 bg-[#FFFDF9] px-6 py-9 shadow-[0_24px_70px_rgba(9,34,61,0.07)] sm:px-10 sm:py-12 md:px-14">
          {content}
        </article>
      </section>

      <footer className="px-4 pt-4 sm:px-6">
        <div className="rounded-t-[28px] bg-[#09223D] px-6 py-9 text-[#F8F3E9]">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 text-sm md:flex-row md:items-end">
            <div>
              <img src="/phelixcapitallogodark.png" alt="Phelix Capital" className="mb-5 h-12 w-auto" />
              <p className="text-[#B9C2CA]">ARN 358543 | Valid through 09 April 2029</p>
            </div>
            <p className="max-w-2xl leading-6 text-[#D8DEE3]">
              Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
