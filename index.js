const express = require('express');
const app = express();
app.get('/', (req, res, next) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>whatup</title>
                <style>
                    h1 {
                        color: red;
                    }
                </style>
                <script>
` +                 // https://github.com/filamentgroup/loadCSS
`                    !function(e){"use strict"
                    var n=function(n,t,o){function i(e){return f.body?e():void setTimeout(function(){i(e)})}var d,r,a,l,f=e.document,s=f.createElement("link"),u=o||"all"
                    return t?d=t:(r=(f.body||f.getElementsByTagName("head")[0]).childNodes,d=r[r.length-1]),a=f.styleSheets,s.rel="stylesheet",s.href=n,s.media="only x",i(function(){d.parentNode.insertBefore(s,t?d:d.nextSibling)}),l=function(e){for(var n=s.href,t=a.length;t--;)if(a[t].href===n)return e()
                    setTimeout(function(){l(e)})},s.addEventListener&&s.addEventListener("load",function(){this.media=u}),s.onloadcssdefined=l,l(function(){s.media!==u&&(s.media=u)}),s}
                    "undefined"!=typeof exports?exports.loadCSS=n:e.loadCSS=n}("undefined"!=typeof global?global:this)
                </script>
                <script>
` +                 //slow loading file would normally block rendering -- forced slow load below
`                    var load = loadCSS("/style.css");
                </script> 
                <noscript>
                    <link rel="stylesheet" type="text/css" href="/style.css" />
                </noscript>  
            </head>
            <body>
                <h1>This is a website</h1>
                <script>
                    function wait(message){
                        console.log(message + '::start::' + new Date())
                        var later = new Date();
                        later.setSeconds(later.getSeconds() + 2);
                        while(later > new Date()){
                            console.log(message);
                        }
                        console.log(message + '::end::' + new Date())
                    }

                    //not reliable cross browser: https://snook.ca/archives/javascript/settimeout_solve_domcontentloaded
                   // setTimeout(function(){wait('timer');}, 1000);

                    //wait('raw');

                    //document.addEventListener("DOMContentLoaded", function(event) { 
                    //    wait('ready');
                    //});
                </script> 
            </body>
        </html>
    `);
});


app.get('/style.css', (req, res, next) => {
    //simulate slow load time
    setTimeout(() => {
        //without this cache control, the file would load twice (preload)
        res.setHeader('Cache-Control', 'public, max-age=31557600');
        res.header('Content-Type', 'text/css').send(`
            h1 {
                background-color: black;
            }
        `);
    }, 3000);
});

app.listen(3000);