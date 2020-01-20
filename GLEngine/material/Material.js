import { util_load } from '../util.js';
import Shader from './Shader.js';
import Texture from "../Texture.js";
import Preloadable from "../core/Preloadable.js";

const MATERIAL_PATH = './resources/materials/';

/**
 * Handles a material whose definition is provided by a .json file.
 */
export default class Material extends Preloadable
{
  bind()
  {
    let self = this;

    // Bind texture samplers to according slots
    this.textures.forEach(function(texture)
    {
      texture.bind();
      self.shader.setUniform1i('texture' + texture.slot, texture.slot);
    });

    // Set shader lighting uniforms
    self.shader.setUniform1v('material.specular_intensity', this.specularIntensity);
    self.shader.setUniform1v('material.specular_shine', this.specularShine);

    this.shader.bind();
  }

  unbind()
  {
    this.shader.unbind();
    this.textures.forEach(function(texture)
    {
      texture.unbind();
    });
  }

  constructor(material, gl, sync)
  {
    super(sync);

    this.gl = gl;
    let self = this;

    util_load(MATERIAL_PATH + material + '.json', function(data)
    {
      data = JSON.parse(data);

      self.shader = new Shader(data['shader'] || 'diffuse_static', gl);
      self.textures = [];

      for (let key in data['texture'])
      {
        if (data['texture'].hasOwnProperty(key))
        {
          self.textures.push(new Texture(data['texture'][key], parseInt(key), gl));
        }
      }

      self.specularIntensity = data['specular_intensity'];
      self.specularShine = data['specular_shine'];
    });
  }
}