uniform sampler2D color0;
uniform sampler2DShadow depth;

varying vec2 texCoord;

const float samples = 7.0;
const float start = (samples - 1.0) / -2.0;
const float end = samples + start;

float maxOffset = start*start + start*start;

void main(){

    float focus = shadow2D(depth, vec3(0.5, 0.5, 0.0)).x;
    float d = shadow2D(depth, vec3(texCoord, 0.0)).x;

    float blurOffset = (d - focus) * .03;

    float totWeight = 0.0;
    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    for (float i = start; i < end; ++i){
        for (float j = start; j < end; ++j){
            float weight = maxOffset - i*i + j*j;
            color += weight * texture2D(color0, texCoord + vec2(i * blurOffset,  j * blurOffset));
            totWeight += weight;
        }
    }
    
    gl_FragColor = color / totWeight;
}
