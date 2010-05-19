/**
 * Inspired by GPU gems 3 chapter 27, but couldn't be copied directly
 */

const float numSamples = 40.0;

uniform sampler2D color0;
uniform sampler2DShadow depth;

uniform mat4 invVPMat;
uniform mat4 prevVPMat;

varying vec2 texCoord;

void main() {
    //  ** Find the fragments worldpos **

    // Get the depth buffer value at this pixel.  
    float zOverW = shadow2D(depth, vec3(texCoord, 0.0)).x;
    // screenPos is the viewport position at this pixel in the range -1 to 1.  
    vec4 screenPos = vec4(texCoord.x * 2.0 - 1.0, 
                          texCoord.y * 2.0 - 1.0,  
                          zOverW, 1.0);

    // Transform by the view-projection inverse.  
    vec4 currentPos = invVPMat * screenPos;
    // Divide by w to get the world position.  
    vec4 worldPos = currentPos / currentPos.w; 

    // ** compute pr pixel velocity **

    // Use the world position, and transform by the previous view-  
    // projection matrix.  
    vec4 previousPos = prevVPMat * worldPos;
    // Convert to nonhomogeneous points [-1,1] by dividing by w.  
    previousPos /= previousPos.w;


    // Use this frame's position and last frame's to compute the pixel  
    // velocity.  
    vec2 velocity = (currentPos.xy - previousPos.xy) * 0.5; 

    gl_FragColor.xy = velocity;
    //velocity /= 20.0;
    //velocity.x = clamp(velocity.x, -0.001, 0.001);
    //velocity.y = clamp(velocity.x, -0.001, 0.001);

    vec2 texcoord = texCoord;
    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
    for (float i = 1.0; i < numSamples; ++i){
        color += texture2D(color0, texcoord);
        texcoord += velocity;
    }

    //gl_FragColor = color / numSamples;
}
