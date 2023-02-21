
export const NumAdd = () => {
  return {
    type: 'NumAdd'
  }
}

export const ChangeNum = (payload: number) => {
  return {
    type: 'ChangeNum',
    payload
  }
}
