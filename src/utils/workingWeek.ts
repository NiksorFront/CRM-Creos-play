// @ts-nocheck
export default function numberWorkingWeek(){
    const date = new Date() - new Date(new Date().getFullYear(), '00', '01', '11', '00', '00');
    return Math.ceil(date/1000/60/60/24/7)
}