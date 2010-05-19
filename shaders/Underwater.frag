const vec2 STR = vec2(0.01, 0.01);
const vec2 FREQ = vec2(0.001, 0.002);

const vec4 UNDERWATER_COLOR = vec4(.36, 0.48, 0.9, 1.0);
//const vec4 UNDERWATER_COLOR = vec4(1.0, 1.0, 1.0, 1.0);

const float DISTANCE_BLEND = 0.02;
const float GLOW_BLEND = 0.02;

// blur constants
const float samples = 7.0;
const float start = (samples - 1.0) / -2.0;
const float end = samples + start;
const float blurOffset = 0.004;
float maxOffset = start*start + start*start;


uniform sampler2D color0;
uniform sampler2DShadow depth;

uniform float time;
uniform vec4 clearColor;

varying vec2 texCoord;

void main(void) {
    // scale tex coord to remove edge artifacts from wobbling.
    vec2 texcoord = (texCoord - 0.5) * (1.0 - 2.0 * STR) + 0.5;
    
    // Calculate new wobbly texcoord
    texcoord = texcoord + sin(texcoord * 7.0 + FREQ * time) * STR;

    float depth = shadow2D(depth, vec3(texcoord, 0.0)).x;

    // calculate glow (@TODO move into one or two child postprocessnodes)
    float totWeight = 0.0;
    vec4 glowColor = vec4(0.0, 0.0, 0.0, 0.0);
    for (float i = start; i < end; ++i){
        for (float j = start; j < end; ++j){
            float weight = maxOffset - i*i + j*j;
            glowColor += weight * texture2D(color0, texcoord + vec2(i * blurOffset,  j * blurOffset));
            totWeight += weight;
        }
    }
    glowColor *= UNDERWATER_COLOR / totWeight;
    glowColor *= 6.0;

    vec4 color = texture2D(color0, texcoord);
    
    // Apply underwater light color
    color *= UNDERWATER_COLOR;

    // Mix blur into color
    float glowBlend = (depth - (1.0 - GLOW_BLEND)) / GLOW_BLEND;
    glowBlend = clamp(glowBlend, 0.0, 1.0);
    color *= 3.0;
    color = mix(color, glowColor, 0.3 + 0.7 * glowBlend);

    // blend with background color;
    float blend = (depth - (1.0 - DISTANCE_BLEND)) / DISTANCE_BLEND;
    blend = clamp(blend, 0.0, 1.0);
    color = mix(color, clearColor, blend);

    gl_FragColor = color;
    gl_FragDepth = depth;
}
