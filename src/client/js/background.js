module.exports = drawBackground;

function drawBackground(ctx) {
	ctx.save();
	let grdLin = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
	
	grdLin.addColorStop(0, "black");
	grdLin.addColorStop(0.80, "darkblue");
	grdLin.addColorStop(1, "darkslategray");
	ctx.fillStyle = grdLin;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.restore();
}