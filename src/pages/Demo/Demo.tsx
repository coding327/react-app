import React, {useState, FC} from 'react'
import { NumAdd, ChangeNum } from '@/redux/actions'
import { connect } from 'react-redux'


const Demo:FC<{num: number, dispatch:any}> = ({num, dispatch}) => {

  let [count, changeCount] = useState<number>(2000)

  return (
    <div>
      <p>{num}</p>
      <button onClick={() => dispatch(NumAdd())}>+1</button>
      <button onClick={() => dispatch(ChangeNum(100))}>+100</button>
    </div>
  )
}

export default connect((state: any) => {
  return {
    num: state.num
  }
})(Demo);
