customElements.define(
    "video-gallery",
    class extends HTMLElement {
        constructor() {
            super();
            this.ButtonClass="bmov";
            this.ButtonFocusClass="newB"
            this.buttons="";
            this.vidContClass = "video-container";
            this.vidCont ="";



        }

        connectedCallback() {
            this.buttons = this.querySelectorAll('.'+this.ButtonClass);
            this.vidCont = this.querySelector('.'+this.vidContClass);
            this.querySelector(".mov-pic").addEventListener("click", this.clicker.bind(this,this.buttons[0]));
            for(let i =0;i<this.buttons.length;i++){
                this.buttons[i].addEventListener("click",this.clicker.bind(this,this.buttons[i]));
                // this.buttons[i].addEventListener("focus",this.focuser.bind(this,this.buttons[i]));
            }

        }

        createbaseTempl(){
            const vid = document.createElement("div");
            vid.setAttribute('class',this.vidContClass);
            return vid;
        }

        setOverlay(){

            const svg =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
            // svg.setAttribute("width","70"); svg.setAttribute("height","70");
            // <svg width="100" height="100"><path id="p1"></path><path id="p2"></path></svg>
            svg.setAttribute("width","100");
            svg.setAttribute("height","100");
            const poly =document.createElementNS("http://www.w3.org/2000/svg", 'path');
            poly.setAttribute("id","p1");


            const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            // path.setAttribute("class","play-btn__svg");
            path.setAttribute("id","p2");

            svg.appendChild(poly);
            svg.appendChild(path);

            return svg;
        }

        grabTemplat(dt,durl){
            const ifram = document.createElement("iframe");
            ifram.setAttribute("src",durl);
            ifram.setAttribute("width","inherit");
            ifram.setAttribute("height","inherit");
            ifram.setAttribute("preload","auto");
            const base = this.createbaseTempl();
            // console.log(dt);
            switch(dt){
                case "yt":
                    `  <iframe width="" height=""
          src="" frameborder="0"
          allowfullscreen></iframe>`;
                    base.appendChild(ifram);
                    return ifram;
                    break;
                case "vm":
                    ` <iframe src="https://player.vimeo.com/video/**yourvideonumberhere**" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
                    base.appendChild(ifram);
                    return ifram;
                    break;
                case "cdn":
        //             `<video controls width="250" preload="auto" autoplay="true" loop="loop">
        // <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" type="video/mp4">`;
                    const vid =  document.createElement("video");
                    vid.setAttribute("autoplay","true");
                    vid.setAttribute("controls","true");
                    vid.setAttribute("preload","auto");
                    vid.setAttribute("object-fit","cover");
                    // var wdr = (this.parentElement.clientWidth);
                    // vid.setAttribute("height", (wdr / 16 *9)+'px');
                    const srrc =  document.createElement("source");
                    srrc.setAttribute("src",durl);
                    srrc.setAttribute("type","video/mp4");
                    vid.appendChild(srrc);
                    return vid;
                    break;
            }
            // return base;

        }

        clicker(c){
            if(c.classList.contains(this.ButtonFocusClass)==false){
                const url = c.getAttribute("data-url");
                const typ = c.getAttribute("data-type");
                // console.log(typ);
                for(let i=0;i<this.buttons.length;i++){
                    this.buttons[i].classList.remove(this.ButtonFocusClass);
                     if(this.buttons[i].getElementsByTagName('svg')[0] !== undefined) this.buttons[i].getElementsByTagName('svg')[0].remove();
                }
                c.classList.add(this.ButtonFocusClass);
                // console.log(typ);
                const a = this.querySelector('.'+this.vidContClass).children[0];
                // console.log(this.grabTemplat.bind(this,typ,url));
                const s =this.grabTemplat(typ,url);
                console.log(a);
                // console.log(this.shadowRootz.querySelector('.'+this.vidContClass));
                // console.log(s);


                if(a!==undefined) {this.querySelector('.'+this.vidContClass).removeChild(a)};
                this.querySelector('.'+this.vidContClass).appendChild(s);
                // console.log(this.setOverlay());
                 c.appendChild(this.setOverlay());
            }
        }

        //   focuser(c){
        //
        // }



    },);
