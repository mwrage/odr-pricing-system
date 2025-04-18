
export const formatRequestedTime = ([dateStr, timeStr]) => {
    const cleanedDate = dateStr.replace(/^.*?, /, '') + ' 2025 ' + timeStr;
    const date = new Date(cleanedDate);
    const formatted = date.toLocaleString('sv-SE').replace(' ', 'T');
    return formatted;
}