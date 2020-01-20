#ifdef GL_ES
  precision mediump float;
#endif

attribute vec2 position;

uniform vec2 world_position;
uniform mat4 pr_matrix;

void main()
{
  float scale = 1.0;

  mat4 pos_matrix = mat4(
    vec4(scale, 0, 0, 0),
    vec4(0, scale, 0, 0),
    vec4(0, 0, scale, 0),
    vec4(world_position.x, world_position.y, 0.0, 1)
  );

  const float right = 1600.0;
  const float bottom = 900.0;
  const float left = 0.0;
  const float top = 0.0;
  const float far = 1.0;
  const float near = -1.0;

  mat4 testmat = mat4(
    vec4(2.0 / (right - left), 0, 0, 0),
    vec4(0, 2.0 / (top - bottom), 0, 0),
    vec4(0, 0, -2.0 / (far - near), 0),
    vec4(-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1)
  );

  gl_Position = testmat * pos_matrix * vec4(position, 0.0, 1.0);
}