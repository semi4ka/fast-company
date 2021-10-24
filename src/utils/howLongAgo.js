export function getHowLongAgo(start) {
    start = Number(start);
    const ms = Date.now() - start;
    const seconds = Math.floor(ms / 1000);
    if (seconds === 0) return `только что`;
    if (seconds < 60) return `${seconds} секунд назад`;

    const minutes = Math.floor(ms / (1000 * 60));
    if (minutes < 1) return `${minutes} минуту назад`;
    if (minutes < 30) return `${minutes} минут назад`;

    const hours = Math.floor(ms / (1000 * 60 * 60));
    const time = new Date(start);
    let day = time.getDay();
    day = day > 9 ? day : `0${day}`;
    let month = time.getMonth();
    month = month > 9 ? month : `0${month}`;
    let hoursT = time.getHours();
    hoursT = hoursT > 9 ? hoursT : `0${hoursT}`;
    let minutesT = time.getMinutes();
    minutesT = minutesT > 9 ? minutesT : `0${minutesT}`;
    if (hours < 24) return `${hoursT}:${minutesT}`;

    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    if (days < 30) {
        return `${day}.${month} ${hoursT}:${minutesT}`;
    }

    return `${day}.${month}.${time.getFullYear()} ${hoursT}:${minutesT}`;
}
