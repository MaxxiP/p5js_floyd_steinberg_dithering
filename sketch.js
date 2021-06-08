let img;

function preload(){
    img = loadImage("nala.jpg");

}

function index(x, y){
    return (x + y * img.width) * 4;
}


function setup(){
    let width = 1024;
    let height = 512;
    createCanvas(width, height);
    img.filter(GRAY);
    image(img, 0, 0, height, height);
}

function draw(){
    img.loadPixels();
    
    for(let y = 0;y < img.height; y++){
        for(let x = 0;x < img.width; x++){

            let oldR = img.pixels[index(x,y)];
            let oldG = img.pixels[index(x,y) + 1];
            let oldB = img.pixels[index(x,y) + 2];

            let factor = 4;

            let newR = round(factor * oldR / 255) * (255 / factor);
            let newG = round(factor * oldG / 255) * (255 / factor);
            let newB = round(factor * oldB / 255) * (255 / factor);
           
            let errR = oldR - newR;
            let errG = oldG - newG;
            let errB = oldB - newB;
                        
            img.pixels[index(x,y)] = parseInt(newR);
            img.pixels[index(x,y) + 1] = parseInt(newG);
            img.pixels[index(x,y) + 2] = parseInt(newB);

            img.pixels[index(x+1,y  )]     = parseInt(img.pixels[index(x+1,y  )]       + errR * 7/16);
            img.pixels[index(x+1,y  ) + 1] = parseInt(img.pixels[index(x+1,y  ) + 1]   + errG * 7/16);
            img.pixels[index(x+1,y  ) + 2] = parseInt(img.pixels[index(x+1,y  ) + 2]   + errB * 7/16);

            img.pixels[index(x-1,y+1)]     = parseInt(img.pixels[index(x-1,y+1)]       + errR * 3/16);
            img.pixels[index(x-1,y+1) + 1] = parseInt(img.pixels[index(x-1,y+1) + 1]   + errG * 3/16);
            img.pixels[index(x-1,y+1) + 2] = parseInt(img.pixels[index(x-1,y+1) + 2]   + errB * 3/16);
            
            img.pixels[index(x  ,y+1)]     = parseInt(img.pixels[index(x  ,y+1)]       + errR * 5/16);
            img.pixels[index(x  ,y+1) + 1] = parseInt(img.pixels[index(x  ,y+1) + 1]   + errG * 5/16);
            img.pixels[index(x  ,y+1) + 2] = parseInt(img.pixels[index(x  ,y+1) + 2]   + errB * 5/16);
            
            img.pixels[index(x+1,y+1)]     = parseInt(img.pixels[index(x+1,y+1)]       + errR * 1/16);
            img.pixels[index(x+1,y+1) + 1] = parseInt(img.pixels[index(x+1,y+1) + 1]   + errG * 1/16);
            img.pixels[index(x+1,y+1) + 2] = parseInt(img.pixels[index(x+1,y+1) + 2]   + errB * 1/16);
        }
    }

    img.updatePixels();
    image(img, height, 0, height, height);
}