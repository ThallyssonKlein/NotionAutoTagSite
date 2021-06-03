export default function debounce(callback, time) {
    let timer = null;

    clearTimeout(timer);
    timer = setTimeout(callback, time);
}
