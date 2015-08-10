msl_upload.directive('mslFileInput', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attributes) {
			var handler = attributes['mslFileInput'];
			if (!handler) throw 'msl-file-input: You should specify a file selection handler';
			if (!scope[handler]) throw 'msl-file-input: The specified handler doesn\'t exist in your scope';

			element.removeAttr('multiple');
			element.css('position', 'relative');
			element.append('<input type="file" ' + ( attributes['multiple'] ? 'multiple' : '' ) + ' style="display: none;">');
			var hidden_file_input = element.children().eq(-1);
			if (scope[handler]) hidden_file_input.bind('change', function (event) {
				var files = event.target.files;
				scope.$apply(function () { 
					scope[handler](files);
					event.target.value = null; // reset file input
				});
			});
			element.bind('click', function (event) {
				if (event.target.lastChild) event.target.lastChild.click();
			});
		}
	};
});