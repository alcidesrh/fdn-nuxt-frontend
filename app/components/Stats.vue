<script setup lang="ts">
javascript: (function () {
	var script = document.createElement('script');
	script.onload = function () {
		var stats = new Stats();
		stats.dom.classList.add('stats-frames')
		document.body.appendChild(stats.dom);
		requestAnimationFrame(function loop() {
			stats.update();
			requestAnimationFrame(loop);
		});
	};
	script.src = 'https://mrdoob.github.io/stats.js/build/stats.min.js';
	document.head.appendChild(script);
})();
</script>
<style>
body>div.stats-frames {
	left: 50% !important;
	position: fixed !important;
	grid-template-columns: repeat(3, 200px) !important;
	display: grid !important;
	gap: 25px !important;
	z-index: 999 !important;
	margin-left: -325px;

	&>canvas {
		display: block !important;
		width: 200px !important;
		height: 100px !important;
	}
}
</style>
