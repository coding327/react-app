
import { Toast } from "antd-mobile";

export const ShowLoading = (msg='加载中') => {
  Toast.clear()
  Toast.show({
    icon: 'loading',
    content: msg,
    duration: 2000 // 2秒后消失
  })
}

export const ShowSuccess = (msg='成功') => {
  Toast.clear()
  Toast.show({
    icon: 'success',
    content: msg,
    duration: 2000 // 2秒后消失
  })
}

export const ShowFail = (msg='失败') => {
  Toast.clear()
  Toast.show({
    icon: 'fail',
    content: msg,
    duration: 2000 // 2秒后消失
  })
}

export const ShowToast = (msg='') => {
  Toast.clear()
  Toast.show({
    icon: 'loading',
    content: msg,
    duration: 1500 // 1.5秒后消失
  })
}

export const CloseToast = () => {
  Toast.clear()
}


