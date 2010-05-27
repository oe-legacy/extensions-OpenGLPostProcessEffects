uniform sampler2D color0; // The blurred image
uniform sampler2D scene;
uniform sampler2DShadow depth;

uniform vec2 coefficients;

varying vec2 texCoord;

void main () {
    vec4 blur = texture2D(color0, texCoord);
    vec4 orig = texture2D(scene, texCoord);

    gl_FragColor = coefficients.x * orig + coefficients.y * blur;

    gl_FragDepth = shadow2D(depth, vec3(texCoord, 0.0)).x;
}
