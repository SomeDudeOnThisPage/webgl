const MAX_ATTRIBUTES = 8;
const WIREFRAME = false;

let bound = null;

export default class VertexArray
{
  bind()
  {
    if (bound !== this.vao)
    {
      this.gl.ext.bindVertexArrayOES(this.vao);

      for (let i = 0; i < MAX_ATTRIBUTES; i++)
      {
        if (this.attributes[i])
        {
          this.gl.enableVertexAttribArray(i)
        }
      }

      if (this.indices)
      {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indices);
      }

      bound = this.vao;
    }
  }

  unbind()
  {
    for (let i = 0; i < MAX_ATTRIBUTES; i++)
    {
      if (this.attributes[i])
      {
        this.gl.disableVertexAttribArray(i)
      }
    }

    if (this.indices)
    {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }

    this.gl.ext.bindVertexArrayOES(null);
    bound = null;
  }

  addIndices(data)
  {
    this.bind();
    this.indices = this.gl.createBuffer();

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indices);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), this.gl.STATIC_DRAW);

    this.vcount = data.length;
    this.unbind();
  }

  addAttribute(index, length, data)
  {
    if (index === 0)
    {
      this.vcount = data.length
    }

    this.bind();

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
    this.gl.enableVertexAttribArray(index);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
    this.gl.vertexAttribPointer(index, length, this.gl.FLOAT, false, length * Float32Array.BYTES_PER_ELEMENT, 0);

    this.attributes[index] = true;

    this.unbind();
  }

  render()
  {
    this.bind();

    let mode = this.gl.TRIANGLES;
    if (WIREFRAME) {mode = this.gl.LINE_STRIP;}

    if (this.indices)
    {
      this.gl.drawElements(mode, this.vcount, this.gl.UNSIGNED_SHORT, 0);
    }
    else
    {
      this.gl.drawArrays(mode, 0, this.vcount);
    }

    this.unbind()
  }

  constructor(gl)
  {
    this.gl = gl;
    this.attributes = [];
    this.indices = null;
    this.vcount = 0;
    this.vao = this.gl.ext.createVertexArrayOES();
  }
}