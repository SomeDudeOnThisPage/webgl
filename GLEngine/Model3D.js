import VertexArray from "./core/VertexArray.js";
import Vector3 from "./math/Vector3.js";
import Vector2 from "./math/Vector2.js";
import GameObject from "./GameObject.js";
import Matrix4 from "./math/Matrix4.js";
import {util_load} from "./util.js";

export default class Model3D extends GameObject
{
  render(engine)
  {
    let camera = engine.getCamera();
    let cameraViewMatrix = new Matrix4().identity().translate(camera.position).rotate(camera.rotation);
    let modelViewMatrix = new Matrix4().identity().translate(this.position).rotate(this.rotation);

    //let normalMatrix = mat4.invert(mat4.create(), modelViewMatrix);
    //normalMatrix = mat4.transpose(normalMatrix, normalMatrix);
    //this.material.shader.setUniformMat4f('normal_world', normalMatrix);

    this.material.shader.setUniformMat4f('model', modelViewMatrix);
    this.material.shader.setUniformMat4f('view', cameraViewMatrix);
    this.material.shader.setUniformMat4f('projection', camera.getProjection());

    this.material.shader.setUniform('view_position', camera.position);

    this.material.bind();
    this.vao.bind();
    this.vao.render();
    this.vao.unbind();
    this.material.unbind();
  }

  update() {}

  constructor(object, material, engine)
  {
    super(engine);

    let obj_data = '';
    util_load('./resources/models/' + object + '.obj', function(data) {obj_data = data;});
    this.mesh = new OBJ.Mesh(obj_data);
    this.material = material;

    // Generate Tangents
    for (let i = 0; i < this.mesh.indices.length; i+=3)
    {
      let i1 = this.mesh.indices[i];
      let i2 = this.mesh.indices[i + 1];
      let i3 = this.mesh.indices[i + 2];

      let v0 = [this.mesh.vertices[i1 * 3], this.mesh.vertices[i1 * 3 + 1], this.mesh.vertices[i1 * 3 + 2]];
      let v1 = [this.mesh.vertices[i2 * 3], this.mesh.vertices[i2 * 3 + 1], this.mesh.vertices[i2 * 3 + 2]];
      let v2 = [this.mesh.vertices[i3 * 3], this.mesh.vertices[i3 * 3 + 1], this.mesh.vertices[i3 * 3 + 2]];

      let uv0 = [this.mesh.textures[i1 * 2], this.mesh.textures[i1 * 2 + 1]];
      let uv1 = [this.mesh.textures[i2 * 2], this.mesh.textures[i2 * 2 + 1]];
      let uv2 = [this.mesh.textures[i3 * 2], this.mesh.textures[i3 * 2 + 1]];

      let edge1 = new Vector3(v0).subtract(v1);
      let edge2 = new Vector3(v0).subtract(v2);

      let deltaUV1 = new Vector2(uv1).subtract(uv0);
      let deltaUV2 = new Vector2(uv2).subtract(uv0);

      let r = (deltaUV1[0] * deltaUV2[1] - deltaUV2[0] * deltaUV1[1]);
      if (r === 0) { r = 1; }
      else { r = 1.0 / r; }

      let tangent = [];
      tangent[0] = r * (deltaUV2[1] * edge1[0] - deltaUV1[1] * edge2[0]);
      tangent[1] = r * (deltaUV2[1] * edge1[1] - deltaUV1[1] * edge2[1]);
      tangent[2] = r * (deltaUV2[1] * edge1[2] - deltaUV1[1] * edge2[2]);

      if (tangent[0] === -0) { tangent[0] = 0; }
      if (tangent[1] === -0) { tangent[1] = 0; }
      if (tangent[2] === -0) { tangent[2] = 0; }

      this.mesh.tangents.push(tangent[0], tangent[1], tangent[2]);
      this.mesh.tangents.push(tangent[0], tangent[1], tangent[2]);
      this.mesh.tangents.push(tangent[0], tangent[1], tangent[2]);
    }

    this.vao = new VertexArray(engine.gl);
    this.vao.addAttribute(0, 3, this.mesh.vertices);

    if (this.mesh.textures)
    {
      this.vao.addAttribute(1, 2, this.mesh.textures)
    }

    if (this.mesh.vertexNormals)
    {
      this.vao.addAttribute(2, 3, this.mesh.vertexNormals);
    }

    if (this.mesh.indices)
    {
      this.vao.addIndices(this.mesh.indices);
    }

    this.vao.addAttribute(3, 3, this.mesh.tangents);

    this.position = new Vector3();
    this.rotation = new Vector3();
    this.scale = 1.0;
  }
}