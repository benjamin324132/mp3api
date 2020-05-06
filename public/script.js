let Btn = document.getElementById('btn');
let URLinput = document.querySelector('.URL-input');
let serverURL = 'https://mp3-api.glitch.me';

Btn.addEventListener('click', () => {
	if (!URLinput.value) {
		alert('Enter YouTube URL');
	} else {
			redirectMp3(URLinput.value);
	}
});

function redirectMp3(query) {
	window.location.href = `${serverURL}/downloadmp3?url=${query}`;
}
