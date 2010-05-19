uniform sampler2D color0;
uniform sampler2D finalColor0;

const float bias = 0.95;

varying vec2 texCoord;

void main() {

    vec4 color = texture2D(color0, texCoord);
    vec4 prevColor = texture2D(finalColor0, texCoord);

    gl_FragColor = mix(color, prevColor, bias);
}
