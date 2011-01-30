varying vec2 texCoord;
uniform sampler2D color0;
/* uniform vec2 center; // Mouse position */
/* uniform float t; // effect elapsed time */

uniform int count;
uniform float3[NUM_POINTS] points;

/* uniform vec3 shockParams; // 10.0, 0.8, 0.1 */

void main()
{
    vec2 uv = texCoord;
    vec2 tc = vec2(0.0);

    for (int i = 0; i < count; ++i) {
        vec3 point = points[i];
        float t = point.x;
        vec2 center = point.yz;
        

        vec3 shockParams = vec3(3.0,0.09,0.05);
        float distance = distance(uv, center);
        if ( (distance <= (t + shockParams.z)) &&
             (distance >= (t - shockParams.z)) )
            {
                float diff = (distance - t);
                float powDiff = 1.0 - pow(abs(diff*shockParams.x),
                                          shockParams.y);
                float diffTime = diff  * powDiff;
                vec2 diffUV = normalize(uv - center);
                tc += (diffUV * diffTime) * (.9/t);
            }
    }
    tc /= count;
    tc += uv;
    gl_FragColor = texture2D(color0, tc);
    //gl_FragColor.r = t*0.001; 
}
