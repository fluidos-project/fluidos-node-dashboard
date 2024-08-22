import dayjs from "dayjs";
function calculateAge (timestamp){
    const creationDate = dayjs(timestamp);
    const now = dayjs();

    const years = now.diff(creationDate, 'year');
    const months = now.diff(creationDate, 'month') % 12;
    const days = now.diff(creationDate, 'day') % 30;
    const hours = now.diff(creationDate, 'hour') % 24;

    const age = [
        years > 0 ? `${years} year${years === 1 ? '' : 's'}` : '',
        months > 0 ? `${months} month${months === 1 ? '' : 's'}` : '',
        days > 0 ? `${days} day${days === 1 ? '' : 's'}` : '',
        hours > 0 ? `${hours} hour${hours === 1 ? '' : 's'}` : ''
    ].filter(Boolean).join(', ');

    return age;

}

export default calculateAge