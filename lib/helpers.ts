export const processDate = (date: string | number | Date) => {
    const dateObj = new Date(date);
    // generate date in format of March 21st, 2022 from date object
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${monthNames[monthIndex]} ${day}, ${year}`;
};