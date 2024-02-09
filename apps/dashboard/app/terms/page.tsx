import Footer from "@repo/dashboard/components/marketing/footer"
import { SiteHeader } from "@repo/dashboard/components/marketing/site-header"

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <SiteHeader />
      <div className="mx-auto flex max-w-2xl flex-col items-start p-4">
        <h1 className="text-2xl font-bold">Terms of Service</h1>

        <h2 className="mt-4 text-xl font-semibold">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the services provided by Mouseback, Ltd.
          ("Mouseback"), you agree to be bound by these Terms of Service
          ("Terms"). If you do not agree to these Terms, you may not use the
          services.
        </p>

        <h2 className="mt-4 text-xl font-semibold">2. Modification of Terms</h2>
        <p>
          Mouseback reserves the right, at its discretion, to modify these Terms
          at any time. You are responsible for reviewing and becoming familiar
          with any modifications. Your continued use of the services following
          the posting of any changes to the Terms constitutes acceptance of
          those changes.
        </p>

        <h2 className="mt-4 text-xl font-semibold">3. Use of Services</h2>
        <p>
          Mouseback provides a variety of services, and additional guidelines or
          rules may apply. Your use of Mouseback's services is subject to those
          additional guidelines and rules, which are incorporated into these
          Terms by reference.
        </p>

        <h2 className="mt-4 text-xl font-semibold">4. User Conduct</h2>
        <p>
          You are responsible for all your activity in connection with the
          services. Any fraudulent, abusive, or otherwise illegal activity may
          be grounds for termination of your right to access or use the
          services.
        </p>

        <h2 className="mt-4 text-xl font-semibold">5. Intellectual Property</h2>
        <p>
          The services and their entire contents, features, and functionality
          (including but not limited to all information, software, text,
          displays, images, video, and audio, and the design, selection, and
          arrangement thereof) are owned by Mouseback, its licensors, or other
          providers of such material and are protected by copyright, patent,
          trademark, and other intellectual property or proprietary rights laws.
        </p>

        <h2 className="mt-4 text-xl font-semibold">6. Termination</h2>
        <p>
          Mouseback may terminate your access to all or any part of the services
          at any time, with or without cause, with or without notice, effective
          immediately.
        </p>

        <h2 className="mt-4 text-xl font-semibold">
          7. Disclaimer of Warranties
        </h2>
        <p>
          The services are provided "as is", without warranty of any kind,
          express or implied. Mouseback does not warrant that the services will
          be uninterrupted or error-free.
        </p>

        <h2 className="mt-4 text-xl font-semibold">
          8. Limitation of Liability
        </h2>
        <p>
          In no event will Mouseback, or its directors, employees, agents,
          partners, suppliers, or content providers, be liable for any indirect,
          incidental, punitive, consequential, special, or exemplary damages of
          any kind, including but not limited to damages resulting from your
          access to, use of, or inability to access or use the services.
        </p>

        <h2 className="mt-4 text-xl font-semibold">9. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the jurisdiction in which Mouseback is located, without regard
          to its conflict of law provisions.
        </p>

        <h2 className="mt-4 text-xl font-semibold">10. Entire Agreement</h2>
        <p>
          These Terms constitute the entire agreement between you and Mouseback
          regarding the use of the services, superseding any prior agreements
          between you and Mouseback relating to your use of the services.
        </p>

        <h2 className="mt-4 text-xl font-semibold">Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at
          support@mouseback.com.
        </p>
      </div>
      <Footer />
    </div>
  )
}
