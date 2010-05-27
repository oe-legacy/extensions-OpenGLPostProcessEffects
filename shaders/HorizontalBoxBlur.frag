uniform sampler2D color0;
uniform sampler2DShadow depth;

varying vec2 texCoord;

uniform float halfSamples;
uniform float offset;

void main() {

    vec4 color = vec4(.0, .0, .0, .0);
    for (float x = -halfSamples; x <= halfSamples; ++x)
        color += texture2D(color0, texCoord + vec2(x * offset, 0.0));

    gl_FragColor = color / (halfSamples * 2.0 + 1.0);
    gl_FragDepth = shadow2D(depth, vec3(texCoord, 0.0)).x;
}
