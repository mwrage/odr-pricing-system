import { parse } from 'date-fns'
import { de } from 'date-fns/locale'

export const formatRequestedTime = ([dateStr, timeStr]) => {
    const cleanedDate = dateStr.replace(/^.*?, /, '') + ' 2025 ' + timeStr;
    const date = parse(cleanedDate, 'd. MMMM yyyy HH:mm', new Date(), { locale: de });
    const formatted = date.toLocaleString('sv-SE').replace(' ', 'T');
    return formatted;
}