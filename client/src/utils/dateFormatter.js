export default function formatDate(isoString) {
    const date = new Date(isoString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} at ${hours}:${minutes}`;
}