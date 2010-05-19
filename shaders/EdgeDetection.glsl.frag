uniform sampler2D color0;
uniform sampler2DShadow depth;
uniform float time;

const float offset = 0.0003;

varying vec2 texCoord;

void main(void)
{
    vec4 color = texture2D(color0, texCoord) * 8.0;
    color += texture2D(color0, texCoord + vec2(offset,0)) * -1.0;
    color += texture2D(color0, texCoord + vec2(-offset,0)) * -1.0;
    color += texture2D(color0, texCoord + vec2(0,offset)) * -1.0;
    color += texture2D(color0, texCoord + vec2(0,-offset)) * -1.0;

    color += texture2D(color0, texCoord + vec2(offset,offset)) * -1.0;
    color += texture2D(color0, texCoord + vec2(-offset,offset)) * -1.0;
    color += texture2D(color0, texCoord + vec2(offset,-offset)) * -1.0;
    color += texture2D(color0, texCoord + vec2(-offset,-offset)) * -1.0;

    /*
    float scalar = 20.0;
    vec2 bump = vec2(.5, .5);
    vec2 dist = bump - texCoord;
    float l = length(dist) * scalar;
    l = clamp(l, .0, 1.57);
    vec2 tc = texCoord + .6 * dist * cos(l);
    
    gl_FragColor = texture2D(color0, tc);
    */

    gl_FragColor = texture2D(color0, texCoord) * (1.0 - length(color));
    gl_FragDepth = shadow2D(depth, vec3(texCoord, 0.0)).x;
}
