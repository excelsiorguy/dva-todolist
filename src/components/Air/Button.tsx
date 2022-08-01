import React, { useState } from 'react'
import { connect } from "dva";
import styles from './Button.less'

const upBt = 'data:image/png;base64,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'
const switchBtns = 'data:image/png;base64,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'
const downArrow = 'data:image/png;base64,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'


    
const Button = ({ up, down, isShowTemp,todos }) => {
    // const btnRef = useRef(null)
    // console.log('but',btnRef.current.style);

    const {data} = todos
    let isDoneArr = data.filter((item) => item.status === true);
    // if(isDoneArr > 2){
    //     butnDom.style.dispaly
    // }else{

    // }
    // 存储开关按钮的背景颜色
    const [bg, setBg] = useState({ open: '#f33531', off: '#43a047', flag: false })
    // 切换状态
    const switchState = () => {
        isShowTemp()
        setBg({ ...bg, flag: !bg.flag })
    }
    return (
        <div className={styles.button} style={{opacity: isDoneArr.length > 2 ? 1 : 0}}>
        {/* <div className={styles.button}  style={{display :isDoneArr > 2 ? 'block': 'none'}}> */}
            <div className={styles.binc} onClick={() => up()}>
                <img src={upBt} className={styles.img5} alt="failed" />
            </div>
            <div
                className={styles.bswitch}
                onClick={() => switchState()}
                style={{ backgroundColor: bg.flag ? bg.open : bg.off }}
            >
                <img src={switchBtns} className={styles.img5} alt="failed" />
            </div>
            <div className={styles.bdec} onClick={() => down()}>
                <img src={downArrow} className={styles.img5} alt="failed" />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      todos: state.todos,
    };
  };
export default connect(mapStateToProps)(Button);