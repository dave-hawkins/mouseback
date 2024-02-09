import { ThemeToggle } from "../theme-toggle"

export default function Footer() {
  return (
    <footer className="container ">
      <div className="mx-auto max-w-7xl py-12 md:flex md:items-center md:justify-between ">
        <div className="flex justify-center space-x-6 text-base text-muted-foreground md:order-2">
          <a href="https://github.com/dave-hawkins/mouseback">
            <span>GitHub</span>
          </a>
          <a href="mailto:hi@mouseback.app">
            <span>Contact us</span>
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-base leading-5 text-muted-foreground">
            &copy; 2023 Mouseback. All rights reserved.
          </p>
        </div>
      </div>
      <div className="fixed  bottom-4 right-4">
        <ThemeToggle />
      </div>
    </footer>
  )
}
