uniform sampler2D color0;
uniform sampler2DShadow depth;
const vec2 screenLightPos = vec2(0.5,0.5);

varying vec2 texCoord;

void main() {

    //vec2 screenLightPos = vec2(0.5,0.5);
    float density = 0.2;//0.4;	// længde af raysne 
    float decay = 0.95;		// hvor hurtigt de decayer
    float exposure = 0.1;
    float weight = 1.0; ///////
    float NUM_SAMPLES = 40.0; // 20

    vec2 texcoord = texCoord;

    // Calculate vector from pixel to light source in screen space.
    vec2 deltaTexCoord = (texcoord - screenLightPos.xy);
    
    // Divide by number of samples and scale by control factor
    deltaTexCoord *= 1.0 / NUM_SAMPLES * density;
    
    // Store initial sample.
    vec3 color = texture2D(color0, texcoord).xyz;
    
    // Set up illumination decay factor.
    float illuminationDecay = 1.0;
    
    // Evaluate summation from Equation 3 NUM_SAMPLES iterations.
    for (float i = 0.0; i < NUM_SAMPLES; i++) {
    
        // Step sample location along ray
        texcoord -= deltaTexCoord;
        
        // Retrieve sample at new location
        vec3 sample = texture2D(color0, texcoord).xyz;
        
        // Apply sample atteniation scale/decay factors
        sample *= illuminationDecay * weight;
        
        // Accumulate combined color.
        color += sample;
        
        // Update exponential decay factor.
        illuminationDecay *= decay;
    }
    
    // final color with a further scale control factor
    vec3 finalColor = color*exposure;
       
    // Output final color 
    gl_FragColor = vec4(finalColor, 0);
    gl_FragDepth = shadow2D(depth, vec3(texCoord, 0.0)).x;
}
