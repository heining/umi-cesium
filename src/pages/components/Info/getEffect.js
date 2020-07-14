const idChange = (id, l, n, f) => {
  let _id
  let bef = id.split('—')[0].split('N')[1]
  let aft = id.split(')')[1]
  const c = Number(id.split('(C')[1].split(')')[0])
  let _aft
  c > 3 ? _aft = c + '' : c > 1 ? l == 'L1' || l == 'L3' ? _aft = '3' : _aft = '2' : _aft = '1'
  let _n = id.split('—')[0].split('N')[1]
  let _f = id.split('F')[1]
  if (n) {
    _n = Number(_n) + n + ''
    if (f) {
      _f = Number(_f) + f + ''
    } else {
      _f = Number(_f) + ''
    }
  } else {
    if (f) {
      _f = Number(_f) + f + ''
    } else {
      _f = Number(_f) + ''
    }
    _n = Number(_n) + ''
  }
  if (_n.length == 1) {
    _id = l + 'N' + bef.substring(0, bef.length - 1) + _n + '—(C0' + _aft + ')' + aft
  } else if (_n.length == 2) {
    _id = l + 'N' + bef.substring(0, bef.length - 2) + _n + '—(C0' + _aft + ')' + aft
  } else {
    _id = l + 'N' + bef.substring(0, bef.length - 3) + _n + '—(C0' + _aft + ')' + aft
  }
  if (_f.length == 1) {
    _id = _id.substring(0, _id.length - 1) + _f
  } else if (_f.length == 2) {
    _id = _id.substring(0, _id.length - 2) + _f
  } else {
    _id = _id.substring(0, _id.length - 3) + _f
  }
  return _id
}

export const getEffect = (id) => {
  const c = id.split('(C')[1].split(')')[0]
  let effectArr = []
  effectArr.push(id)
  if (id.includes('L2')) {
    effectArr.push(idChange(id, 'L1', 1, 0))
    effectArr.push(idChange(id, 'L2', 1, 0))
    effectArr.push(idChange(id, 'L3', 1, 0))
    effectArr.push(idChange(id, 'L1', -1, 0))
    effectArr.push(idChange(id, 'L2', -1, 0))
    effectArr.push(idChange(id, 'L3', -1, 0))
    effectArr.push(idChange(id, 'L1', 0, 0))
    effectArr.push(idChange(id, 'L3', 0, 0))
  } else if (id.includes('L3')) {
    effectArr.push(idChange(id, 'L1', 1, 1))
    effectArr.push(idChange(id, 'L2', 1, 0))
    effectArr.push(idChange(id, 'L3', 1, 0))
    effectArr.push(idChange(id, 'L1', -1, 1))
    effectArr.push(idChange(id, 'L2', -1, 0))
    effectArr.push(idChange(id, 'L3', -1, 0))
    effectArr.push(idChange(id, 'L1', 0, 1))
    effectArr.push(idChange(id, 'L2', 0, 0))
  } else if (id.includes('L1')) {
    if (c < 4 && c > 1) {
      effectArr.push(idChange(id, 'L1', 1, 0))
      effectArr.push(idChange(id, 'L2', 1, -1))
      effectArr.push(idChange(id, 'L3', 1, -1))
      effectArr.push(idChange(id, 'L1', -1, 0))
      effectArr.push(idChange(id, 'L2', -1, -1))
      effectArr.push(idChange(id, 'L3', -1, -1))
      effectArr.push(idChange(id, 'L2', 0, -1))
      effectArr.push(idChange(id, 'L3', 0, -1))
    } else if (c > 4) {
      effectArr.push(idChange(id, 'L1', 1, 0))
      effectArr.push(idChange(id, 'L1', 1, 1))
      effectArr.push(idChange(id, 'L1', 1, -1))
      effectArr.push(idChange(id, 'L1', -1, 0))
      effectArr.push(idChange(id, 'L1', -1, 1))
      effectArr.push(idChange(id, 'L1', -1, -1))
      effectArr.push(idChange(id, 'L1', 0, 1))
      effectArr.push(idChange(id, 'L1', 0, -1))
    } else {
      effectArr.push(idChange(id, 'L1', 1, 0))
      effectArr.push(idChange(id, 'L1', 1, 1))
      effectArr.push(idChange(id, 'L1', 1, -1))
      effectArr.push(idChange(id, 'L1', -1, 0))
      effectArr.push(idChange(id, 'L1', -1, 1))
      effectArr.push(idChange(id, 'L1', -1, -1))
      effectArr.push(idChange(id, 'L1', 0, 1))
      effectArr.push(idChange(id, 'L1', 0, -1))
    }
  } else {
    effectArr.push(idChange(id, 'L0', 1, 0))
    effectArr.push(idChange(id, 'L0', 1, 1))
    effectArr.push(idChange(id, 'L0', 1, -1))
    effectArr.push(idChange(id, 'L0', -1, 0))
    effectArr.push(idChange(id, 'L0', -1, 1))
    effectArr.push(idChange(id, 'L0', -1, -1))
    effectArr.push(idChange(id, 'L0', 0, 1))
    effectArr.push(idChange(id, 'L0', 0, -1))
  }
  return effectArr
}