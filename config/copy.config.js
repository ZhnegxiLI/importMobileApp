// this is a custom dictionary to make it easy to extend/override
// provide a name for an entry, it can be anything such as 'copyAssets' or 'copyFonts'
// then provide an object with a `src` array of globs and a `dest` string
module.exports = {

    copyMaterialThemeCSS: {
        src: ['{{ROOT}}/node_modules/@angular/material/prebuilt-themes/indigo-pink.css'],
        dest: '{{WWW}}/assets'
    }
  }
  