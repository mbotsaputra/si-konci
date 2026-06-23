// ============================================
// SI-KONCI - Google Sheets API Handler
// Menggunakan Service Account Authentication
// ============================================

// Konfigurasi - GANTI DENGAN DATA ANDA
const SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
const SHEET_NAMES = {
    siswa: 'Data_Siswa',
    guru: 'Data_Guru',
    orangtua: 'Data_Orangtua',
    konseling: 'Data_Konseling',
    konsultasi: 'Data_Konsultasi',
    rekamMedis: 'Rekam_Medis',
    jadwal: 'Jadwal_Konseling'
};

// Google Apps Script Web App URL
// Setelah deploy Apps Script, ganti dengan URL Anda
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

class GoogleSheetsAPI {
    constructor() {
        this.spreadsheetId = SPREADSHEET_ID;
        this.baseUrl = APPS_SCRIPT_URL;
    }

    // ============ READ DATA ============
    async getData(sheetName) {
        try {
            const url = `${this.baseUrl}?action=get&sheet=${encodeURIComponent(sheetName)}&spreadsheetId=${this.spreadsheetId}`;
            const response = await fetch(url);
            const result = await response.json();
            
            if (result.success) {
                return result.data;
            } else {
                console.error('Error reading data:', result.error);
                return [];
            }
        } catch (error) {
            console.error('Network error:', error);
            return [];
        }
    }

    // ============ APPEND DATA ============
    async appendData(sheetName, data) {
        try {
            const url = `${this.baseUrl}?action=append&sheet=${encodeURIComponent(sheetName)}&spreadsheetId=${this.spreadsheetId}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data })
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error appending data:', error);
            return { success: false, error: error.message };
        }
    }

    // ============ UPDATE DATA ============
    async updateData(sheetName, rowIndex, data) {
        try {
            const url = `${this.baseUrl}?action=update&sheet=${encodeURIComponent(sheetName)}&spreadsheetId=${this.spreadsheetId}&row=${rowIndex}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data })
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error updating data:', error);
            return { success: false, error: error.message };
        }
    }

    // ============ DELETE DATA ============
    async deleteData(sheetName, rowIndex) {
        try {
            const url = `${this.baseUrl}?action=delete&sheet=${encodeURIComponent(sheetName)}&spreadsheetId=${this.spreadsheetId}&row=${rowIndex}`;
            const response = await fetch(url, {
                method: 'POST'
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error deleting data:', error);
            return { success: false, error: error.message };
        }
    }

    // ============ SEARCH DATA ============
    async searchData(sheetName, column, value) {
        try {
            const data = await this.getData(sheetName);
            if (!data || data.length < 2) return [];
            
            const headers = data[0];
            const rows = data.slice(1);
            const colIndex = headers.indexOf(column);
            
            if (colIndex === -1) return [];
            
            return rows.filter(row => 
                row[colIndex] && row[colIndex].toLowerCase().includes(value.toLowerCase())
            );
        } catch (error) {
            console.error('Error searching data:', error);
            return [];
        }
    }
}

// ============ FUNGSI KHUSUS ============

// Fungsi untuk mendapatkan data siswa
async function getStudents() {
    const api = new GoogleSheetsAPI();
    const data = await api.getData(SHEET_NAMES.siswa);
    return data;
}

// Fungsi untuk mendapatkan data guru
async function getTeachers() {
    const api = new GoogleSheetsAPI();
    const data = await api.getData(SHEET_NAMES.guru);
    return data;
}

// Fungsi untuk mendapatkan data orang tua
async function getParents() {
    const api = new GoogleSheetsAPI();
    const data = await api.getData(SHEET_NAMES.orangtua);
    return data;
}

// Fungsi untuk menyimpan catatan konseling
async function saveCounseling(data) {
    const api = new GoogleSheetsAPI();
    const result = await api.appendData(SHEET_NAMES.konseling, data);
    return result;
}

// Fungsi untuk menyimpan rekam medis
async function saveMedicalRecord(data) {
    const api = new GoogleSheetsAPI();
    const result = await api.appendData(SHEET_NAMES.rekamMedis, data);
    return result;
}

// Fungsi untuk menyimpan jadwal konseling
async function saveSchedule(data) {
    const api = new GoogleSheetsAPI();
    const result = await api.appendData(SHEET_NAMES.jadwal, data);
    return result;
}

// Ekspor
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GoogleSheetsAPI,
        getStudents,
        getTeachers,
        getParents,
        saveCounseling,
        saveMedicalRecord,
        saveSchedule
    };
}