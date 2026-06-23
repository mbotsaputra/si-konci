// ============================================
// SI-KONCI - Google Sheets Configuration
// SMPN 13 Penajam Paser Utara
// ============================================

// Konfigurasi Google Sheets
const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    
    sheets: {
        siswa: 'Data_Siswa',
        guru: 'Data_Guru',
        orangtua: 'Data_Orangtua',
        konseling: 'Data_Konseling',
        konsultasi: 'Data_Konsultasi',
        rekamMedis: 'Rekam_Medis',
        jadwal: 'Jadwal_Konseling'
    },
    
    columns: {
        siswa: ['NIS', 'Nama', 'Kelas', 'No_HP', 'Email', 'Password', 'CreatedAt'],
        guru: ['NIP', 'Nama', 'Mata_Pelajaran', 'No_HP', 'Email', 'Password', 'CreatedAt'],
        orangtua: ['ID_Orangtua', 'Nama', 'Anak_NIS', 'Anak_Nama', 'No_HP', 'Email', 'Password', 'CreatedAt'],
        konseling: ['ID', 'Siswa_NIS', 'Siswa_Nama', 'Guru_NIP', 'Jenis', 'Pesan', 'Mode', 'Tanggal', 'Status'],
        konsultasi: ['ID', 'Orangtua_ID', 'Orangtua_Nama', 'Anak_NIS', 'Anak_Nama', 'Guru_NIP', 'Topik', 'Tanggal', 'Status'],
        rekamMedis: ['ID', 'Siswa_NIS', 'Siswa_Nama', 'Guru_NIP', 'Kategori', 'Catatan', 'Tindakan', 'Tanggal'],
        jadwal: ['ID', 'Siswa_NIS', 'Siswa_Nama', 'Guru_NIP', 'Tanggal', 'Jam', 'Keterangan', 'Status']
    }
};

// Ekspor untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GOOGLE_SHEETS_CONFIG };
}