import { util_load } from '../util.js';

export default class Shader
{
  static SHADER_PATH = './resources/shaders/';

  static attachShaderProgram(shader, type, source)
  {
    let shader_program = shader.gl.createShader(type);
    util_load(this.SHADER_PATH + source, function(data)
    {
      shader.gl.shaderSource(shader_program, data);
      shader.gl.compileShader(shader_program);

      if (!shader.gl.getShaderParameter( shader_program, shader.gl.COMPILE_STATUS))
      {
        console.error(shader.gl.getShaderInfoLog(shader_program));
      }

      shader.gl.attachShader(shader.program, shader_program);
    });
  }

  bind(uniforms)
  {
    this.gl.useProgram(this.program);
    if (uniforms)
    {
      uniforms.forEach(function(value, key)
      {
        console.log(value, key);
      });
    }
  }

  unbind()
  {
    this.gl.useProgram(null);
  }

  setUniform(location, data)
  {
    this.bind();

    switch(data.length)
    {
      case 1:
        this.gl.uniform1fv(this.gl.getUniformLocation(this.program, location), data);
        break;
      case 2:
        this.gl.uniform2fv(this.gl.getUniformLocation(this.program, location), data);
        break;
      case 3:
        this.gl.uniform3fv(this.gl.getUniformLocation(this.program, location), data);
        break;
      default:
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, location), data);
        break;
    }

    this.unbind();
  }

  setUniform1v(location, data)
  {
    this.bind();
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, location), data);
    this.unbind();
  }

  setUniformMat4f(location, data)
  {
    this.bind();
    this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, location), false, new Float32Array(data));
    this.unbind();
  }

  setUniform1i(location, data)
  {
    this.bind();
    this.gl.uniform1i(this.gl.getUniformLocation(this.program, location), data);
    this.unbind();
  }

  getAttribLocation(attribute)
  {
    return this.gl.getAttribLocation(this.program, attribute);
  }

  constructor(name, context)
  {
    this.gl = context;
    this.program = this.gl.createProgram();

    Shader.attachShaderProgram(this, this.gl.VERTEX_SHADER, name + '.vs');
    Shader.attachShaderProgram(this, this.gl.FRAGMENT_SHADER, name + '.fs');

    this.gl.linkProgram(this.program);
  }
}