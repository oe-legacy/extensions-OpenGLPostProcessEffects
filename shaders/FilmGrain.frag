//noise effect intensity value (0 = no effect, 1 = full effect)
const float noiseIntensity = 0.4;
//scanlines effect intensity value (0 = no effect, 1 = full effect)
const float scanlineIntensity = 0.1;
//scanlines effect count value (0 = no effect, 4096 = full effect)
const float scanlineCount = 2048.0;

uniform sampler2D color0;
uniform float time;

varying vec2 texCoord;

void main() {

    vec4 color = texture2D(color0, texCoord);
    
    // make some noise
	float x = texCoord.x * texCoord.y * time;
	x = mod(x, 13.0) * mod(x, 123.0);
	float dx = mod(x, 0.006) * 100.0;
    // dx has range [0; 0.6]. Modulate it to [-0.3; 0.3]
    dx -= 0.3;

	// add noise
	vec3 res = color.rgb + color.rgb * dx;

	// add scanlines
	//vec2 sc = vec2(sin(texCoord.y * scanlineCount),cos(texCoord.y * scanlineCount));
	//res += color.rgb * vec3(sc.x, sc.y, sc.x) * scanlineIntensity;
	
	// interpolate between source and result by intensity
	res = mix(color.rgb, res, noiseIntensity);

	// return with source alpha
	gl_FragColor =  vec4(res, color.a);
}
