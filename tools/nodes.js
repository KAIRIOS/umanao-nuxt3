export default {
  /**
   * Permet de générer des nœuds pour une matrice de données.
   */
  generate(x, y, startValue = 1) {
    const nodes = []
    let id = startValue;
    for (let yi = 10; yi > y; yi--) {
      for (let xi = 0; xi < x; xi++) {
        nodes.push({
          id: '' + xi + '-' + yi,
          type: 'special',
          position: {
            x: xi * 300,
            y: yi * 300,
          },
          data: {
            value: id,
            card: [],
          }
        })
        id++
      }
    }

    return nodes;
  }
}