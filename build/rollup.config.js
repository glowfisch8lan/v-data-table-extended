import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
// import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'VDataTableExtended', // CHANGE THIS
        exports: 'named',
    },
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        //buble(), // Transpile to ES5
        babel()
    ],
};