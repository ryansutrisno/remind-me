import { LegalLayout } from '../components/LegalLayout'
import { useI18n } from '../providers/I18nProvider'

export function TermsOfService() {
  const { lang, t } = useI18n()

  if (lang === 'id') {
    return (
      <LegalLayout title={t('nav.terms')}>
        <h2 className="text-2xl font-bold mb-4">Syarat & Ketentuan Layanan</h2>
        <p className="mb-4"><strong>Terakhir Diperbarui:</strong> {new Date().toLocaleDateString('id-ID')}</p>

        <h3 className="text-xl font-semibold mt-6 mb-2">1. Penerimaan Syarat</h3>
        <p className="mb-4">
          Dengan mengakses dan menggunakan aplikasi <strong>Reminder Me</strong>, Anda menyetujui untuk terikat oleh Syarat & Ketentuan Layanan ini. Jika Anda tidak setuju dengan ketentuan ini, Anda dilarang menggunakan aplikasi ini.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2. Deskripsi Layanan</h3>
        <p className="mb-4">
          Reminder Me adalah aplikasi antarmuka klien (client-side) yang mempermudah Anda mengelola pengingat kalender menggunakan akun Google Calendar Anda. Layanan ini disediakan secara "sebagaimana adanya" dan "sebagaimana tersedia".
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">3. Tanggung Jawab Pengguna</h3>
        <p className="mb-4">
          Anda bertanggung jawab menjaga kerahasiaan akun Google Anda dan setiap perangkat yang digunakan untuk mengakses layanan kami. Karena aplikasi ini menyimpan token sesi secara lokal di perangkat Anda, Anda bertanggung jawab penuh atas keamanan perangkat Anda.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">4. Batasan Tanggung Jawab (Disclaimer)</h3>
        <p className="mb-4">
          Reminder Me dan <strong>trazmedia.com</strong> tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang diakibatkan oleh:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Hilangnya data acara kalender.</li>
          <li>Keterlambatan atau kegagalan sistem pengingat dari platform Google Calendar.</li>
          <li>Akses tidak sah ke data Anda yang terjadi akibat kelalaian keamanan perangkat Anda sendiri.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">5. Hukum yang Berlaku & Kontak</h3>
        <p className="mb-4">
          Syarat & Ketentuan ini tunduk pada hukum yang berlaku. Jika Anda memiliki pertanyaan atau kekhawatiran terkait persyaratan ini, Anda dapat menghubungi kami melalui:<br />
          <strong>Email:</strong> <a href="mailto:hallo@trazmedia.com" className="text-blue-500 hover:underline">hallo@trazmedia.com</a><br />
          <strong>Website:</strong> <a href="https://trazmedia.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">trazmedia.com</a>
        </p>
      </LegalLayout>
    )
  }

  // English version
  return (
    <LegalLayout title={t('nav.terms')}>
      <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
      <p className="mb-4"><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US')}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h3>
      <p className="mb-4">
        By accessing and using the <strong>Reminder Me</strong> application, you agree to be bound by these Terms of Service. If you do not agree with these terms, you are prohibited from using this application.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">2. Description of Service</h3>
      <p className="mb-4">
        Reminder Me is a client-side interface application that makes it easier for you to manage calendar reminders using your Google Calendar account. This service is provided on an "as is" and "as available" basis.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">3. User Responsibilities</h3>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your Google account and any device used to access our services. Because this application stores session tokens locally on your device, you are fully responsible for your device's security.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability (Disclaimer)</h3>
      <p className="mb-4">
        Reminder Me and <strong>trazmedia.com</strong> shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Loss of calendar event data.</li>
        <li>Delays or failures of the reminder system from the Google Calendar platform.</li>
        <li>Unauthorized access to your data due to your own device security negligence.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">5. Governing Law & Contact</h3>
      <p className="mb-4">
        These Terms of Service are governed by applicable laws. If you have any questions or concerns regarding these terms, you can contact us via:<br />
        <strong>Email:</strong> <a href="mailto:hallo@trazmedia.com" className="text-blue-500 hover:underline">hallo@trazmedia.com</a><br />
        <strong>Website:</strong> <a href="https://trazmedia.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">trazmedia.com</a>
      </p>
    </LegalLayout>
  )
}
