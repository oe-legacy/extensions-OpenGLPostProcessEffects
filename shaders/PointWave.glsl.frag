varying vec2 texCoord;
uniform sampler2D color0;

uniform float3[NUM_POINTS] points;

void main()
{
    vec2 uv = texCoord;
    vec2 tc = vec2(0.0);

    for (int i = 0; i < NUM_POINTS; ++i) {
        vec3 point = points[i];
        float t = point.x;
        vec2 center = point.yz;
        

        vec3 shockParams = vec3(10,0.02,0.05);
        /* vec3 shockParams = vec3(PARAM_X, PARAM_Y, PARAM_Z); */
        float distance = distance(uv, center);
        if ( (distance <= (t + shockParams.z)) &&
             (distance >= (t - shockParams.z)) )
            {
                float diff = (distance - t);
                float powDiff = 1.0 - pow(abs(diff*shockParams.x),
                                          shockParams.y* (1.0/t));
                float diffTime = diff  * powDiff;
                vec2 diffUV = normalize(uv - center);
                tc += (diffUV * diffTime) ;
            }
    }
    tc += uv;
    gl_FragColor = texture2D(color0, tc);
}
