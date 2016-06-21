function addLoadEvent(func) {
	var oldonload = nx.onload;
	if (typeof nx.onload != 'function') {
		nx.onload = func;
	} else {
		nx.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func();
		}
	}
}
var patch = [];
var nxonload = [];

function line2env(args,maxAmplitude,maxDuration,timeOffset) {
	maxAmplitude = parseFloat(maxAmplitude);
	if(isNaN(maxAmplitude)){
		maxAmplitude = 1.0;
	}
	maxDuration = parseFloat(maxDuration);
	if(isNaN(maxDuration)){
		maxDuration = 1.0;
	}
	timeOffset = parseFloat(timeOffset)
	if(isNaN(timeOffset)){
		timeOffset = 0.0;
	}
	var commaIdx = -1;
	var ramp = [];
	var points = [];
	args.forEach(function(d, i) {
		if (d === ',') {
			commaIdx = i;
		} else {
			var m = i - commaIdx;
			switch (m) {
				case 1:
					{
						ramp.push({
							value: 0,
							interval: 0,
							delay: 0
						});
						ramp[ramp.length - 1].value = d;
					}
					break;
				case 2:
					ramp[ramp.length - 1].interval = d;
					break;
				case 3:
					ramp[ramp.length - 1].delay = d;
					break;
				default:
					return [];
			}
		}
	})
	ramp.forEach(function(d, i) {
		points.push({
			y: d.value / maxAmplitude,
			x: (d.delay + d.interval + timeOffset) / maxDuration
		});
	})
	return points;
}