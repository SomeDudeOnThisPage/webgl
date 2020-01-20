let util_load = function(path, onload)
{
  $.ajax({
    type: 'GET',
    async: false,
    dataType: 'text',
    url: path,
    success: function(data)
    {
      onload(data);
    }
  });
};

let processVertex = function()
{

};

let obj_load = function(path, onload)
{
  let verts = [];
  let indis = [];
  let norms = [];
  let texts = [];
  util_load(path, function(data)
  {
    let lines = data.split("\n");
    let vertices = [];
    let indices = [];
    let n_indices = [];
    let tex_coords = [];

    for (let i = 0; i < lines.length; i++)
    {
      let line = lines[i];
      if (line.startsWith('#') || line.startsWith(' ')) { continue; }

      let line_data = line.split(' ');
      let index = line_data.shift();

      switch(index)
      {
        case 'o':
          console.log('Our object is called ' + line_data[0]);
          break;
        case 'v':
          verts.push(line_data);
          break;
        case 'vn':
          norms.push(line_data);
          break;
        case 'f':
          let d = [];
          for (let j = 0; j < 3; j++)
          {
            let face = line_data[j].split('/');
            d[j] = face[0];
            //console.log('vertex:', verts[face[0] - 1]);
            //console.log('texture:', verts[face[1] - 1]);
            //console.log('normal:', verts[face[2] - 1]);

            indices.push(face[0]);
          }

          console.log(d);

          break;
      }

    }
    console.log(verts);
    console.log(norms);
  });
};

export { util_load, obj_load };