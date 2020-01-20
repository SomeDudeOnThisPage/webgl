#ifdef GL_ES
  precision mediump float;
#endif

void main()
{
  vec2 resolution = vec2(1600, 900);
  float st = gl_FragCoord.y / resolution.y;

  vec3 color1 = vec3(35.0 / 255.0, 70.0 / 255.0, 166.0 / 255.0);
  vec3 color2 = vec3(0.0 / 255.0, 47.0 / 255.0, 75.0 / 255.0);

  float mixValue = distance(vec2(0, st),vec2(0,1));
  vec3 color = mix(color1,color2, mixValue);

  gl_FragColor = vec4(color, 1.0);
}