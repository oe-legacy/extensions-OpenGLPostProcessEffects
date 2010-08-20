const vec3 intensities = vec3(0.3, 0.59, 0.11);
//const vec3 intensities = vec3(0.333, 0.333, 0.333);

uniform sampler2D color0;

varying vec2 texCoord;

void main() {
    
    vec4 color = texture2D(color0, texCoord);
    
    color.rgb = vec3(dot(color.rgb, intensities));

    gl_FragColor = color;
}
