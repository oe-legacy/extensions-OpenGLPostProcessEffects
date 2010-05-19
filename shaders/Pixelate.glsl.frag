uniform sampler2D color0;
/*
uniform float xsize;    // zoom-size in pixels (fractions are ok (to make zooming smooth))
uniform float ysize;    // zoom-size in pixels (fractions are ok (to make zooming smooth))
uniform int scrxsize; // screen-size in pixels
uniform int scrysize; // screen-size in pixels
*/
const float xsize = 5.0;    // zoom-size in pixels (fractions are ok (to make zooming smooth))
const float ysize = 5.0;    // zoom-size in pixels (fractions are ok (to make zooming smooth))
const int scrxsize = 400; // screen-size in pixels
const int scrysize = 300; // screen-size in pixels

varying vec2 texCoord;

void main() {
    vec2 texcoord = texCoord;
    float scrxsizeFloat = float(scrxsize);
    float scrysizeFloat = float(scrysize);
    
    texcoord = vec2(texcoord.x*scrxsizeFloat - mod(texcoord.x*scrxsizeFloat - mod((scrxsizeFloat+xsize)/2.0, xsize), xsize) + xsize/2.0 , // last factor is for reading the color from the center of the zoomed pixel (looks better)
                    texcoord.y*scrysizeFloat - mod(texcoord.y*scrysizeFloat - mod((scrysizeFloat+ysize)/2.0, ysize), ysize) + ysize/2.0);

    texcoord = vec2(texcoord.x / scrxsizeFloat, texcoord.y / scrysizeFloat);

    vec4 color = texture2D(color0, texcoord);

    gl_FragColor = color;
}
