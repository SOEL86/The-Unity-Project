

$(document).ready(function(){
	var filter_options;
    $(jqUpdateSize);
    $('li').each(function(){
		$(this).css('background-color', randomColor());
	});
	$('.ss-container').shapeshift(getOptions());
	$('li').hover(selectWindow, deselectWindow);
	$('#add').click(addWindow);
});

function addWindow(){
	$('.ss-container').append('<li id="new" data-ss-colspan="1" data-ss-rowspan="1"></li>');
	$('#new').css('background-color', randomColor());
	$('#new').hover(selectWindow, deselectWindow);
	$('#new').attr('id', '');
	$(jqUpdateSize);
};

// UPDATE ON RESIZE
$(window).resize(jqUpdateSize);

// UPDATE SIZE
function jqUpdateSize(){
    // Get the dimensions of the viewport
    $('#wrap').css('width', $(window).width());
    $('#wrap').css('height', $(window).height());
	
	//Calculate the size of each window
	$('li').each(function(){
		if ($(this).attr('data-ss-colspan')==3){
			$(this).css('width', getWidth(3));
		};
		if ($(this).attr('data-ss-colspan')==2){
			$(this).css('width', getWidth(2));
		};
		if ($(this).attr('data-ss-colspan')==1){
			$(this).css('width', getWidth(1));
		};
		if ($(this).attr('data-ss-rowspan')==3){
			$(this).css('height', getHeight(3));
		};
		if ($(this).attr('data-ss-rowspan')==2){
			$(this).css('height', getHeight(2));
		};
		if ($(this).attr('data-ss-rowspan')==1){
			$(this).css('height', getHeight(1));
		};
	});
	
	//Adjust grid to new dimentions
	
	$('.ss-container').shapeshift(getOptions());
	$('.ss-container').trigger('ss-rearrange');
};

function selectWindow() {
	$(this).attr('id', 'selected');
	$('#selected').append('<span class="handle"></span><span class="expandx"></span><span class="expandy"></span><span class="contractx"></span><span class="contracty"></span><span class="close"></span>');
	$('.close').click(function(){
		$(this).parent().remove();
		$(jqUpdateSize);
	});
	$('.expandx').click(function(){
	    var incr = $(this).parent().attr('data-ss-colspan');
		if (incr < 3){
			incr++;
			$(this).parent().attr('data-ss-colspan', incr);
			$(jqUpdateSize);
		};
	});
	$('.contractx').click(function(){
	    var incr = $(this).parent().attr('data-ss-colspan');
		if (incr > 1){
			incr--;
			$(this).parent().attr('data-ss-colspan', incr);
			$(jqUpdateSize);
		};
	});
	$('.expandy').click(function(){
	    var incr = $(this).parent().attr('data-ss-rowspan');
		if (incr < 3){
			incr++;
			$(this).parent().attr('data-ss-rowspan', incr);
			$(jqUpdateSize);
		};
	});
	$('.contracty').click(function(){
	    var incr = $(this).parent().attr('data-ss-rowspan');
		if (incr > 1){
			incr--;
			$(this).parent().attr('data-ss-rowspan', incr);
			$(jqUpdateSize);
		};
	});
};

function deselectWindow() {
    $('.handle').remove();
	$('.expandx').remove();
	$('.expandy').remove();
	$('.contractx').remove();
	$('.contracty').remove();
	$('.close').remove();
	$('#selected').attr('id', '');
};

//Returns ShapeShifter Options
function getOptions(){
	filter_options = {
		selector: "*",

		//Features
		enableDrag: true,
		enableCrossDrop: true,
		enableResize: true,
		enableTrash: false,

		//Grid Properties
		align: "left",
		colWidth: getWidth(1),
		columns: 3,
		minColumns: 1,
		autoHeight: true,
		maxHeight: getHeight(3),
		minHeight: 100,
		gutterX: 5,
		gutterY: 5,
		paddingX: 5,
		paddingY: 5,

		//Animation
		animated: true,
		animateOnInit: true,
		animationSpeed: 225,
		animationThreshold: 100,

		//Drag/Drop Options
		dragClone: false,
		deleteClone: true,
		dragRate: 100,
		dragWhitelist: "*",
		crossDropWhitelist: "*",
		cutoffStart: null,
		cutoffEnd: null,
		handle: '.handle',

		//Customize CSS
		cloneClass: "ss-cloned-child",
		activeClass: "ss-active-child",
		draggedClass: "ss-dragged-child",
		placeholderClass: "ss-placeholder-child",
		originalContainerClass: "ss-original-container",
		currentContainerClass: "ss-current-container",
		previousContainerClass: "ss-previous-container"
		
    };
	return filter_options;
}

//Returns adjusted column width based on viewport size.
function getWidth(colspan){
	var width = $(window).width();
	if (colspan == 3){
		width = width-30;
	};
	if (colspan == 2){
		width = width-35;
	};
	if (colspan == 1){
		width = width-40;
	};
	width = width/3;
	return width*colspan;
}
//Returns adjusted row height based on viewport size.
function getHeight(rowspan){
	var height = $(window).height();
	if (rowspan == 3){
		height = height-30;
	};
	if (rowspan == 2){
		height = height-35;
	};
	if (rowspan == 1){
		height = height-40;
	};
	height = height/3;
	return height*rowspan;
}

// RANDOM COLOR
function randomColor(){
	return 'rgba('
        + (Math.floor(Math.random() * 256)) + ','
        + (Math.floor(Math.random() * 256)) + ','
        + (Math.floor(Math.random() * 256)) + ', 0.8)';
};
