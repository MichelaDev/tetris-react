


export const generateShape = () => {
    // shape i
    const shape_i = [
      [[0, 1], [1, 1], [2, 1], [3, 1]],
      [[1, 0], [1, 1], [1, 2], [1, 3]]
    ]

    // shape l
    const shape_l = [
      [[1, 0], [1, 1], [1, 2], [2, 2]],
      [[0, 2], [1, 2], [2, 2], [2, 1]],
      [[1, 0], [2, 0], [2, 1], [2, 2]],
      [[0, 3], [0, 2], [1, 2], [2, 2]]
    ]

    // shape j
    const shape_j = [
      [[2, 0], [2, 1], [2, 2], [1, 2]],
      [[0, 1], [1, 1], [2, 1], [2, 2]],
      [[3, 0], [2, 0], [2, 1], [2, 2]],
      [[0, 1], [0, 2], [1, 2], [2, 2]]
    ]

    // shape_s
    const shape_s = [
      [[0, 2], [1, 2], [1, 1], [2, 1]],
      [[1, 0], [1, 1], [2, 1], [2, 2]]
    ]

    // shape_z
    const shape_z = [
      [[0, 1], [1, 1], [1, 2], [2, 2]],
      [[2, 0], [2, 1], [1, 1], [1, 2]]
    ]

    // shape_t
    const shape_t = [
      [[0, 2], [1, 2], [2, 2], [1, 1]],
      [[2, 0], [2, 1], [2, 2], [1, 1]],
      [[0, 1], [1, 1], [2, 1], [1, 2]],
      [[1, 0], [1, 1], [1, 2], [2, 1]]
    ]

    // shape_o
    const shape_o = [[[1, 1], [1, 2], [2, 1], [2, 2]]]

    const shapes = [shape_i, shape_j, shape_l, shape_o, shape_s, shape_t, shape_z]

    return shapes[(Math.floor(Math.random() * shapes.length))]
}

export const generateColor = () => {
    const RED = '#FF0000';
    const GREEN = '#00FF00';
    const YELLOW = '#FFFF00';
    const BLUE = '#0000FF';
    const OLIVE = '#808000';
    const FUCSIA = '#FF00FF';
    const AQUA = '#00FFFF';

    const colors = [AQUA, BLUE, RED, GREEN, FUCSIA, GREEN, YELLOW, OLIVE]

    return colors[(Math.floor(Math.random() * colors.length))]
}