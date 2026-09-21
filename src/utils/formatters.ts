// Format numbers with clear English digits (1, 2, 3, 4, 5, 6, 7, 8, 9, 0) and thousands separators
export function toEnglishDigits(val: number | string): string {
  if (val === undefined || val === null) return '';
  if (typeof val === 'number') {
    return new Intl.NumberFormat('en-US').format(val);
  }
  const str = String(val);
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let cleanStr = str;
  arabicDigits.forEach((d, idx) => {
    cleanStr = cleanStr.replaceAll(d, String(idx));
  });
  const num = Number(cleanStr);
  if (!isNaN(num) && cleanStr.trim() !== '' && !cleanStr.includes('-') && !cleanStr.includes('/')) {
    return new Intl.NumberFormat('en-US').format(num);
  }
  return cleanStr;
}

// Convert numbers with Eastern Arabic numerals if needed
export function toEasternArabicDigits(val: number | string): string {
  if (val === undefined || val === null) return '';
  const numStr = typeof val === 'number'
    ? new Intl.NumberFormat('en-US').format(val)
    : String(val);

  const digitMap: Record<string, string> = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩',
  };

  return numStr.replace(/[0-9]/g, (char) => digitMap[char] || char);
}

// Format numbers across all sections to English digits as requested by user
export function toKurdishDigits(val: number | string): string {
  return toEnglishDigits(val);
}

// Format currency in Iraqi Dinar with English digits
export function formatKurdishIQD(amount: number, suffix = 'دینار'): string {
  return `${toEnglishDigits(Math.round(amount))} ${suffix}`.trim();
}

// Format standard currency in Iraqi Dinar (د.ع) with English digits
export function formatIQD(amount: number): string {
  return toEnglishDigits(Math.round(amount)) + ' د.ع';
}

// Format numbers
export function formatNumber(num: number): string {
  return toEnglishDigits(num);
}

// Format date to readable format with English digits
export function formatKurdishDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${toEnglishDigits(parts[0])}/${toEnglishDigits(parts[1])}/${toEnglishDigits(parts[2])}`;
  }
  return dateStr;
}
