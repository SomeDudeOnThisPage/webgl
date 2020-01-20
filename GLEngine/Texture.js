let createTexture = function(id, slot, gl)
{
  let texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + slot);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  let image = document.getElementById(id);

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.bindTexture(gl.TEXTURE_2D, null);
  return texture;
};

export default class Texture
{
  bind()
  {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.slot);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.map);
  }

  unbind()
  {
    this.gl.activeTexture(this.gl.TEXTURE0 + this.slot);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }

  constructor(source, slot, gl)
  {
    this.gl = gl;
    this.slot = slot || 0;
    this.map = createTexture(source, this.slot, gl);
  }
}