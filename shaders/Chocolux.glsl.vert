uniform float time;

varying vec3 s[4];

void main(){
    gl_Position = gl_Vertex * time;
    s[0]=vec3(0);
    s[3]=vec3(sin(abs(time*.0001)),
              cos(abs(time*.0001)),
              0);
    s[1]=s[3].zxy;
    s[2]=s[3].zzx;
}
