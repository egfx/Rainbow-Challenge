import React from 'react';

let microlight = require('./plugin/microlight.js');

export default class Rainbow extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            type: props.type
        };
    }

    componentDidMount(){
        this.turnToAscii();
    }

    turnToAscii() {
        let image = new Image(),
          canvas = document.getElementById("inputImage"),
          ctx = canvas.getContext("2d"),
          cell = { width: 8, height: 13 },
          chars = {},
          scale = 1;

        canvas.style.display = "none";

        canvas.width = cell.width;
        canvas.height = cell.height;
        ctx.font = cell.height + "px monospace";

        function clear(){
          ctx.fillStyle = "#FFF";
          ctx.fillRect(0, 0, cell.width, cell.height);
        }

        function getCharData(character){
          if (character == "_"){ return; }

          clear();
          ctx.fillStyle = "#000";
          ctx.fillText(character, 0, cell.height/1.2);

          chars[character] = ctx.getImageData(0, 0, cell.width, cell.height).data;
        }

        let characters = "#*+`´'.:dbPUVMWA<>Xx ".split("")

        for (let c = 32; c < 127; c++){
          getCharData(String.fromCharCode(c));
        }

        function getNearest(imageData){
          let charData,
            min = Infinity,
            best = " ",
            c, i, diff;

          for (c in chars){
            charData = chars[c];
            diff = 0;

            for (i = 0; i < charData.length; i += 4){
              if (imageData[i+3]){
                diff += Math.abs(imageData[i] > 200 != charData[i] > 200);
              }
            }

            if (diff < min){
              min = diff;
              best = c;
            }
          }

          if (best == "Q" || best == "M"){ return "#"; }

          return best;
        }

        image.onload = () => {
          let out = "",
            width = image.width * scale,
            height = image.height * scale,
            scaledHeight = height * 0.92,
            data, x, y;

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(image, 0, 0, width, scaledHeight);

          for (y = 0; y < scaledHeight; y += cell.height + 2){
            for (x = 0; x < width; x += cell.width){
              data = ctx.getImageData(x, y, cell.width, cell.height).data;
              out += getNearest(data);
            }

            out += "\n";
          }

          ctx.drawImage(image, 0, 0, width, height);

          let $el = document.getElementById("outputAscii")

          $el.innerText = out;

          this.colorTheAscii($el);

        };

        image.src = this.state.image;

    }

    colorTheAscii($el) {

        let letters = $el.innerHTML.split('');
 
        const colToHex = (c) => {
          let color = (c < 75) ? c + 75 : c
          let hex = color.toString(16);
          return hex.length == 1 ? "0" + hex : hex;
        }

        const rgbToHex = (r,g,b) => {
          return "#" + colToHex(r) + colToHex(g) + colToHex(b);
        }

        const getRandomColor = () => {
          return rgbToHex(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255));
        }

        Array.prototype.randomColor = function() {
          let html = '';
          this.map( (letter) => {
            let color = getRandomColor();
            html +=
              "<span class=\"microlight\" style=\"color:" + color + "\">"
              + letter +
              "</span>";
          }) 
          return html;
        };

        document.getElementById('outputAscii').innerHTML = letters.randomColor();

        this.makeItSparkle();
    }

    makeItSparkle() {
        let spans = document.getElementsByTagName('span')
        setInterval(() => {
            let bucket = Array.prototype.slice.call(spans),
                target = bucket[Math.floor(Math.random() * bucket.length)];
            target.classList.toggle('microlight');
        }, 10);
    }

    render() {
        return (
            <div id="output">
                <canvas id="inputImage"></canvas>
                <pre id="outputAscii"></pre>
            </div>
        )
    }
}