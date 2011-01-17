uniform sampler2D color0;
uniform sampler2DShadow depth;

varying vec2 texCoord;

void main(){

    vec4 hat = texture2D(color0, texCoord);

    float d = shadow2D(depth, vec3(texCoord, 0.0)).x;

    // Get the depth buffer value at this pixel.  
    float zOverW = shadow2D(depth, vec3(texCoord, 0.0)).x;
    // screenPos is the viewport position at this pixel in the range -1 to 1.  
    vec4 screenPos = vec4(texCoord.x * 2.0 - 1.0, 
                          texCoord.y * 2.0 - 1.0,  
                          zOverW * 2.0 - 1.0, 1.0);

    // Transform by the view-projection inverse.  
    vec4 currentPos = gl_ProjectionMatrixInverse * screenPos;

    // Ray in world space.
    vec3 worldPos = currentPos.xyz / currentPos.w;

    vec3 normal = normalize(cross(dFdx(worldPos), dFdy(worldPos)));

    gl_FragColor = vec4(normal*2.0-1.0, 1.0);
    gl_FragDepth = d;
}
