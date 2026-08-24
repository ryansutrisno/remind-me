import { LegalLayout } from '../components/LegalLayout'
import { useI18n } from '../providers/I18nProvider'

export function PrivacyPolicy() {
  const { lang, t } = useI18n()

  if (lang === 'id') {
    return (
      <LegalLayout title={t('nav.privacy')}>
        <h2 className="text-2xl font-bold mb-4">Kebijakan Privasi</h2>
        <p className="mb-4"><strong>Terakhir Diperbarui:</strong> {new Date().toLocaleDateString('id-ID')}</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">1. Pendahuluan</h3>
        <p className="mb-4">
          Aplikasi <strong>Remind Me</strong> adalah wrapper pengelola pengingat yang terintegrasi dengan Google Calendar. 
          Kebijakan Privasi ini menjelaskan bagaimana kami mengakses, menggunakan, dan melindungi data Anda saat menggunakan layanan kami.
        </p>
        <p className="mb-4">
          Aplikasi ini dioperasikan oleh <strong>trazmedia.com</strong> (Kontak: <a href="mailto:hallo@trazmedia.com" className="text-blue-500 hover:underline">hallo@trazmedia.com</a>).
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">2. Akses Data dan Penggunaan Scope Google</h3>
        <p className="mb-4">Untuk menyediakan fungsi utamanya, aplikasi ini meminta akses ke akun Google Anda dengan cakupan (scope) berikut:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><code>calendar.readonly</code> & <code>calendar.events</code>: Mengizinkan kami menampilkan daftar kalender, membaca acara kalender Anda untuk ditampilkan di dashboard, serta membuat, mengubah, atau menghapus pengingat atas permintaan eksplisit Anda.</li>
          <li><code>userinfo.profile</code> & <code>userinfo.email</code>: Memungkinkan kami untuk menampilkan avatar dan alamat email Anda di antarmuka aplikasi, memverifikasi identitas sesi Anda.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">3. Kepatuhan Kebijakan Data Pengguna Layanan Google API (Limited Use)</h3>
        <p className="mb-4 p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 rounded-md font-medium">
          Penggunaan aplikasi Remind Me dan transfer informasi yang diterima dari API Google ke aplikasi lain apa pun akan mematuhi <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Kebijakan Data Pengguna Layanan Google API</a>, termasuk persyaratan Penggunaan Terbatas (Limited Use).
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">4. Penyimpanan dan Keamanan Data (Zero Server-Side Storage)</h3>
        <p className="mb-4">
          Aplikasi ini beroperasi 100% di sisi klien (browser) Anda. 
          <strong>Kami TIDAK menyimpan, mencatat, atau mengirimkan token akses Google, data kalender, atau profil pengguna Anda ke server backend kami maupun server pihak ketiga mana pun.</strong> 
          Data autentikasi disimpan secara lokal di dalam browser perangkat Anda (menggunakan <code>localStorage</code>) dan langsung dihapus saat Anda menekan tombol Logout (Keluar).
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-2">5. Pencabutan Akses (Revoke Permission)</h3>
        <p className="mb-4">
          Anda dapat mencabut izin akses ke aplikasi ini kapan saja melalui Pengaturan Keamanan Akun Google Anda pada tautan berikut: <br/>
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline break-all">https://myaccount.google.com/permissions</a>
        </p>
      </LegalLayout>
    )
  }

  // English version
  return (
    <LegalLayout title={t('nav.privacy')}>
      <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
      <p className="mb-4"><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US')}</p>
      
      <h3 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h3>
      <p className="mb-4">
        The <strong>Remind Me</strong> app is a reminder management wrapper integrated with Google Calendar. 
        This Privacy Policy explains how we access, use, and protect your data when using our services.
      </p>
      <p className="mb-4">
        This application is operated by <strong>trazmedia.com</strong> (Contact: <a href="mailto:hallo@trazmedia.com" className="text-blue-500 hover:underline">hallo@trazmedia.com</a>).
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">2. Data Access and Google Scope Usage</h3>
      <p className="mb-4">To provide its core functionality, this application requests access to your Google account with the following scopes:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><code>calendar.readonly</code> & <code>calendar.events</code>: Allows us to display your calendar list, read calendar events to show on the dashboard, and create, edit, or delete reminders at your explicit request.</li>
        <li><code>userinfo.profile</code> & <code>userinfo.email</code>: Allows us to display your avatar and email address in the application interface to verify your session identity.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-2">3. Google API Services User Data Policy Compliance (Limited Use)</h3>
      <p className="mb-4 p-4 border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 rounded-md font-medium">
        Remind Me's use and transfer to any other app of information received from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">Google API Services User Data Policy</a>, including the Limited Use requirements.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">4. Data Storage and Security (Zero Server-Side Storage)</h3>
      <p className="mb-4">
        This application operates 100% on the client-side (in your browser). 
        <strong>We DO NOT store, log, or transmit your Google access tokens, calendar data, or user profile to our backend servers or any third-party servers.</strong> 
        Authentication data is stored locally within your device's browser (using <code>localStorage</code>) and is immediately deleted when you click the Logout button.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">5. Revocation of Access</h3>
      <p className="mb-4">
        You can revoke access permissions to this application at any time through your Google Account Security Settings at the following link: <br/>
        <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline break-all">https://myaccount.google.com/permissions</a>
      </p>
    </LegalLayout>
  )
}
