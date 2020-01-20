#version 100
#ifdef GL_ES
  precision highp float;
#endif

#define MAX_LIGHTS 12

varying vec3 fs_fragment_position;
varying vec2 fs_texture_position;
varying mat3 fs_tbn;

uniform vec3 view_position;

uniform sampler2D texture0; // diffuse
uniform sampler2D texture1; // normal

uniform struct
{
  float specular_intensity;
  float specular_shine;
} material;

// unused
uniform struct
{
  vec3 position;
  vec3 color;
} light[MAX_LIGHTS];

// (temporarily) static light data
const vec3 light_position = vec3(3.0, 2.0, 3.0);
const vec3 light_ambient = vec3(0.05, 0.05, 0.05);
const vec3 light_color = vec3(1.0, 1.0, 1.0);

void main()
{
  // handle normal mapping
  vec3 normal = texture2D(texture1, fs_texture_position).xyz;
  normal = normalize(normal * 2.0 - 1.0);
  normal = normalize(fs_tbn * normal);

  // diffuse lighting
  vec3 light_direction = normalize(light_position - fs_fragment_position);
  vec3 diffuse = max(dot(normal, light_direction), 0.0) * light_color;

  // specular lighting
  vec3 view_direction = normalize(fs_tbn * view_position - fs_fragment_position);
  vec3 reflection_direction = reflect(light_direction, normal);
  vec3 specular = material.specular_intensity * pow(max(dot(view_direction, reflection_direction), 0.0), material.specular_shine) * light_color;

  gl_FragColor = vec4((light_ambient + specular + diffuse), 1.0) * texture2D(texture0, fs_texture_position);
}