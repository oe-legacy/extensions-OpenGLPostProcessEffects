uniform sampler2D color0;
uniform sampler2D finalColor0;
uniform sampler2DShadow depth;

uniform float bias;

varying vec2 texCoord;

void main() {

    vec4 color = texture2D(color0, texCoord);
    vec4 prevColor = texture2D(finalColor0, texCoord);

    gl_FragColor = mix(color, prevColor, bias);
    gl_FragDepth = shadow2D(depth, vec3(texCoord, 0.0)).x;
}
