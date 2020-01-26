import React from 'react';
import {WebView } from 'react-native-webview';
import {View, Dimensions} from "react-native";
import AutoHeightWebView from 'react-native-autoheight-webview';

const defaultOptions = {
    messageStyle: 'none',
    extensions: ['tex2jax.js'],
    jax: ['input/TeX', 'output/HTML-CSS'],
    tex2jax: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
    },
    TeX: {
        extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
    }
};

function MathJax(props) {
    const {html, mathJaxOptions} = props;
    //wrap html in math jaxx.
    function wrapMathjax() {
        const options = JSON.stringify(
            Object.assign({}, defaultOptions, mathJaxOptions)
        );
        return `
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
			<script type="text/x-mathjax-config">
				MathJax.Hub.Config(${options});

				MathJax.Hub.Queue(function() {
					var height = document.documentElement.scrollHeight;
					window.postMessage(String(height));
					document.getElementById("formula").style.visibility = '';
				});
			</script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
			<div id="formula" style="visibility: hidden;">
				${html}
			</div>
		`;
    }
    const calculatedHtml = wrapMathjax();
    // Create new props without `props.html` field. Since it's deprecated.
    const calculatedProps = Object.assign({}, props, { html: undefined });
    return (
        <AutoHeightWebView
            source={{html: calculatedHtml}}
            scalesPageToFit={true}
            viewportContent={'width=device-width, user-scalable=no'}
            {...calculatedProps}
        />
    )
}
export default MathJax;
