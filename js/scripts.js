$(window).load(function() {
	$('#slideshow').flexslider({
	controlNav:false,
	directionNav:true
	});
});

function testWidth() {
	if ($(document).width() > 1170) {
		$("body").addClass("wide");
		$("#slideshow").flexslider({
			controlNav:false,
			controlsContainer: ".flexslider-container",
			directionNav:true
		});		
	}
	else {$("body").removeClass("wide");}
}

$(document).ready(function() {
	testWidth();
	$(window).resize(function() {
		testWidth();
	});
});