import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { popularFaq, popularTable } from './src/lib/popular.js'

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

// 결과는 기기를 고른 뒤 자바스크립트로 그려져서, AI 크롤러는 이 페이지에서 답을 못 찾았습니다.
// 빌드 때 '자주 찾는 조합' 과 질문 몇 개를 <noscript> 안에 글자로 적어 둡니다.
// 화면에는 나오지 않습니다(2026-11-26 쭈뉘님: 칸이 보이면 지저분하다). 자바스크립트를 끈 사람에게만 보입니다.
function popularHtml() {
  return {
    name: 'popular-pairs-html',
    transformIndexHtml(html) {
      const { audio, rows } = popularTable()
      const faq = popularFaq()
      if (!rows.length) return html
      const lines = rows
        .flatMap((r) => r.cells.map((c) => `<li>${esc(r.label)} + ${esc(c.audioLabel)}: ${esc(c.codec)}, ${esc(c.detail)}</li>`))
        .join('')
      const qa = faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')
      const block = `\n      <h2>자주 찾는 조합</h2><ul>${lines}</ul>${qa ? `<h2>자주 묻는 질문</h2>${qa}` : ''}\n    </noscript>`
      return html.replace('</noscript>', block)
    },
  }
}

// base: './' 로 두어야 빌드 결과가 저장소 루트에서 그대로 서빙됩니다.
export default defineConfig({
  plugins: [react(), popularHtml()],
  base: './',
  build: { outDir: 'dist', emptyOutDir: true },
})
