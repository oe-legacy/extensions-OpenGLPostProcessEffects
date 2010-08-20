uniform sampler2D color0;
uniform sampler2DShadow depth;

const float offset = 0.0008;

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

    gl_FragColor = texture2D(color0, texCoord) * (1.0 - length(color));
    gl_FragDepth = shadow2D(depth, vec3(texCoord, 0.0)).x;
}
