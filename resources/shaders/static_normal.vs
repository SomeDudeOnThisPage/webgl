#version 100
#ifdef GL_ES
  precision highp float;
#endif

attribute vec3 position;
attribute vec2 texture;
attribute vec3 normal;
attribute vec3 tangent;

varying vec3 fs_normal;
varying vec3 fs_fragment_position;
varying vec2 fs_texture_position;
varying mat3 fs_tbn;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

mat3 tbn(vec3 i_t, vec3 i_n)
{
  vec3 t = normalize(vec3(model * vec4(normalize(i_t), 0.0)));
  vec3 n = normalize(vec3(model * vec4(i_n, 0.0)));
  t = normalize(t - dot(t, n) * n);
  return mat3(t, cross(n, t), n);
}

void main()
{
  // Construct Tangent / Bitangent / Normal matrix
  fs_tbn = tbn(tangent, normal);
  fs_texture_position = texture;
  fs_fragment_position = vec3(model * vec4(position, 1.0));

  gl_Position = projection * view * model * vec4(position, 1.0);
}