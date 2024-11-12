import { Props } from "../../main.tsx";

export function Hero({ gb }: Props) {
  const headline = gb?.getFeatureValue(
    "headline",
    "Revolutionize Your Finances with AI",
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 text-white">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-pretty">
                {headline}
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl">
                Harness the power of artificial intelligence to make smarter
                financial decisions. Join thousands of satisfied users today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors">
                Get Started
              </button>
              <button className="px-4 py-2 bg-transparent text-white font-medium rounded-md border border-white hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="550"
            src="/static/fintech-lg.webp"
            width="550"
          />
        </div>
      </div>
    </section>
  );
}
