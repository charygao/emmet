/**
 * Output abbreviation on a single line (i.e. no line breaks)
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 */
(function(){
	function process(tree, profile, level) {
		var elements = zen_coding.require('elements');
		for (var i = 0, il = tree.children.length; i < il; i++) {
			/** @type {ZenNode} */
			var item = tree.children[i];
			if (elements.is(item.source, 'parsedElement')) {
				// remove padding from item 
				var re_pad = /^\s+/;
				item.start = item.start.replace(re_pad, '');
				item.end = item.end.replace(re_pad, '');
			}
			
			// remove newlines 
			var re_nl = /[\n\r]/g;
			item.start = item.start.replace(re_nl, '');
			item.end = item.end.replace(re_nl, '');
			item.content = item.content.replace(re_nl, '');
			
			process(item);
		}
		
		return tree;
	}
	
	zen_coding.require('filters').add('s', process);
})();