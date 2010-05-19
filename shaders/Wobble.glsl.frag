uniform sampler2D color0;
uniform sampler2DShadow depth;

const vec2 offset = vec2(0.0, 0.0);
varying vec2 texCoord;

uniform float time;

void main () {
    vec2 texcoord = texCoord;
    
    const vec2 freq     = vec2(5,5);
    const vec2 strength = vec2(0.02, 0.02);
    
    vec2 newTexcoord;
    newTexcoord.x = texcoord.x + sin(texcoord.y * freq.x * time / 10000.0 + offset.x) * strength.x;
    newTexcoord.y = texcoord.y + sin(texcoord.x * freq.y * time / 10000.0 + offset.y) * strength.y;

    gl_FragColor = texture2D(color0, newTexcoord);
    gl_FragDepth = shadow2D(depth, vec3(newTexcoord, 0.0)).x;
}
