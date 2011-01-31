
varying vec2 texCoord;
uniform sampler2D color0;

uniform vec3 points[NUM_POINTS];
uniform int count;

void main() {
    vec2 uv = texCoord;
    vec2 deltaUV = vec2(0.0);
    vec4 deltaColor = vec4(0.0,0.0,0.0,1.0);

    for (int i = 0; i < count; ++i) { 
        vec3 point = points[i];
        float time = point.x;
        vec2 center = point.yz;
        vec2 dir = uv - center;
        float dist = length(dir);
        dir = normalize(dir);

        float ampl = max(.01 - time * time * 0.006, 0.0);
        float speed = 0.13 - 0.5 * 0.001 * time * time;
        float window = 0.025;
        float freq =  max(200.0 - 50.0 * time, 100.0);

        if (dist <= (time * speed + window) 
            && dist >= (time * speed - window)) {
            
            float weight = ampl * sin(freq*dist);
            deltaUV += dir * weight;
         
            deltaColor += vec4(0.0,.99,.99,1.0) * weight;
        }
        
    }
    //deltaUV /= count;
    gl_FragColor = texture2D(color0, uv + deltaUV);// + deltaColor;
    //gl_FragColor.rg = uv + deltaUV;
    
}

/*     vec2 uv = texCoord; */
/*     vec2 tc = vec2(0.0); */

/*     vec4 color = vec4(0.0, 0.0, 0.0, 1.0); */
/*     for (int i = 0; i < count; ++i) { */
/*         vec3 point = points[i]; */
/*         float t = point.x; */
/*         vec2 center = point.yz; */
        

/*         vec3 shockParams = vec3(40,0.09,0.06); */
/*         /\* vec3 shockParams = vec3(5.0, 0.01, 0.05); *\/ */
/*         /\* vec3 shockParams = vec3(PARAM_X, PARAM_Y, PARAM_Z); *\/ */
/*         float distance = distance(uv, center); */
/*         if ( (distance <= (t + shockParams.z)) && */
/*              (distance >= (t - shockParams.z)) ) */
/*             { */
/*                 float diff = (distance - t); */
/*                 float powDiff = 1.0 - pow(abs(diff*shockParams.x), */
/*                                           shockParams.y); */
/*                 float diffTime = diff  * powDiff; */
/*                 vec2 diffUV = normalize(uv - center); */
/*                 float decay = (0.09/t); */
/*                 tc += (diffUV * diffTime) * decay ; */
/*                 color += diffTime * vec4(0.1,.99,0.1,1.0) * decay; */
/*             } */
        
/*     } */
/*     tc += uv; */
/*     gl_FragColor = texture2D(color0, tc);// + color; */
/*     //gl_FragColor.rg = tc; */
/* } */
