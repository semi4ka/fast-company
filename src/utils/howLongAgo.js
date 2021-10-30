// export function getHowLongAgo(start) {
//     const now = Date.now();
//     start = Number(start);
//     const ms = now - start;
//     const seconds = Math.floor(ms / 1000);
//     if (seconds === 0) return `только что`;
//     if (seconds < 60) return `${seconds} секунд назад`;

//     const minutes = Math.floor(ms / (1000 * 60));
//     if (minutes < 1) return `${minutes} минуту назад`;
//     if (minutes < 30) return `${minutes} минут назад`;

//     const hours = Math.floor(ms / (1000 * 60 * 60));
//     const time = new Date(start);
//     const dayNow = new Date().getDay();
//     let day = time.getDay();
//     day = day > 9 ? day : `0${day}`;
//     let month = time.getMonth();
//     month = month > 9 ? month : `0${month}`;
//     let hoursT = time.getHours();
//     hoursT = hoursT > 9 ? hoursT : `0${hoursT}`;
//     let minutesT = time.getMinutes();
//     minutesT = minutesT > 9 ? minutesT : `0${minutesT}`;
//     if (dayNow === day && hours < 24) return `${hoursT}:${minutesT}`;

//     const days = Math.floor(ms / (1000 * 60 * 60 * 24));

//     if (days < 30) {
//         return `${day}.${month} ${hoursT}:${minutesT}`;
//     }

//     return `${day}.${month}.${time.getFullYear()} ${hoursT}:${minutesT}`;
// }

export function getHowLongAgo(data) {
    const date = new Date(parseInt(data));
    const dateNow = new Date();
    const yearDif = dateNow.getFullYear() - date.getFullYear();
    if (yearDif === 0) {
        const dayDif = dateNow.getDay() - date.getDay();
        if (dayDif === 0) {
            const hourDif = dateNow.getHours() - date.getHours();
            if (hourDif === 0) {
                const minutesDif = dateNow.getMinutes() - date.getMinutes();

                if (minutesDif >= 0 && minutesDif < 5) return "1 минуту назад";
                if (minutesDif >= 5 && minutesDif < 10) return "5 минут назад";
                if (minutesDif >= 10 && minutesDif < 30) {
                    return "10 минут назад";
                }
                return "30 минут назад";
            }
            return `${date.getHours()}:${date.getMinutes()}`;
        }

        return `${date.getDay()} ${date.toLocaleString("default", {
            month: "long"
        })}`;
    }
    return (
        date.getFullYear() + "." + (date.getMonth() + 1) + "_" + date.getDate()
    );
}
