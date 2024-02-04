
const chrono_el = document.getElementById('p_chrono')

const get_url_parameters = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return [
        urlParams.get('defaultTheme'),
        urlParams.get('size'),
        urlParams.get('align'),
        urlParams.get('before'),
        urlParams.get('after'),
        urlParams.get('separator'),
    
    ]
}

var beforeTextOfUser
var afterTextOfUser
var separatorOfUser

var chrono
var past_seconds
var paused = false

const start_timer = (seconds) => {
    var totalSeconds = seconds
    chrono = setInterval(function(){
        var minutes = Math.floor(totalSeconds / 60);
        var remainingSeconds = totalSeconds % 60;
        var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        var formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        chrono_el.innerHTML = beforeTextOfUser + formattedMinutes + separatorOfUser + formattedSeconds + afterTextOfUser;
        totalSeconds++;
        past_seconds = totalSeconds
    }, 1000);
}

(() => {
    const [defaultTheme, size, align, before, after, separator] = get_url_parameters()
    if (defaultTheme=='light') {chrono_el.style.color = '#37352F' ; currentTheme='light'}
    if (defaultTheme=='dark') {chrono_el.style.color = '#D4D4D4' ; currentTheme='dark'}
    if (size!=null) chrono_el.style.fontSize = `${size}px`
    if (align!=null) chrono_el.style.textAlign = `${align}`

    beforeTextOfUser = (before == null ? '' : before)
    afterTextOfUser = (after == null ? '' : after)
    separatorOfUser = (separator == null ? ':' : separator)

    start_timer(0)
})() 



chrono_el.addEventListener('click', (event) => {
    event.stopPropagation()
    console.log('Chrono Paused')
    if (!paused) {
        clearInterval(chrono)
        paused = true
    }
    else if (paused) {
        start_timer(past_seconds)
        paused = false
    }

})

chrono_el.addEventListener('contextmenu', (event) => {
    event.stopPropagation()
    console.log('Chrono Reseted')
    clearInterval(chrono)
    start_timer(0)
    paused = false
})

/* SWITCH THEME
document.getElementById('container').addEventListener('click', () => {
    console.log('container clicked')
    switch_theme()
    chrono_el.innerHTML = 'a'
}) */