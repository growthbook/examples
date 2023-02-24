import { Context, GrowthBook } from '@growthbook/growthbook'
import { AppFeatures } from './generated-types/app-features'
import './style.css'
import typescriptLogo from './typescript.svg'

declare global {
  interface Window {
    growthBook?: GrowthBook<AppFeatures>
  }
}

async function setupGrowthBook() {
  const response = await fetch('https://cdn.growthbook.io/api/features/java_NsrWldWd5bxQJZftGsWKl7R2yD2LtAK8C8EUYh9L8')
  const { features } = await response.json()

  // Getting pretend user data from the URL
  const params = new URLSearchParams(window.location.search)

  const context: Context = {
    features,
    attributes: {
      id: "user-abc123",
      country: params.get('country') || 'canada',
    },
  };

  window.growthBook = new GrowthBook<AppFeatures>(context);

  const bannerTextButton = document.getElementById('banner-text-button')
  if (!bannerTextButton) return

  bannerTextButton.removeAttribute('disabled')
  bannerTextButton.innerText = "Load Banner Text"
}

function setupBannerButton() {
  const bannerTextButton = document.getElementById('banner-text-button')
  if (!bannerTextButton) return

  bannerTextButton.addEventListener('click', () => {
    if (!window.growthBook) return

    const heading = document.getElementById('title')
    if (!heading) return

    heading.innerText = window.growthBook.getFeatureValue('banner_text', 'Unknown Banner Text')
  })
}


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <img src="/vite.svg" class="logo" alt="Vite logo" />
  
    <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    
    <h1 id="title">Vite + TypeScript</h1>
    <div class="card">
      <button disabled="disabled" id="banner-text-button" type="button">
        ⏳ GrowthBook is Loading...
      </button>
    </div>

    <p class="read-the-docs">
      Click on the "Load Banner Text" button to use GrowthBook
    </p>
    <p class="read-the-docs">
      You can also pass <code>?country=france|spain</code> in the URL query params.
    </p>
  </div>
`

setupGrowthBook()
setupBannerButton()
